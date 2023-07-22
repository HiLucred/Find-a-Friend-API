import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '../repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let inMemoryOrgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(inMemoryOrgsRepository)
  })

  it('shoud be able to register a org', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zipCode: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password: '987654321',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('shoud hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      email: 'email@example.com',
      zipCode: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password: '987654321',
    })

    const isPasswordHashed = await compare('987654321', org.password_hash)

    expect(isPasswordHashed).toBe(true)
  })

  it('shoud not be able to register with same email twice', async () => {
    const sameEmail = 'email@example.com'

    await sut.execute({
      name: 'Seu Cãopanheiro',
      email: sameEmail,
      zipCode: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password: '987654321',
    })

    await expect(() =>
      sut.execute({
        name: 'Seu Cãopanheiro',
        email: sameEmail,
        zipCode: '87654321',
        address: 'Rua do meio',
        city: 'Curitiba',
        phone: '41 98989898',
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
