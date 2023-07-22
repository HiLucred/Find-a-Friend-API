import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeAuthenticateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateOrgUseCase(orgRepository)

  return authenticateUseCase
}
