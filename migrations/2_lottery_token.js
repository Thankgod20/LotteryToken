const LotteryToken = artifacts.require("LotteryToken");

module.exports = function (deployer) {
  deployer.deploy(LotteryToken,'0xC3148837a10d7efa8d6CEa4E4546f59984b32eB8','1000000000000000000000000','0');
};
