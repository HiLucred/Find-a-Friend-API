import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = detailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()
  const { pet } = await getPetDetailsUseCase.execute({ petId })

  return reply.status(200).send({ details: pet })
}
