import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { FetchPetsByTheirCharacteristicsUseCase } from '../fetch-pets-by-their-characteristics'

export function makeFetchPetsByTheirCharacterisctUseCase() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetsByTheirCharacterisctUseCase =
    new FetchPetsByTheirCharacteristicsUseCase(petRepository)

  return fetchPetsByTheirCharacterisctUseCase
}
