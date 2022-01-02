const LotteryToken = artifacts.require("LotteryToken");

contract("Contract Name", (accounts)=> {
    let lotteryToken = null;
    before(async()=>{
        lotteryToken = await LotteryToken.new(accounts[0],"1000000000000000000000000",0);
       
    });
    it("Listen to all Emitted Events", async() =>{
        lotteryToken.getPastEvents("Transfer").then(console.log)
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
        const pairExist = await lotteryToken.getTokenPair("0x9831F740e1B2527CB9Aa6C45F40BB1d14602917e","0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd");
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
        lotteryToken.getPastEvents("Transfer").then(console.log)
    })

  
})