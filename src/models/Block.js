import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  constructor(blockchain, prevHash, height, data, coinbaseBeneficiary, transactions = []) {
    this.blockchain = blockchain
    this.prevHash = prevHash
    this.height = height
    this.data = data
    this.coinbaseBeneficiary = coinbaseBeneficiary
    this.transactions = transactions
    this.timestamp = new Date().getTime()
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  calculateHash() {
    return sha256(
      this.prevHash + this.height.toString() + this.data + this.nonce.toString()
    ).toString()
  }  
  _calculateHash() {
    return sha256(
      this.prevHash + this.height.toString() + this.data + this.nonce.toString()
    ).toString()
  } 
  combinedTransactionsHash() {
    const transactionHashes = this.transactions.map((transaction) => transaction.txHash)
    return sha256(transactionHashes.join('')).toString()
  }
  _calculateMerkleRoot() {
    const transactionHashes = this.transactions.map((transaction) => transaction.txHash)
    let level = transactionHashes

    while (level.length > 1) {
      const nextLevel = []
      for (let i = 0; i < level.length; i += 2) {
        const left = level[i]
        const right = i + 1 < level.length ? level[i + 1] : left
        const hash = sha256(left + right).toString()
        nextLevel.push(hash)
      }
      level = nextLevel
    }

    return level[0]
  }


  isValid() {
    const leadingZeros = '0'.repeat(DIFFICULTY)
    return this.hash.substring(0, DIFFICULTY) === leadingZeros
  }

  addTransaction(transaction) {
    this.transactions.push(transaction)
    this.merkleRoot = this._calculateMerkleRoot()
    this.hash = this._calculateHash()
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = this.calculateHash()
  }
}

export default Block
