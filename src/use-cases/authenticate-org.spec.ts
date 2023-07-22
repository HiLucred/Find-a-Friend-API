import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(inMemoryOrgsRepository)
  })

  it('shoud be able to authenticate a org', async () => {
    await inMemoryOrgsRepository.create({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zip_code: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password_hash: await hash('987654321', 6),
    })

    const { org } = await sut.execute({
      email: 'email@example.com',
      password: '987654321',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('shoud not be able to authenticated with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'emailinvalid@example.com',
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
