import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create Org E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Seu Cãopanheiro',
      email: 'gabe@example.com',
      zipCode: '87654321',
      address: 'Rua do meio',
      city: 'Curitiba',
      phone: '41 98989898',
      password: '987654321',
    })

    expect(response.statusCode).toEqual(201)
  })
})
