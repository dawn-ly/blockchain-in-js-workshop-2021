import sha256 from 'crypto-js/sha256.js'

class Transaction {
  constructor(senderAddress, recipientAddress, amount, fee) {
    this.senderAddress = senderAddress
    this.recipientAddress = recipientAddress
    this.amount = amount
    this.fee = fee
    this.timestamp = new Date().getTime()
    this.txHash = this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(
      this.senderAddress + this.recipientAddress + this.amount.toString() + this.fee.toString() + this.timestamp.toString()
    ).toString()
  }

  // 更新交易 hash
  _setHash() {
    this.txHash = this._calculateHash()
  }
}

export default Transaction
