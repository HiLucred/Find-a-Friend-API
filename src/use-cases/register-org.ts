import { hash } from 'bcryptjs'
import { OrgsRepository } from '../repositories/orgs-repository'
import { Org } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  zipCode: string
  address: string
  city: string
  phone: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    zipCode,
    address,
    city,
    phone,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      email,
      password_hash,
      address,
      city,
      zip_code: zipCode,
      phone,
    })

    return { org }
  }
}
