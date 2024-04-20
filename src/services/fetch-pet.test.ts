import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetService } from './fetch-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFound } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let fetchPetService: FetchPetService

describe('Fetch Pet', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    fetchPetService = new FetchPetService(petsRepository)
  })

  it('should be able to fetch a pet', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    const { id } = await petsRepository.create({
      surname: 'Rex',
      color: 'Black',
      city: 'New York',
      age: 3,
      description: 'A very cute dog',
      user_id: userId,
    })

    const { pet } = await fetchPetService.execute({
      id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
  it.todo('should not be able to fetch a pet that does not exist', async () => {
    await expect(async () => {
      await fetchPetService.execute({
        id: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
