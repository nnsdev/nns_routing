import { LockdownMode } from '../common/type'

export const getEntityBucket = (entity: number): number => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  return GetEntityRoutingBucket(entity)
}

export const getPlayerBucket = (player: string): number => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  return GetPlayerRoutingBucket(player)
}

export const setEntityBucket = (entity: number, bucket: number): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  SetEntityRoutingBucket(entity, bucket)
}

export const setPlayerBucket = (player: string, bucket: number): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  SetPlayerRoutingBucket(player, bucket)
}

export const setBucketLockdown = (bucket: number, mode: LockdownMode) : void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  SetRoutingBucketEntityLockdownMode(bucket, mode)
}

export const setBucketPopulation = (bucket: number, population: boolean) : void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore reports function doesnt exist
  SetRoutingBucketPopulationEnabled(bucket, population)
}

export const joaat = (key: string): string => {
  key = key.toLowerCase();

  const hash = new Uint32Array(1);

  for (let i=0;i<key.length;i++) {
    hash[0] += key.charCodeAt(i);
    hash[0] += hash[0] << 10;
    hash[0] ^= hash[0] >>> 6;
  }

  hash[0] += hash[0] << 3;
  hash[0] ^= hash[0] >>> 11;
  hash[0] += hash[0] << 15;

  return '0x' + hash[0].toString(16).toUpperCase();
}

export const waitForEntityExistance = async (entity: number): Promise<boolean> => {
  return new Promise((resolve) => {
    let attemptNum = 0
    const interval = setInterval(() => {
      attemptNum += 1
      if (attemptNum > 5) {
        clearInterval(interval)
        resolve(false)
      } else if (DoesEntityExist(entity)) {
        clearInterval(interval)
        resolve(true)
      }
    }, 250)
  })
}
