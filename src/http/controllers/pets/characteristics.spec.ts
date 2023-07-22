import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createOrgAndAuthenticate } from '@/utils/test/create-org-and-authenticate'

describe('Get Pet Details E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to search pets by their characteristics', async () => {
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

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Belinha',
        about: null,
        age: 'Adult',
        size: 'Medium',
        energyLevel: 5,
        dependencyLevel: 'Medium',
        photos: [],
        requirements: [],
      })

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

    const response = await request(app.server)
      .post('/pets/characteristics')
      .send({
        age: 'Puppy',
        size: 'Tiny',
        energyLevel: 3,
        dependencyLevel: 'Medium',
      })

    expect(response.statusCode).toEqual(200)
    // expect(response.body).toEqual({
    //   pets: [
    //     expect.objectContaining({ id: expect.any(String) }),
    //     expect.objectContaining({ id: expect.any(String) }),
    //   ],
    // })
  })
})
