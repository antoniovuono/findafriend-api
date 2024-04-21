import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetByCharacteristicsService } from './fetch-pet-by-characteristics'
import { ParamNotInformedError } from './errors/param-not-informed'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let fetchPetByCharacteristics: FetchPetByCharacteristicsService

describe('Fetch Pet By Characteristics Service', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    fetchPetByCharacteristics = new FetchPetByCharacteristicsService(
      petsRepository,
    )
  })

  it('should be able to fetch pets by color and age', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    await petsRepository.create({
      surname: 'Spike',
      color: 'White',
      city: 'New York',
      age: 10,
      description: 'A very cute dog',
      user_id: userId,
    })

    for (let i = 0; i <= 2; i++) {
      await petsRepository.create({
        surname: `Rex ${i}`,
        color: 'Black',
        city: 'New York',
        age: 3,
        description: 'A very cute dog',
        user_id: userId,
      })
    }

    const { pets } = await fetchPetByCharacteristics.execute({
      age: 3,
      color: 'Black',
    })

    expect(pets).toHaveLength(3)
  })

  it('should be able to fetch pets by age', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    await petsRepository.create({
      surname: 'Spike',
      color: 'White',
      city: 'New York',
      age: 10,
      description: 'A very cute dog',
      user_id: userId,
    })

    for (let i = 0; i <= 2; i++) {
      await petsRepository.create({
        surname: 'Rex',
        color: 'Black',
        city: 'New York',
        age: 3,
        description: 'A very cute dog',
        user_id: userId,
      })
    }

    const { pets } = await fetchPetByCharacteristics.execute({
      age: 3,
    })

    expect(pets).toHaveLength(3)
  })

  it('should be able to fetch pets by color', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    await petsRepository.create({
      surname: 'Spike',
      color: 'White',
      city: 'New York',
      age: 3,
      description: 'A very cute dog',
      user_id: userId,
    })

    for (let i = 0; i <= 2; i++) {
      await petsRepository.create({
        surname: 'Rex',
        color: 'Black',
        city: 'New York',
        age: 3,
        description: 'A very cute dog',
        user_id: userId,
      })
    }

    const { pets } = await fetchPetByCharacteristics.execute({
      color: 'Black',
    })

    expect(pets).toHaveLength(3)
  })

  it('should not able able to fetch if any param are informed', async () => {
    await expect(async () => {
      await fetchPetByCharacteristics.execute({
        color: '',
        age: undefined,
      })
    }).rejects.toBeInstanceOf(ParamNotInformedError)
  })
})
