import { describe, expect, it, beforeEach } from 'vitest'
import { CreatePetService } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let petRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let createPetService: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    createPetService = new CreatePetService(petRepository)
  })

  it('should be able to create a new pet', async () => {
    const { id } = await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    console.log(id)

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
})
