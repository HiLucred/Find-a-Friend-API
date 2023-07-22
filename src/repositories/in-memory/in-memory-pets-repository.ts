import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'
import {
  FindManyByCharacteristicsParams,
  PetsRepository,
} from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(public orgsRepository?: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string) {
    if (!this.orgsRepository) {
      return []
    }

    const orgs = await this.orgsRepository.findManyByCity(city)

    const pets = this.items.filter((pet) => {
      return orgs.find((org) => org.id === pet.org_id)
    })

    return pets
  }

  async findManyByCharacteristics({
    age,
    size,
    energyLevel,
    dependencyLevel,
  }: FindManyByCharacteristicsParams) {
    const pets = this.items.filter((pet) => {
      const petFiltered =
        pet.age === age &&
        pet.size === size &&
        pet.energy_level === energyLevel &&
        pet.dependency_level === dependencyLevel

      return petFiltered
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age ?? null,
      size: data.size ?? null,
      energy_level: data.energy_level ?? null,
      dependency_level: data.dependency_level ?? null,
      photos: [],
      requirements: [],
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
