import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { GetPetProfileUseCase as GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository

let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()

    sut = new GetPetDetailsUseCase(inMemoryPetsRepository)
  })

  it('shoud be able to get pet details', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zip_code: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password_hash: '987654321',
    })

    const petCreated = await inMemoryPetsRepository.create({
      name: 'Natal',
      city: 'Curitiba',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Adult',
      org_id: org.id,
    })

    const { pet } = await sut.execute({ petId: petCreated.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Natal')
  })

  it('shoud not be able to get pet details with wrong id', async () => {
    await expect(
      sut.execute({ petId: 'pet-id-not-existing' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
