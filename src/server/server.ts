import { PLAYER_JOINED_EVENT, PLAYER_QUIT_EVENT, defaultBucketSettings, numericDefinedBuckets } from '../common/config'
import { RoutingBucket, LockdownMode } from '../common/type';
import { setPlayerBucket, getEntityBucket, getPlayerBucket, setEntityBucket, setBucketLockdown, setBucketPopulation } from './helpers'
import { Vector3 } from 'fivem-js';
import { createVehicle } from './vehicle';
import { createPed } from './ped';
import { createObject } from './objects';

const playerRoutingBuckets: { [key: string]: number } = {}
const entityRoutingBuckets: { [key: number]: number } = {}
const routingBuckets: { [key: number]: RoutingBucket } = {}

on(PLAYER_JOINED_EVENT, (source: string) => {
  if (playerRoutingBuckets[source] != null) {
    delete playerRoutingBuckets[source]
  }

  const bucket = getPlayerBucket(source)

  playerRoutingBuckets[source] = bucket

  if (!routingBuckets[bucket]) {
    setRoutingBucket(bucket)
  }
})

on (PLAYER_QUIT_EVENT, (source: string) => {
  if (playerRoutingBuckets[source] != null) {
    delete playerRoutingBuckets[source]
  }
})

const setRoutingBucket = (bucket: number, options?: Partial<RoutingBucket>) => {
  const lockdownMode = getDefault(bucket, "lockdownMode", options ? options?.lockdownMode : null) as LockdownMode
  const population = getDefault(bucket, "population", options ? options?.population : null) as boolean

  setBucketLockdown(bucket, lockdownMode)
  setBucketPopulation(bucket, population)

  routingBuckets[bucket] = { lockdownMode, population }
}

const getDefault = (bucket: number, key: "lockdownMode"|"population", mode: LockdownMode|boolean|null): boolean|LockdownMode => {
  if (mode) {
    return mode
  }

  if (numericDefinedBuckets[bucket] != null && numericDefinedBuckets[bucket][key]) {
    return numericDefinedBuckets[bucket][key]
  }
  return defaultBucketSettings[key]
}

global.exports("SetEntityBucket", (entity: number, bucket: number) => {
  if (!routingBuckets[bucket]) {
    setRoutingBucket(bucket)
  }

  entityRoutingBuckets[entity] = bucket
  setEntityBucket(entity, bucket)
})

global.exports("GetEntityBucket", (entity: number) => {
  return entityRoutingBuckets[entity] ?? getEntityBucket(entity)
})

global.exports("SetPlayerBucket", (player: string, bucket: number) => {
  if (!routingBuckets[bucket]) {
    setRoutingBucket(bucket)
  }

  playerRoutingBuckets[player] = bucket
  setPlayerBucket(player, bucket)
  emit("nns_routing:server:playerBucketSet", player, bucket)
  emitNet("nns_routing:client:playerBucketSet", player, bucket)
})

global.exports("GetPlayerBucket", (player: string) => {
  return playerRoutingBuckets[player] ?? getPlayerBucket(player)
})

global.exports("DefineBucket", (bucket: number, options: Partial<RoutingBucket>) => {
  setRoutingBucket(bucket, options)
})

global.exports("CreateVehicle", async (model: string|number, position: Vector3, heading: number, bucket: number) => {
  const vehicle = await createVehicle(model, position, heading)

  if (vehicle == 0) {
    return console.log('ERROR CREATING VEHICLE IN BUCKET')
  }

  setEntityBucket(vehicle, bucket)
  entityRoutingBuckets[vehicle] = bucket

  return vehicle
})

global.exports("CreatePed", async (pedType: number, model: string|number, position: Vector3, heading: number, bucket: number) => {
  const entity = await createPed(pedType, model, position, heading)

  if (entity == 0) {
    return console.log('ERROR CREATING PED IN BUCKET')
  }

  setEntityBucket(entity, bucket)
  entityRoutingBuckets[entity] = bucket

  return entity
})

global.exports("CreateObject", async (model: string|number, position: Vector3, heading: number, bucket: number) => {
  const entity = await createObject(model, position, heading)

  if (entity == 0) {
    return console.log('ERROR CREATING OBJECT IN BUCKET')
  }

  setEntityBucket(entity, bucket)
  entityRoutingBuckets[entity] = bucket

  return entity
})

global.exports("DeleteEntity", (entity: number) => {
  DeleteEntity(entity)
  delete entityRoutingBuckets[entity]
})

global.exports("RemovePlayer", (player: string) => {
  delete playerRoutingBuckets[player]
})