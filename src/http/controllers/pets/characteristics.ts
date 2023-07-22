import { makeFetchPetsByTheirCharacterisctUseCase } from '@/use-cases/factories/make-fetch-pets-by-their-characteristics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function characteristics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const characteristicsBodySchema = z.object({
    age: z.enum(['Puppy', 'Young', 'Adult']),
    size: z.enum(['Tiny', 'Medium', 'Large']),
    energyLevel: z.number().min(1).max(5),
    dependencyLevel: z.enum(['Medium', 'Low', 'High']),
  })

  const { age, size, energyLevel, dependencyLevel } =
    characteristicsBodySchema.parse(request.body)

  const fetchPetsByTheirCharacteristicsUseCase =
    makeFetchPetsByTheirCharacterisctUseCase()

  const { pets } = await fetchPetsByTheirCharacteristicsUseCase.execute({
    age,
    size,
    energyLevel,
    dependencyLevel,
  })

  return reply.status(200).send({ pets })
}
