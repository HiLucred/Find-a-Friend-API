import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.enum(['Puppy', 'Young', 'Adult']).nullable(),
    size: z.enum(['Tiny', 'Medium', 'Large']).nullable(),
    energyLevel: z.number().nullable(),
    dependencyLevel: z.enum(['Medium', 'Low', 'High']).nullable(),
    photos: z.string().array().default([]),
    requirements: z.string().array().default([]),
  })

  try {
    const petBody = registerPetBodySchema.parse(request.body)

    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      ...petBody,
      orgId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(500).send()
    }
  }
}
