// Blockchain
class Blockchain {
 constructor(name) {
  this.name = name;
  this.genesisBlock = new Block(0, Date.now(), 'Genesis Block', '0');
  this.blocks = new Map();
  this.blocks.set(0, this.genesisBlock);
  }
  }
  
  class Block {
  constructor(index, timestamp, data, previousHash) {
  this.index = index;
  this.timestamp = timestamp;
  this.data = data;
  this.previousHash = previousHash;
  this.hash = this.calculateHash();
  }
  
  calculateHash() {
  return toString();
   
}
  }
export default Blockchain
