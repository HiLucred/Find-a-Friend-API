import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyUserRole } from '@/middlewares/verify-user-role'
import { verifyJwt } from '@/middlewares/verify-jwt'
import { details } from './details'
import { characteristics } from './characteristics'
import { city } from './city'

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets/register',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    register,
  )
  app.get('/pets/:petId', details)
  app.post('/pets/characteristics', characteristics)
  app.get('/pets/city/:city', city)
}
