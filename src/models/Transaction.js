import sha256 from 'crypto-js/sha256.js'
import {verifySignature} from '../crypto.js'


class Transaction {
  constructor(senderAddress, recipientAddress, amount, fee, signature) {
    this.senderAddress = senderAddress
    this.recipientAddress = recipientAddress
    this.amount = amount
    this.fee = fee
    this.timestamp = new Date().getTime()
    this.signature = signature
    this.txHash = this._calculateHash()
  }

  // 计算交易 hash 的摘要函数
  _calculateHash() {
    return sha256(
      this.senderAddress +
      this.recipientAddress +
      this.amount.toString() +
      this.fee.toString() +
      this.timestamp.toString()
    ).toString()
  }

  hasValidSignature() {
    const message = this.senderAddress +
      this.recipientAddress +
      this.amount.toString() +
      this.fee.toString() +
      this.timestamp.toString()
      
    return verifySignature(message, this.signature, this.senderAddress)
  }
  // 更新交易 hash
  _setHash() {
    this.txHash = this._calculateHash()
  }
}

export default Transaction
