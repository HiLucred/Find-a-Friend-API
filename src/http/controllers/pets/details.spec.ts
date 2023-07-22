import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createOrgAndAuthenticate } from '@/utils/test/create-org-and-authenticate'

describe('Get Pet Details E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get pet details', async () => {
    const { token } = await createOrgAndAuthenticate(app)

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Natal',
        about: null,
        age: 'Puppy',
        size: 'Tiny',
        energyLevel: 3,
        dependencyLevel: 'Medium',
        photos: [],
        requirements: [],
      })

    const { id: petId } = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server).get(`/pets/${petId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      details: expect.objectContaining({
        id: expect.any(String),
        name: 'Natal',
      }),
    })
  })
})
