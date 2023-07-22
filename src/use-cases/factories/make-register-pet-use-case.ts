import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petRepository = new PrismaPetsRepository()
  const orgRepository = new PrismaOrgsRepository()

  const registerPetUseCase = new RegisterPetUseCase(
    petRepository,
    orgRepository,
  )

  return registerPetUseCase
}
