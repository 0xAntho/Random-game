// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import "chainlink/contracts/src/v0.8/vrf/dev/VRFV2PlusWrapperConsumerBase.sol";
import "chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";


contract RandomWinnerGame is VRFV2PlusWrapperConsumerBase, ConfirmedOwner {


    // emitted when the game starts
    event GameStarted(uint256 gameId, uint8 maxPlayers, uint256 entryFee);
    // emitted when someone joins a game
    event PlayerJoined(uint256 gameId, address player);
    // emitted when the game ends
    event GameEnded(uint256 gameId, address winner, uint256 requestId);


    //Chainlink variables
    // The amount of LINK to send with the request
    uint256 public fee;
    // ID of public key against which randomness is generated
    bytes32 public keyHash;

    uint32 public callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 public requestConfirmations = 3;

    // For this example, retrieve 1 random values in one request.
    // Cannot exceed VRFV2Wrapper.getConfig().maxNumWords.
    uint32 public numWords = 1;

    // Address LINK - hardcoded for Sepolia
    address public linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

    // address WRAPPER - hardcoded for Sepolia
    address public wrapperAddress = 0x195f15F2d49d693cE265b4fB0fdDbE15b1850Cc1;

    // Address of the players
    address[] public players;
    //Max number of players in one game
    uint8 maxPlayers;
    // Variable to indicate if the game has started or not
    bool public gameStarted;
    // the fees for entering the game
    uint256 entryFee;
    // current game id
    uint256 public gameId;

    constructor()
        
        ConfirmedOwner(msg.sender)
        VRFV2PlusWrapperConsumerBase(wrapperAddress)
    {}

    /**
     * startGame starts the game by setting appropriate values for all the variables
     */
    function startGame(uint8 _maxPlayers, uint256 _entryFee) public onlyOwner {
        // Check if there is a game already running
        require(!gameStarted, "Game is currently running");
        // Check if _maxPlayers is greater than 0
        require(
            _maxPlayers > 0,
            "You cannot create a game with max players limit equal 0"
        );
        // empty the players array
        delete players;
        // set the max players for this game
        maxPlayers = _maxPlayers;
        // set the game started to true
        gameStarted = true;
        // setup the entryFee for the game
        entryFee = _entryFee;
        gameId += 1;
        emit GameStarted(gameId, maxPlayers, entryFee);
    }

    /**
    joinGame is called when a player wants to enter the game
     */
    function joinGame() public payable {
        // Check if a game is already running
        require(gameStarted, "Game has not been started yet");
        // Check if the value sent by the user matches the entryFee
        require(msg.value == entryFee, "Value sent is not equal to entryFee");
        // Check if there is still some space left in the game to add another player
        require(players.length < maxPlayers, "Game is full");
        // add the sender to the players list
        players.push(msg.sender);
        emit PlayerJoined(gameId, msg.sender);
        // If the list is full start the winner selection process
        if (players.length == maxPlayers) {
            getRandomWinner();
        }
    }

    //Receives random values and stores them with your contract.
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        uint256 winnerIndex = _randomWords[0] % players.length;
        // get the address of the winner from the players array
        address winner = players[winnerIndex];
        // send the ether in the contract to the winner
        (bool sent, ) = winner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        // Emit that the game has ended
        emit GameEnded(gameId, winner, _requestId);
        // set the gameStarted variable to false
        gameStarted = false;
    }


    //Takes your specified parameters and submits the request to the VRF v2.5 Wrapper contract.
    function requestRandomWords() private returns (uint256) {
        bytes memory extraArgs = VRFV2PlusClient._argsToBytes(
            VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
        );
        uint256 requestId;
        uint256 reqPrice;
        
        // requestRandomness is a function within the VRFV2PlusWrapperConsumerBase
        // it starts the process of randomness generation
        (requestId, reqPrice) = requestRandomness(
            callbackGasLimit,
            requestConfirmations,
            numWords,
            extraArgs
        );

        return requestId;
    }

    /**
     * getRandomWinner is called to start the process of selecting a random winner
     */
    function getRandomWinner() private returns (uint256 requestId) {
        // LINK is an interface for Link token 
        // Here we use the balanceOF method from that interface to make sure that our
        // contract has enough link so that we can request the VRFCoordinator for randomness
        LinkTokenInterface LINK  = LinkTokenInterface(linkAddress);
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");

        return requestRandomWords();
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
