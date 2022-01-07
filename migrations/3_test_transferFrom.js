const TransferFromTest = artifacts.require("TransferFromTest");

module.exports = function (deployer) {
  deployer.deploy(TransferFromTest,"0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc");
};
