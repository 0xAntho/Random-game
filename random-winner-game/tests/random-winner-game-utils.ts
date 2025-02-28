import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  GameEnded,
  GameStarted,
  OwnershipTransferRequested,
  OwnershipTransferred,
  PlayerJoined
} from "../generated/RandomWinnerGame/RandomWinnerGame"

export function createGameEndedEvent(
  gameId: BigInt,
  winner: Address,
  requestId: BigInt
): GameEnded {
  let gameEndedEvent = changetype<GameEnded>(newMockEvent())

  gameEndedEvent.parameters = new Array()

  gameEndedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  gameEndedEvent.parameters.push(
    new ethereum.EventParam("winner", ethereum.Value.fromAddress(winner))
  )
  gameEndedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )

  return gameEndedEvent
}

export function createGameStartedEvent(
  gameId: BigInt,
  maxPlayers: i32,
  entryFee: BigInt
): GameStarted {
  let gameStartedEvent = changetype<GameStarted>(newMockEvent())

  gameStartedEvent.parameters = new Array()

  gameStartedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  gameStartedEvent.parameters.push(
    new ethereum.EventParam(
      "maxPlayers",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(maxPlayers))
    )
  )
  gameStartedEvent.parameters.push(
    new ethereum.EventParam(
      "entryFee",
      ethereum.Value.fromUnsignedBigInt(entryFee)
    )
  )

  return gameStartedEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent =
    changetype<OwnershipTransferRequested>(newMockEvent())

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createPlayerJoinedEvent(
  gameId: BigInt,
  player: Address
): PlayerJoined {
  let playerJoinedEvent = changetype<PlayerJoined>(newMockEvent())

  playerJoinedEvent.parameters = new Array()

  playerJoinedEvent.parameters.push(
    new ethereum.EventParam("gameId", ethereum.Value.fromUnsignedBigInt(gameId))
  )
  playerJoinedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return playerJoinedEvent
}
