import { Prisma } from '@prisma/client'
import {
  FindManyByCharacteristicsParams,
  PetsRepository,
} from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByCity(city: string) {
    const pets = await prisma.org.findMany({
      where: {
        city: {
          contains: city,
        },
      },
      select: {
        pets: true,
      },
    })

    return pets.flatMap((org) => org.pets)
  }

  async findManyByCharacteristics({
    age,
    size,
    energyLevel,
    dependencyLevel,
  }: FindManyByCharacteristicsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age,
        size,
        energy_level: energyLevel,
        dependency_level: dependencyLevel,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
