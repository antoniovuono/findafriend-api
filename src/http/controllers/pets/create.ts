import { ResourceNotFound } from '@/services/errors/resource-not-found-error'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createPetBodySchema = z.object({
      surname: z.string(),
      color: z.string(),
      city: z.string(),
      age: z.number(),
      description: z.string(),
    })

    const { surname, color, city, age, description } =
      createPetBodySchema.parse(request.body)

    const petService = makeCreatePetService()

    await petService.execute({
      surname,
      color,
      city,
      age,
      description,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
