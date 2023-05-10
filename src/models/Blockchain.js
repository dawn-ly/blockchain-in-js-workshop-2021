// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
 constructor(name) {
  this.name = name;
  this.genesis = null;
  this.blocks = {};
  }
  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
    longestChain() {
      if (this.genesis == null) {
        return [];
      }
      let blockKeys = Object.keys(this.blocks);
      let maxLen = blockKeys.length;
      let longestChain = [];
      for (let i = 0; i < maxLen; i++) {
        let chain = [this.blocks[blockKeys[i]]];
        let previousBlock = this.blocks[blockKeys[i]];
        while (previousBlock && previousBlock.previousHash !== "0") {
          let block = Object.values(this.blocks).filter(
            (block) => block.hash === previousBlock.previousHash
          )[0];
          if (!block) {
            break;
          }
          chain.push(block);
          previousBlock = block;
        }
        if (chain.length > longestChain.length) {
          longestChain = chain;
        }
      }
      return longestChain;
    }
  }
export default Blockchain
