import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function city(request: FastifyRequest, reply: FastifyReply) {
  const cityParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = cityParamsSchema.parse(request.params)

  const fetchPetsBycityUseCase = makeFetchPetsByCityUseCase()
  const { pets } = await fetchPetsBycityUseCase.execute({ city })

  return reply.status(200).send({ pets })
}
