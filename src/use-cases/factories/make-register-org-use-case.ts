import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)

  return registerOrgUseCase
}
