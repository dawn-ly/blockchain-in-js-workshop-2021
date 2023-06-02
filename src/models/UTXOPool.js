import UTXO from './UTXO.js'
import sha256 from 'crypto-js/sha256.js'

class UTXOPool {
  constructor(utxos = {}) {
    this.utxos = { ...utxos }
  }

  addUTXO(txHash, outputIndex, output) {
    const utxo = new UTXO(txHash, outputIndex, output)
    this.utxos[utxo.toString()] = utxo
  }

  removeUTXO(txHash, outputIndex) {
    const utxo = new UTXO(txHash, outputIndex)
    delete this.utxos[utxo.toString()]
  }

  getUTXO(txHash, outputIndex) {
    const utxo = new UTXO(txHash, outputIndex)
    return this.utxos[utxo.toString()]
  }

  getAllUTXOs() {
    return Object.values(this.utxos)
  }

  clone() {
    return new UTXOPool(this.utxos)
  }

  isValidTransaction(senderAddress, amount) {
    // 在此处实现您的逻辑来验证交易是否有效
    // 根据您的业务需求编写代码，例如检查发送方地址的余额是否足够等
    // 返回 true 或 false，表示交易的有效性

    // 示例逻辑：检查发送方地址在 UTXO 池中是否存在，并且余额是否足够
    const senderUTXO = this.utxos[senderAddress];
    if (!senderUTXO || senderUTXO.amount < amount) {
      return false;
    }

    return true;
  }
  handleTransaction(transaction) {
    const senderAddress = transaction.senderAddress
    const amount = transaction.amount

    if (!this.isValidTransaction(senderAddress, amount)) {
      return false
    }

    // 示例逻辑：更新 UTXO 池
    const senderUTXO = this.utxos[senderAddress]
    senderUTXO.output.amount -= amount

    // 处理新的交易输出
    const newUTXO = new UTXO(transaction.txHash, transaction.outputIndex, {
      address: transaction.recipientAddress,
      amount: amount
    })
    this.addUTXO(newUTXO.txHash, newUTXO.outputIndex, newUTXO.output)

    return true
  }
}

export default UTXOPool;
