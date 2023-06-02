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

  isValid() {
    const leadingZeros = '0'.repeat(DIFFICULTY)
    return this.hash.substring(0, DIFFICULTY) === leadingZeros
  }

  setNonce(nonce) {
    this.nonce = nonce
    this.hash = this.calculateHash()
  }
}

export default Block
