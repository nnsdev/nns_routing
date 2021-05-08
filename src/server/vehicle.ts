import { Vector3 } from 'fivem-js';
import { joaat, waitForEntityExistance } from './helpers';

export const createVehicle = async (model: string|number, position: Vector3, heading: number): Promise<number> => {
  const vehicle = Citizen.invokeNative(
    joaat("CREATE_AUTOMOBILE"),
    typeof model === "string" ? GetHashKey(model) : model,
    position.x,
    position.y,
    position.z
  ) as number

  const exists = await waitForEntityExistance(vehicle)
  if (!exists) {
    console.log('COULD NOT CREATE VEHICLE')
    return 0
  }

  SetEntityHeading(vehicle, heading)

  return vehicle
}