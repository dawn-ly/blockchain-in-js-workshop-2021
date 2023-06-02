import UTXOPool from './UTXOPool.js'

class Blockchain {
  constructor(name) {
    this.name = name
    this.blocks = new Map()
    this.genesis = null
  }

  longestChain() {
    let longestChain = [];
    let maxHeight = 0;
  
    for (const block of this.blocks.values()) {
      let currentBlock = block;
      let chain = [currentBlock];
  
      // Traverse the blockchain from current block to genesis block
      while (currentBlock.prevHash !== 'root') {
        const prevBlock = this.blocks.get(currentBlock.prevHash);
  
        if (!prevBlock) {
          break; // Stop the loop if previous block is not found
        }
  
        chain.unshift(prevBlock); // Add previous block to the chain
        currentBlock = prevBlock; // Update current block reference
      }
  
      if (chain.length > maxHeight) {
        longestChain = chain;
        maxHeight = chain.length;
      }
    }
  
    return longestChain;
  }
  

  calculateHeight(block) {
    let height = 0
    let currentBlock = block
    while (currentBlock.prevHash !== 'root') {
      currentBlock = this.blocks.get(currentBlock.prevHash)
      height++
    }

    return height
  }

  containsBlock(block) {
    return this.blocks.has(block.hash)
  }

  maxHeightBlock() {
    let maxHeight = -1
    let maxHeightBlock = null
    for (const [hash, block] of this.blocks.entries()) {
      const height = this.calculateHeight(block)
      if (height > maxHeight) {
        maxHeight = height
        maxHeightBlock = block
      }
    }

    return maxHeightBlock
  }

  _addBlock(block) {
    if (!block.isValid()) return;
    if (this.containsBlock(block)) return;
  
    const prevBlock = this.blocks.get(block.prevHash);
    if (prevBlock) {
      block.height = prevBlock.height + 1;
    } else {
      block.height = 1; // Set height to 1 for the genesis block
    }
  
    // Update UTXO pool logic
    block.utxoPool = new UTXOPool(prevBlock ? prevBlock.utxoPool : null);
  
    // Process transactions in the new block
    for (const tx of block.transactions) {
      if (!tx.isValid()) continue;
  
      for (const input of tx.inputs) {
        const utxo = block.utxoPool.getUTXO(input.prevTxHash, input.outputIndex);
        if (utxo) {
          block.utxoPool.removeUTXO(input.prevTxHash, input.outputIndex);
        }
      }
  
      for (let i = 0; i < tx.outputs.length; i++) {
        const output = tx.outputs[i];
        block.utxoPool.addUTXO(tx.hash, i, output);
      }
    }
  
    this.blocks.set(block.hash, block);
  }
  
  
}

export default Blockchain
