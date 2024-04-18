import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let authenticateService: AuthenticateService

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateService = new AuthenticateService(usersRepository)
  })

  it('should be able authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '123456789',
    })

    const { user } = await authenticateService.execute({
      email: 'jhondoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able authenticate if email is incorrect', async () => {
    await expect(async () => {
      await authenticateService.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able authenticate if password is incorrect', async () => {
    await usersRepository.create({
      name: 'John Doe ',
      email: 'jhondoe@example.com',
      password: await hash('123456', 6),
      whatsapp: '123456789',
    })

    await expect(async () => {
      await authenticateService.execute({
        email: 'jhondoe@example.com',
        password: 'wrong-password',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
