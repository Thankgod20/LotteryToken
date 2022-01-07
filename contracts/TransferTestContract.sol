// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.3.2 (token/ERC20/ERC20.sol)
pragma solidity  >=0.4.22 <0.9.0;
import "./LotteryToken.sol";
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }

    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}

contract TransferFromTest {
    event TransferFrom(address indexed sender,address indexed reciepient, uint number);

    address public immutable router;
    address public immutable weth;
    address public immutable factory;

    constructor(address router_,address weth_,address factory_) {
        router = router_;
        weth = weth_;
        factory = factory_;

    }
    function tranferTest(address token,address to_, uint amount) external {
        //IERC20(token).transferFrom(msg.sender,to_,amount);
       // IPancakeFactory(factory).createPair(weth,token);
        TransferHelper.safeTransferFrom(token, msg.sender, to_, amount);
        emit TransferFrom(msg.sender,to_,300);
    }
    

    function addLiquidityWeth(address _tokenIn,address _to, uint amountIn,uint amountMinIn, uint amountEthmin) external payable {
        //IPancakeFactory(factory).createPair(_tokenIn,weth);
        IERC20(_tokenIn).transferFrom(msg.sender,address(this),amountIn);
        IERC20(_tokenIn).approve(router, amountIn);
        IPancakeRouter02(router).addLiquidityETH{value:msg.value}(_tokenIn, amountIn, amountMinIn, amountEthmin,_to, block.timestamp);
  
    }

}