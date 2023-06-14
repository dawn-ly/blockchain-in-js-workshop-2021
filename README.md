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

[https://github.com/dawn-ly/blockchain-in-js-workshop-2021/blob/lesson1/dawn-ly.md](https://github.com/dawn-ly/blockchain-in-js-workshop-2021/tree/final)


## 第一课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af

### 代码截图

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230614221212569.png)

![image-20230614221235807](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230614221235807.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230614221304933.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230614221324603.png)

![](https://cdn.jsdelivr.net/gh/bcYng-image/image/img/image-20230614221346385.png)

### 主观与讨论题内容

1. 私钥签名的过程：私钥签名是通过使用私钥对待签名数据进行加密，生成一个数字签名。在实验中，我使用了 Node.js 的 `crypto` 模块来进行签名操作。首先，我创建了一个 `Sign` 对象，并指定使用 SHA256 算法。然后，我将待签名的数据转换为字符串，并更新到 `Sign` 对象中。最后，我调用 `sign` 方法，传入私钥和输出编码格式，生成签名结果。
2. 签名验证的过程：签名验证是通过使用公钥和签名来验证数据的完整性和真实性。在实验中，我同样使用了 `crypto` 模块来进行验证操作。首先，我创建了一个 `Verify` 对象，并指定使用 SHA256 算法。然后，我将待验证的数据转换为字符串，并更新到 `Verify` 对象中。最后，我调用 `verify` 方法，传入公钥、签名和输入编码格式，进行验证并得到验证结果。
3. 密钥对的生成和使用：在实验中，我使用了比特币中的非压缩公钥和私钥。私钥是一个随机的256位数，对应一个唯一的公钥。我使用私钥来进行签名操作，并将公钥用作验证签名的依据。
4. 数据的完整性和真实性：私钥签名是一种常用的方法，用于确保数据的完整性和真实性。通过对数据进行签名，可以防止数据在传输过程中被篡改，同时还可以验证数据的来源和真实性。这在比特币网络中起着重要的作用，用于验证交易和确保交易的有效性。
