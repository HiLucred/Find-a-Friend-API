import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByTheirCharacteristicsUseCase } from './fetch-pets-by-their-characteristics'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository

let sut: FetchPetsByTheirCharacteristicsUseCase

describe('Fetch Pets By Their Characteristics Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryOrgsRepository = new InMemoryOrgsRepository()

    sut = new FetchPetsByTheirCharacteristicsUseCase(inMemoryPetsRepository)
  })

  it('shoud be able to fetch pets by their characteristics', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zip_code: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password_hash: '987654321',
    })

    const orgTwo = await inMemoryOrgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zip_code: '87654321',
      address: 'Rua do meio',
      city: 'São Paulo',
      phone: '41 98989898',
      password_hash: '987654321',
    })

    await inMemoryPetsRepository.create({
      name: 'Natal',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Adult',
      size: 'Large',
      energy_level: 3,
      dependency_level: 'High',
      org_id: org.id,
    })

    await inMemoryPetsRepository.create({
      name: 'Tina',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Puppy',
      size: 'Tiny',
      energy_level: 3,
      dependency_level: 'Low',
      org_id: org.id,
    })

    await inMemoryPetsRepository.create({
      name: 'Bianca',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Adult',
      size: 'Large',
      energy_level: 3,
      dependency_level: 'High',
      org_id: orgTwo.id,
    })

    const { pets } = await sut.execute({
      age: 'Adult',
      size: 'Large',
      energyLevel: 3,
      dependencyLevel: 'High',
    })

    expect(pets).toEqual([
      expect.objectContaining({ age: 'Adult' }),
      expect.objectContaining({ age: 'Adult' }),
    ])

    expect(pets).toHaveLength(2)
  })
})
