"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useEffect,  useState } from "react";
import { abi, RANDOM_GAME_NFT_CONTRACT_ADDRESS } from "@/constants";
import { FETCH_CREATED_GAME } from "@/queries";
import { subgraphQuery } from "@/utils";
import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { sepolia } from "viem/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "viem";

export default function Home() {


  const { address } = useAccount();

  // this hook from wagmi helps us to perform write transactions on our contract
  //it has a function called writeContractAsync that can be awaited
  const { writeContractAsync } = useWriteContract();
  

  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // boolean to keep track of whether the current connected account is owner or not
 let isOwner = false
  // entryFee is the ether required to enter a game
  const [entryFee, setEntryFee] = useState("");
  // maxPlayers is the max number of players that can play the game
  let maxPlayers = 0
  // Checks if a game started or not
  let gameStarted = false
  const [players, setPlayers] = useState([]);
  // Winner of the game
  const [winner, setWinner] = useState();
  // Keep a track of all the logs for a given game
  const [logs, setLogs] = useState([]);
  

  // this hook from wagmi allows us to read multiple values from a contract and store them in a single variable
  // it will return an object whose "data" key will contain an array of objects. All objects will have a "result" key which will contain our required data as the value
  const contractReadResult = useReadContracts({
    contracts: [

      {
        address: RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "gameStarted",
        chainId: sepolia.id,
      },
      {
        address: RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "owner",
        chainId: sepolia.id,
      },

    ],
  });

  if(contractReadResult.data){

    console.log(contractReadResult.data)

    gameStarted = (contractReadResult.data[0].result)

    if(contractReadResult.data[1].result == address) {
      isOwner = true
    }
  }


  

  /**
   * startGame: Is called by the owner to start the game
   */
  const startGame = async () => {
    try {
      setLoading(true);
      // call the startGame function from the contract
     await writeContractAsync({
        abi,
        address: RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        functionName: "startGame",
        args: [maxPlayers, parseEther(entryFee)],
      })
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  /**
   * joinGame: Is called by a player to join the game
   */
  const joinGame = async () => {
    console.log(entryFee)
    try {
      setLoading(true);
      // call the startGame function from the contract
      await writeContractAsync({
        abi,
        address: RANDOM_GAME_NFT_CONTRACT_ADDRESS,
        functionName: "joinGame",
        value:entryFee

      })
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  const logger = async () => {
    try {

      const _gameArray = await subgraphQuery(FETCH_CREATED_GAME());
      if (_gameArray.games.length>0){
      const _game = _gameArray.games[0];
      let _logs = [];
      // Initialize the logs array and query the graph for current gameID
      if (gameStarted) {
        _logs = [`Game has started with ID: ${_game.id}`];
        if (_game.players && _game.players.length > 0) {
          _logs.push(
            `${_game.players.length} / ${_game.maxPlayers} already joined 👀 `
          );
          _game.players.forEach((player) => {
            _logs.push(`${player} joined 🏃‍♂️`);
          });
        }
        console.log("entry fee is ", _game.entryFee)
        setEntryFee((_game.entryFee));
        maxPlayers = (_game.maxPlayers);
        console.log(maxPlayers)
      } 
      
      else if (!gameStarted && _game.winner) {
        _logs = [
          `Last game has ended with ID: ${_game.id}`,
          `Winner is: ${_game.winner} 🎉 `,
          `Waiting for host to start new game....`,
        ];

        setWinner(_game.winner);
      }
      setLogs(_logs);
      setPlayers(_game.players);

    }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      logger();
  }, [contractReadResult.data]);

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!address) {
      return (
        <div className={styles.connect}>
          <ConnectButton />
        </div>
      );
    }

    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }
    // Render when the game has started
    if (gameStarted) {
      if (players.length === maxPlayers) {
        return (
          <button className={styles.button} disabled>
            Choosing winner...
          </button>
        );
      }
      return (
        <div>
          <button className={styles.button} onClick={joinGame}>
            Join Game 🚀
          </button>
        </div>
      );
    }
    // Start the game
    if (isOwner && !gameStarted) {
      return (
        <div>
          <input
            type="number"
            className={styles.input}
            onChange={(e) => {
              // The user will enter the value in ether, we will need to convert
              // it to WEI using parseEther
              setEntryFee(
                e.target.value >= 0
                  ? (e.target.value.toString())
                  : 0
              );
            }}
            placeholder="Entry Fee (ETH)"
          />
          <input
            type="number"
            className={styles.input}
            onChange={(e) => {
              // The user will enter the value for maximum players that can join the game
              maxPlayers = (e.target.value ?? 0);
            }}
            placeholder="Max players"
          />
          <button className={styles.button} onClick={startGame}>
            Start Game 🚀
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Random Winner Game!</h1>
          <div className={styles.description}>
            It is a lottery game where a winner is chosen at random and wins the
            entire lottery pool
          </div>
          {renderButton()}
          {logs &&
            logs.map((log, index) => (
              <div className={styles.log} key={index}>
                {log}
              </div>
            ))}
        </div>
        <div>
          <img className={styles.image} src="/randomWinner.png" />
        </div>
      </div>

      <footer className={styles.footer}>Made with &#10084; by Your Name</footer>
    </div>
  );
}
