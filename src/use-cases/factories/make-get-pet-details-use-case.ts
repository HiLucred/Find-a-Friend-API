import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetPetProfileUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
  const petRepository = new PrismaPetsRepository()
  const getPetProfileUseCase = new GetPetProfileUseCase(petRepository)

  return getPetProfileUseCase
}
