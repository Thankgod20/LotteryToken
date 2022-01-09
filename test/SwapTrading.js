const LotteryToken = artifacts.require("LotteryToken");
const WETH = artifacts.require("WETH");
const PancakeRouter = artifacts.require("PancakeRouter");
const TestTransferFrom = artifacts.require("TransferFromTest");
const PancakeFactory = artifacts.require("PancakeFactory");
const BN = require("bn.js");

contract("Swap Token Trading", (accounts)=> {
    let lotteryToken = null;
    let weth = null;
    let pancakeswaprouter = null;
    let contractAddress = null;
    let testTransferFrom = null;
    let testTransferAddr = null;
    let pancakefact = null;
    let deployedTOAddr = "0xC3148837a10d7efa8d6CEa4E4546f59984b32eB8";
    /**
     * This test calls the Pancake Swap addLiquidityETH function
     * Directly instead of a middleman app
     */
    before(async()=>{
        lotteryToken = await LotteryToken.new(accounts[0],"1000000000000000000000000",0,5,10,20,20);
        weth = await WETH.at('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd');
        pancakeswaprouter = await PancakeRouter.at("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3");
        pancakefact = await PancakeFactory.at("0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc");
        testTransferFrom = await TestTransferFrom.new("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc");

        contractAddress = lotteryToken.address;
        testTransferAddr = testTransferFrom.address;

        console.log("Contract Address:-",contractAddress);
        console.log("TestTransfer Contract Address:-",testTransferAddr);
    });

    it ("Add Liquidity to the pancake Swap router", async() =>{
        return lotteryToken.approve(pancakeswaprouter.address,"1000000000").then(async() =>{
            return pancakeswaprouter.addLiquidityETH(contractAddress,"100000000",1,1,accounts[0],Math.floor(Date.now() / 1000) + 60 * 10,{value:10})
        })
    });
    it ("Checks for pancakeswap pair if it exist", async()=>{
        const FactpairExist =  await pancakefact.getPair(lotteryToken.address,"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
        console.log("PancakeFactory Pair Exist:-",FactpairExist);
        const BalaceOFWETH = await weth.balanceOf(FactpairExist);
        console.log("Initial Liquidity:-",BalaceOFWETH.toString());
    } );
    it ("Swap eth for token for all 9 account",async() =>{
        let amountOut = await pancakeswaprouter.getAmountsOut(new BN(1),[contractAddress,weth.address]);
        console.log(amountOut.toString());
         for (let i = 0; i<10;i++) {
            return pancakeswaprouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
                0,
                [weth.address,contractAddress],
                accounts[i],
                Math.floor(Date.now() / 1000) + 60 * 10,
                {from:accounts[i],value:new BN(Math.random(1,2))}
            );
        }
    })
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents().then( results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues)
            }
            
        });
    });
});