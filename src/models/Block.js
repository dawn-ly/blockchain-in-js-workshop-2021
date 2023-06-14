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
  isValidTransaction(transaction) {
    // 验证交易的签名
    if (!transaction.hasValidSignature()) {
      return false
    }

    // 验证交易哈希
    if (transaction.txHash !== transaction.calculateHash()) {
      return false
    }

    // 验证交易是否在区块中重复
    if (this.transactions.some((tx) => tx.txHash === transaction.txHash)) {
      return false
    }

    // 验证交易输入是否有效
    if (!transaction.inputs.every((input) => this.blockchain.isUnspentTransactionOutputValid(input))) {
      return false
    }

    // 验证交易输出是否有效
    if (!transaction.outputs.every((output) => this.blockchain.isValidAddress(output.address))) {
      return false
    }

    // 验证交易输入和输出金额是否平衡
    const inputAmount = transaction.inputs.reduce((total, input) => total + input.amount, 0)
    const outputAmount = transaction.outputs.reduce((total, output) => total + output.amount, 0)
    if (inputAmount !== outputAmount) {
      return false
    }

    return true
  }
  handleTransaction(transaction) {
    // 验证交易的有效性
    if (!transaction.isValidTransaction()) {
      console.log('Invalid transaction. Discarding...')
      return
    }

    // 添加交易到待处理交易列表
    this.pendingTransactions.push(transaction)

    console.log('Transaction added to pending transactions.')
  }
}

export default Block
