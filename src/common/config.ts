import { RoutingBucket } from './type';
export const PLAYER_JOINED_EVENT = "nsb_base:characterLoaded"

export const PLAYER_QUIT_EVENT = "playerDropped"


export const defaultBucketSettings: RoutingBucket = {
  lockdownMode: "inactive",
  population: true
}

export const numericDefinedBuckets: { [key: number]: RoutingBucket } = {
  0: defaultBucketSettings
}