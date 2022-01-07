const LotteryToken = artifacts.require("LotteryToken");
const WETH = artifacts.require("WETH");
const PancakeRouter = artifacts.require("PancakeRouter");
const TestTransferFrom = artifacts.require("TransferFromTest");
const PancakeFactory = artifacts.require("PancakeFactory");

contract("AddLiquidity Contract", (accounts)=> {
    let lotteryToken = null;
    let weth = null;
    let pancakeswaprouter = null;
    let contractAddress = null;
    let testTransferFrom = null;
    let testTransferAddr = null;
    let pancakefact = null;
    let deployedTOAddr = "0xC3148837a10d7efa8d6CEa4E4546f59984b32eB8";
    before(async()=>{
        lotteryToken = await LotteryToken.new(accounts[0],"1000000000000000000000000",0);
        weth = await WETH.at('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd');
        pancakeswaprouter = await PancakeRouter.at("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3");
        pancakefact = await PancakeFactory.at("0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc");
        testTransferFrom = await TestTransferFrom.new("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd","0xB7926C0430Afb07AA7DEfDE6DA862aE0Bde767bc");

        contractAddress = lotteryToken.address;
        testTransferAddr = testTransferFrom.address;

        console.log("Contract Address:-",contractAddress);
        console.log("TestTransfer Contract Address:-",testTransferAddr);
    });
    /**
     * This test add Liquidity to Pancake Swap by Calling the method
     * through a middle man class
     */
    it ("check the balance of the ERC20 token", async() =>{
        const balance = await lotteryToken.balanceOf(accounts[0]);
        console.log("Balance of Token:-",balance.toString());
        const balanceTwo = await lotteryToken.balanceOf(deployedTOAddr);
        console.log("Balance of Token:-",balanceTwo.toString());

    });

    it ("Test the testTransferFrom function", async() =>{
        console.log("Message sender:-",testTransferFrom.address);
        console.log("Account Zero:-",accounts[0]);
        return lotteryToken.approve(testTransferFrom.address,10000000).then(()=>{
            return testTransferFrom.tranferTest(contractAddress,accounts[1],100000);
        } );
        
    });
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents().then( results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues)
            }
            
        });
    }); 
    it ("Add liquidity to pancakeswap router",async() =>{
        return (lotteryToken.approve(testTransferAddr,"1000000000000")).then(async ()=> {

            return testTransferFrom.addLiquidityWeth(contractAddress,accounts[0],"100000000",1,1,{value:1}).then (async result =>{
                    let bal = await lotteryToken.balanceOf(testTransferAddr)
                    console.log("TestTransferBalance:-",bal.toString());
                    console.log(result);
            })
        });

    });
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents().then( results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues)
            }
            
        });
    });
    it ("Checks for pancakeswap pair if it exist", async()=>{
        const FactpairExist = await pancakefact.getPair(lotteryToken.address,"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
        console.log("PancakeFactory Pair Exist:-",FactpairExist);
    } );
 

});