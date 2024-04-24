import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateUserService } from '@/services/create-user'
import { IncompleteInputError } from '@/services/errors/incomplete-input-error'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string().min(11),
    userType: z.enum(['ORGANIZATION', 'NORMAL']).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    postalCode: z.string().min(11).optional(),
  })

  const {
    name,
    email,
    password,
    whatsapp,
    address,
    city,
    postalCode,
    userType,
  } = createUserBodySchema.parse(request.body)

  try {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    await createUserService.execute({
      name,
      email,
      password,
      whatsapp,
      userType,
      address,
      city,
      postalCode,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof IncompleteInputError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
