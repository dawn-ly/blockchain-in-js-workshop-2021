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

  isValidTransaction(senderAddress, amount, fee) {
    // 验证交易的有效性，包括余额和手续费的校验
    const senderUTXO = this.utxos[senderAddress]
    if (!senderUTXO || senderUTXO.amount < amount + fee) {
      return false
    }

    return true
  }

  handleTransaction(transaction) {
    const senderAddress = transaction.senderAddress
    const amount = transaction.amount
    const fee = transaction.fee

    if (!this.isValidTransaction(senderAddress, amount, fee)) {
      return false
    }

    // 更新发送方的余额
    const senderUTXO = this.utxos[senderAddress]
    senderUTXO.output.amount -= (amount + fee)

    // 处理新的交易输出
    const recipientUTXO = new UTXO(
      transaction.txHash,
      transaction.outputIndex,
      {
        address: transaction.recipientAddress,
        amount: amount,
      }
    )
    this.addUTXO(
      recipientUTXO.txHash,
      recipientUTXO.outputIndex,
      recipientUTXO.output
    )

    return true
  }
}

export default UTXOPool;
