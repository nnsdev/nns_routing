import { Vector3 } from 'fivem-js';
import { waitForEntityExistance } from './helpers';

export const createPed = async (pedType: number, model: string|number, position: Vector3, heading: number): Promise<number> => {
  const entity = CreatePed(
    pedType,
    typeof model === "string" ? GetHashKey(model) : model,
    position.x,
    position.y,
    position.z,
    heading,
    true,
    true
  )

  const exists = await waitForEntityExistance(entity)
  if (!exists) {
    console.log('COULD NOT CREATE PED')
    return 0
  }

  return entity
}