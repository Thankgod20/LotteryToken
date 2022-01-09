const LotteryToken = artifacts.require("LotteryToken");
const WETH = artifacts.require("WETH");
const PancakeRouter = artifacts.require("PancakeRouter");
const TestTransferFrom = artifacts.require("TransferFromTest");
const PancakeFactory = artifacts.require("PancakeFactory");

contract("LotteryToken Contract", (accounts)=> {
    let lotteryToken = null;
    let weth = null;
    let pancakeswaprouter = null;
    let contractAddress = null;
    let testTransferFrom = null;
    let testTransferAddr = null;
    let pancakefact = null;
    let deployedTOAddr = "0xC3148837a10d7efa8d6CEa4E4546f59984b32eB8";
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
    /**
     * This section of the code test the basic function
     * of our token
     */
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents("Transfer").then(results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues);
            }
        });
    })
    //Check TOken Name
    it ("check for the name of Erc20 token", async() => {
        const name = await lotteryToken.name();
        console.log("Contract Name:-",name);
        //assert(name == "🤑LotteryTokenv5.3");
    });
    it ("check the balance of the ERC20 token", async() =>{
        const balance = await lotteryToken.balanceOf(accounts[0]);
        console.log("Balance of Token:-",balance.toString());

    });
    it ("Checks for pancakeswap pair if it exist", async()=>{
        const FactpairExist = await pancakefact.getPair("0x0269eD4F89Db282968aD2a3f7DDa7b2f84029cDF","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
        console.log("PancakeFactory Pair Exist:-",FactpairExist);
    } );

    it("Transfers Token from owner address to address one and from address one to two", async()=>{
        const tokenTransferA = await lotteryToken.transfer(accounts[1],'10000000000');
        console.log("Transferred From Owner:-",tokenTransferA);
        //Check the balance of token in address one
        const balance = await lotteryToken.balanceOf(accounts[1]);
        console.log("Balance of Token in Address 1:-",balance.toString());
        //transfer from address one to address two
        const tokenTransferB = await lotteryToken.transfer(accounts[2],'1000000000',{from:accounts[1]});
        console.log("Transferred From User:-",tokenTransferB);

    });
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents().then( results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues)
            }
            
        });
    })


  
})
