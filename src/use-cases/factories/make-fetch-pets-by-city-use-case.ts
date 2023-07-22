import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const petRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petRepository)

  return fetchPetsByCityUseCase
}
