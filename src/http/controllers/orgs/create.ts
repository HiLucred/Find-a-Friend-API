import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    zipCode: z.string(),
    address: z.string(),
    city: z.string(),
    phone: z.string().min(8),
    password: z.string().min(6),
  })

  const { name, email, zipCode, address, city, phone, password } =
    createOrgBodySchema.parse(request.body)

  const cityLowerCase = city.toLowerCase()

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()
    await registerOrgUseCase.execute({
      name,
      email,
      zipCode,
      address,
      city: cityLowerCase,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: 'E-mail already exists.' })
    }
    return reply.status(500).send({ message: err })
  }

  return reply.status(201).send()
}
