export type LockdownMode = "strict" | "relaxed" | "inactive"

export interface RoutingBucket {
  lockdownMode: LockdownMode
  population: boolean
}