import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let inMemoryPetsRepository: InMemoryPetsRepository

let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()

    sut = new RegisterPetUseCase(inMemoryPetsRepository, inMemoryOrgsRepository)
  })

  it('shoud be able to register pet', async () => {
    const org = await inMemoryOrgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zip_code: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password_hash: '987654321',
    })

    const { pet } = await sut.execute({
      name: 'Natal',
      about: 'Cadela carinhosa e cheia de amor para dar.',
      age: 'Adult',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register with a non-existent organization', async () => {
    await expect(
      sut.execute({
        name: 'Natal',
        about: 'Cadela carinhosa e cheia de amor para dar.',
        age: 'Adult',
        orgId: 'non-existent organization',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
