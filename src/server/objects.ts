import { Vector3 } from 'fivem-js';
import { waitForEntityExistance } from './helpers';

export const createObject = async (model: string|number, position: Vector3, heading: number): Promise<number> => {
  model = typeof model === "string" ? GetHashKey(model) : model

  const entity = CreateObjectNoOffset(model, position.x, position.y, position.z, true, true, true)

  const exists = await waitForEntityExistance(entity)
  if (!exists) {
    console.log('COULD NOT CREATE OBJECT')
    return 0
  }

  SetEntityHeading(entity, heading)

  return entity
}