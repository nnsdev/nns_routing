let currentBucket = 0

onNet("nns_routing:client:playerBucketSet", (bucket: number) => {
  currentBucket = bucket
})

global.exports("GetMyBucket", () => {
  return currentBucket
})