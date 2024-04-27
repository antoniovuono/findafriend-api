import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserService } from '../create-user'

export function makeCreateUserService() {
  const usersRepository = new PrismaUsersRepository()
  const createUserService = new CreateUserService(usersRepository)

  return createUserService
}
