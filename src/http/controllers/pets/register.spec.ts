import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createOrgAndAuthenticate } from '@/utils/test/create-org-and-authenticate'

describe('Register a Pet E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to register a pet', async () => {
    const { token } = await createOrgAndAuthenticate(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})
