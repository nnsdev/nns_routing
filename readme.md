# nns_routing

Basic fivem library to support routing buckets to split game state

## Intro

- A player gets pushed into the player routing bucket table upon the `PLAYER_JOIN_EVENT` that is configured in the config. I recommend using an event where the character is loaded on RP servers or just basic join events.
- A player gets cleaned from the table on the `PLAYER_QUIT_EVENT` config option, I would recommend setting this to some form of character unload event on RP servers or just basic quit events.

## Config options

- `PLAYER_JOINED_EVENT` and `PLAYER_QUIT_EVENT` config values as explained above.
- You can define default bucket settings that are used when new buckets are created without definition in `defaultBucketSettings`
- You can define specific buckets to have specific settings by default in the `numericDefinedBuckets` config option

## Provided Exports

### Server Exports

- `exports['nns_routing']:SetEntityBucket(:entity, :bucket): void`

Moves the entity to specified bucket. If the bucket does not get defined it gets created with default properties

- `exports['nns_routing']:SetEntityBucket(:entity): number`

Gets the bucket the entity is currently in

- `exports['nns_routing']:SetPlayerBucket(:playerSrc, :bucket): void`

Moves the player to specified bucket. If the bucket does not get defined it gets created with default properties

- `exports['nns_routing']:GetPlayerBucket(:playerSrc): number`

Gets the bucket the player is currently in

- `exports['nns_routing']:DefineBucket(:bucket, :options): void`

(Re)defines a bucket's properties. Options are defined as
```ts
{
  lockdownMode?: "strict" | "relaxed" | "inactive"
  population?: boolean
}
```

- `exports['nns_routing']:CreateVehicle(:model, :position, :heading, :bucket): number`

Creates a serverside vehicle using the `CREATE_AUTOMOBILE` native and moves it to the specific bucket. Model can be string or hash. Returns vehicle ID

- `exports['nns_routing']:CreatePed(:model, :position, :heading, :bucket): number`

Creates a serverside ped and moves it to the specific bucket. Model can be string or hash. Returns entity ID


- `exports['nns_routing']:CreateObject(:model, :position, :heading, :bucket): number`

Creates a serverside object and moves it to the specific bucket. Model can be string or hash. Returns entity ID

- `exports['nns_routing']:DeleteEntity(:entity): void`

Calls `DeleteEntity` and cleans up data in the routing tables

- `exports['nns_routing']:RemovePlayer(:playerSrc): void`

Just cleans up data in the routing tables

-----------------

### Client Exports

- `exports['nns_routing']:GetMyBucket(): number`

Returns the bucket the player is currently in.

## Explanation of Lockdown Mode values

| Mode     | Explanation                                               |
|----------|-----------------------------------------------------------|
| strict   | No entities can be created by clients at all              |
| relaxed  | Only script-owned entities created by clients are blocked |
| inactive | Clients can create any entity they want                   |