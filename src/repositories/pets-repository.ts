import { Age, DependencyLevel, Pet, Prisma, Size } from '@prisma/client'

export interface FindManyByCharacteristicsParams {
  age: Age
  size: Size
  energyLevel: number
  dependencyLevel: DependencyLevel
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  findManyByCharacteristics({
    age,
    size,
    energyLevel,
    dependencyLevel,
  }: FindManyByCharacteristicsParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
