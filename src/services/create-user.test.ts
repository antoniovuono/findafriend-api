import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserService } from './create-user'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { IncompleteInputError } from './errors/incomplete-input-error'

let usersRepository: InMemoryUsersRepository
let createUserService: CreateUserService

describe('Create User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserService = new CreateUserService(usersRepository)
  })

  it('should be able to create a normal user', async () => {
    const { user } = await createUserService.execute({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to create an organization user', async () => {
    const { user } = await createUserService.execute({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
      userType: 'ORGANIZATION',
      address: 'Rua Example',
      city: 'Example City',
      postalCode: '123456',
    })

    expect(user.user_type).toEqual('ORGANIZATION')
  })

  it('should password must be hashed', async () => {
    const { user } = await createUserService.execute({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    const isPasswordHashed = await compare('123456', user.password)

    expect(isPasswordHashed).toBeTruthy()
  })
  it('should not be able to create a user with an existing email', async () => {
    await createUserService.execute({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: '123456',
      whatsapp: '123456789',
    })

    await expect(async () => {
      await createUserService.execute({
        name: 'John Doe ',
        email: 'jhondoe@example.com',
        password: '123456',
        whatsapp: '123456789',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to create an organization user without address, city and postal code', async () => {
    await expect(async () => {
      await createUserService.execute({
        name: 'John Doe ',
        email: 'jhondoe@example.com',
        password: '123456',
        whatsapp: '123456789',
        userType: 'ORGANIZATION',
      })
    }).rejects.toBeInstanceOf(IncompleteInputError)
  })
})
