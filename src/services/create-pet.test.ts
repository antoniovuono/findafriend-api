import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetService } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let petRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let createPetService: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    createPetService = new CreatePetService(petRepository, usersRepository)
  })

  it('should be able to create a new pet', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    const { pet } = await createPetService.execute({
      surname: 'Rex',
      color: 'Black',
      city: 'New York',
      age: 3,
      description: 'A very cute dog',
      userId: id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it("should not be able to create a new pet if the user doesn't exist", async () => {
    await expect(async () => {
      await createPetService.execute({
        surname: 'Rex',
        color: 'Black',
        city: 'New York',
        age: 3,
        description: 'A very cute dog',
        userId: '123',
      })
    }).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
