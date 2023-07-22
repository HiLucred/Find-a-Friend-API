import { app } from '@/app'
import { createOrgAndAuthenticate } from '@/utils/test/create-org-and-authenticate'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Search Pets In The City (E2E)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('shoud be able to search pets in the city', async () => {
    const { token } = await createOrgAndAuthenticate(app, 'Florianópolis')

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

    const { city } = await prisma.org.create({
      data: {
        name: 'SOS Pet',
        address: 'Rua Isabel',
        city: 'São Paulo',
        email: 'sospet@email.com',
        password_hash: await hash('12345678', 6),
        phone: '8181818181',
        zip_code: '81818181',
      },
    })

    const responseAuth = await request(app.server).post('/sessions').send({
      email: 'sospet@email.com',
      password: '12345678',
    })

    const { token: tokenTwo } = await responseAuth.body

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${tokenTwo}`)
      .send({
        name: 'Bob',
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
      .set('Authorization', `Bearer ${tokenTwo}`)
      .send({
        name: 'Belinha',
        about: null,
        age: 'Puppy',
        size: 'Tiny',
        energyLevel: 3,
        dependencyLevel: 'Medium',
        photos: [],
        requirements: [],
      })

    const petsInTheCity = await request(app.server).get(`/pets/city/${city}`)

    expect(petsInTheCity.body).toEqual({
      pets: [
        expect.objectContaining({ id: expect.any(String) }),
        expect.objectContaining({ id: expect.any(String) }),
      ],
    })
  })
})
