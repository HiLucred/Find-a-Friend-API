import { Age, DependencyLevel, Pet, Size } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsByTheirCharacteristicsUseCaseRequest {
  age: Age
  size: Size
  energyLevel: number
  dependencyLevel: DependencyLevel
}

interface FetchPetsByTheirCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByTheirCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    size,
    energyLevel,
    dependencyLevel,
  }: FetchPetsByTheirCharacteristicsUseCaseRequest): Promise<FetchPetsByTheirCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      age,
      size,
      energyLevel,
      dependencyLevel,
    })

    return { pets }
  }
}
