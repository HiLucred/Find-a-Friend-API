import { Age, Pet, Size, DependencyLevel } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'
import { OrgsRepository } from '../repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterUseCaseRequest {
  name: string
  about?: string | null
  age?: Age | null
  size?: Size | null
  energyLevel?: number | null
  dependencyLevel?: DependencyLevel | null
  photos?: string[]
  requirements?: string[]
  orgId: string
}

interface RegisterUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetsRepository,
    private orgRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    dependencyLevel,
    photos = [],
    requirements = [],
    orgId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const org = await this.orgRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      dependency_level: dependencyLevel,
      photos,
      requirements,
      org_id: orgId,
    })

    return { pet }
  }
}
