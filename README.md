# 实验报告模板

## 小组成员

- 2021131043-刘杨
- 2021131042-杜以晴
- 2021131044-韦薪程
- 2021131010-张雨桐
- 2021131001-敬家好
- 2021131005-何欣
- 2021131004-陈莉


## 代码仓库链接

https://github.com/dawn-ly/blockchain-in-js-workshop-2021/blob/lesson1/dawn-ly.md


## 第一课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af

### 代码截图

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/62741685721377_.pic.jpg)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230602235712485.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230602235736603.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230602235758404.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230602235818915.png)

### 主观与讨论题内容

在完成这个实验的过程中，我学到了许多关于区块链的基本概念和实现细节。通过编写区块、区块链和交易相关的代码，我深入理解了区块链的工作原理和各个组成部分之间的关系。

首先，我了解到区块是区块链中的基本单位，每个区块包含了前一个区块的哈希、区块高度、数据以及交易列表等信息。我学会了如何计算区块的哈希，并使用哈希值来验证区块的有效性。

其次，我学习了如何构建一个简单的区块链。我实现了一个 `Blockchain` 类来管理区块链，并能够添加新的区块、验证区块链的完整性以及获取最长链等操作。通过这个过程，我更加深入地理解了区块链的链式结构和共识算法的重要性。

在处理交易方面，我学会了创建交易对象、计算交易的哈希以及验证交易的有效性。我了解到交易是区块链中的重要组成部分，它们被打包进区块并通过验证确保数据的一致性和安全性。

此外，我还学习了如何管理未使用的交易输出（UTXO）池，它是跟踪交易输出状态的重要数据结构。我实现了一个 `UTXOPool` 类来管理 UTXO，并添加了验证交易和处理交易的功能。

通过完成这个实验，我对区块链的核心概念和原理有了更深入的理解，并且通过实际编码实践加深了对区块链技术的掌握。我体会到了区块链的去中心化、不可篡改和安全性等特点，以及构建区块链应用程序的基本步骤和要点。