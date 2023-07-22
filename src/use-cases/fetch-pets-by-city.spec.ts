import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository

let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrgsRepository)

    sut = new FetchPetsByCityUseCase(inMemoryPetsRepository)
  })

  it('shoud be able to fetch pets by city', async () => {
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
      org_id: org.id,
    })

    await inMemoryPetsRepository.create({
      name: 'Bela',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Adult',
      org_id: org.id,
    })

    await inMemoryPetsRepository.create({
      name: 'Bidu',
      about: 'Cão maluco.',
      age: 'Puppy',
      org_id: orgTwo.id,
    })

    const { pets } = await sut.execute({
      city: org.city,
    })

    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Natal',
      }),
      expect.objectContaining({
        name: 'Bela',
      }),
    ])
  })
})
