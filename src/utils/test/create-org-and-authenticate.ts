import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createOrgAndAuthenticate(
  app: FastifyInstance,
  city = 'Curitiba',
) {
  await request(app.server).post('/orgs').send({
    name: 'Seu Cãopanheiro',
    email: 'gabe@example.com',
    zipCode: '87654321',
    address: 'Rua do meio',
    city,
    phone: '41 98989898',
    password: '987654321',
  })

  const responseAuth = await request(app.server).post('/sessions').send({
    email: 'gabe@example.com',
    password: '987654321',
  })

  const { token } = responseAuth.body

  return { token }
}
