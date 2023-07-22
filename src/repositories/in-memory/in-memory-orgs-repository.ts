import { OrgsRepository } from '../orgs-repository'
import { Prisma, Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id)

    if (!org) return null

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email)

    if (!org) return null

    return org
  }

  async findManyByCity(city: string) {
    const orgs = this.items.filter((org) => org.city === city)

    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: 'ADMIN',
      zip_code: data.zip_code,
      address: data.address,
      city: data.city,
      phone: data.phone,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
