const LotteryToken = artifacts.require("LotteryToken");
const WETH = artifacts.require("WETH");
const PancakeRouter = artifacts.require("PancakeRouter");

contract("LotteryToken Contract", (accounts)=> {
    let lotteryToken = null;
    let weth = null;
    let pancakeswaprouter = null;
    let contractAddress = null;
    before(async()=>{
        lotteryToken = await LotteryToken.new(accounts[0],"1000000000000000000000000",0);
        weth = await WETH.at('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd');
        pancakeswaprouter = await PancakeRouter.at("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3");
        contractAddress = lotteryToken.address;
        console.log("Contract Address:-",contractAddress);
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
    it ("check for the name of Erc20 token", async() => {
        const name = await lotteryToken.name();//balanceOf("0x9831F740e1B2527CB9Aa6C45F40BB1d14602917e");
        console.log("Contract Name:-",name);
        //assert(name == "🤑LotteryTokenv5.3");
    });
    it ("check the balance of the ERC20 token", async() =>{
        const balance = await lotteryToken.balanceOf(accounts[0]);
        console.log("Balance of Token:-",balance.toString());

    });
    it ("Checks for pancakeswap pair if it exist", async()=>{
        const pairExist = await lotteryToken.getTokenPair("0x0269eD4F89Db282968aD2a3f7DDa7b2f84029cDF","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
        console.log("Pair Created:-",pairExist);
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
/**
 * This Section of the code test for the adding 
 * Liquidity on pancake swap and also trading the token
 * Transfer function will be tested also to test the swapandliquifyToken function
 */
    it("Listen to WETH balance", async() =>{
        const getWethBalance = await weth.totalSupply();
        console.log("Total Supply:-",getWethBalance.toString())
    });
    //Approve RouterTOSpend the token
    it ("Approve Router Contract to spend token", async() =>{
        //let WrappedBnB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
        let routerAddr = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
        lotteryToken.approve(routerAddr,"1000000000000000000000000",{from:accounts[0]}).then(async()=> {
                let checkApproval = await lotteryToken.allowance(accounts[0],routerAddr);
                console.log("Approval Amount:-",checkApproval.toString());
        });

    });
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents().then( results =>{ 
            for (let x in results) {
                console.log(results[x].returnValues)
            }
            
        });
    })
    it ("Add Liquidity to Pancake Swap", async()=>{
        let routerAddr = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
        let checkApproval = await lotteryToken.allowance(accounts[0],routerAddr);
        console.log("Approval Amount:-",checkApproval.toString());

        const addLiquidity = await pancakeswaprouter.addLiquidityETH(contractAddress,
            "100000000000000000000000",
            "50000000000000000000000",
            "10000000000000000000",
            accounts[0],
            (Math.round(Date.now()/1000)+60*20),
            {value:10,from:accounts[0]}
            );
        console.log(addLiquidity)
    })
    it ("Checks for pancakeswap pair if it exist", async()=>{
        const pairExist = await lotteryToken.getTokenPair(contractAddress,"0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
        console.log("Pair Created:-",pairExist);
    } );
  

  
})
