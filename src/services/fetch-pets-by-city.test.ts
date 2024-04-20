import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCityService } from './fetch-pets-by-city'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ParamNotInformedError } from './errors/param-not-informed'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let fetchPetsByCityService: FetchPetsByCityService

describe('Fetch Pets By City Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    fetchPetsByCityService = new FetchPetsByCityService(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    for (let i = 0; i <= 2; i++) {
      await petsRepository.create({
        surname: `Rex ${i}`,
        color: 'Black',
        city: 'New York',
        age: 3,
        description: 'A very cute dog',
        user_id: id,
      })
    }

    const { pets } = await fetchPetsByCityService.execute({
      city: 'New York',
    })

    expect(pets).toHaveLength(3)
    expect(pets[0].city).toEqual('New York')
  })
  it('should not be able to fetch pets if city is not provided', async () => {
    await expect(async () => {
      await fetchPetsByCityService.execute({
        city: '',
      })
    }).rejects.toBeInstanceOf(ParamNotInformedError)
  })
})
