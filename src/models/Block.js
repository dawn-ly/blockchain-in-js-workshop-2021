class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(data, previousHash, index, hash) {
    this.index = index;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = hash;
  }

}

export default Block
