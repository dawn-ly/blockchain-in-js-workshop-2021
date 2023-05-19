import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2


  class Block {
  constructor(data, previousHash) {
    this.timestamp = Date.now();
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
    this.difficulty = 4; // 挖矿难度
  }

  // 计算区块的哈希值
  calculateHash() {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce);
    return hash.digest('hex');
  }

  // 验证区块是否符合挖矿难度要求
  isValid() {
    const prefix = '0'.repeat(this.difficulty);
    return this.hash.startsWith(prefix);
  }

  // 更新 Nonce 值
  setNonce(nonce) {
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  // 更新 Hash 值
  updateHash() {
    this.hash = this.calculateHash();

}

export default Block

