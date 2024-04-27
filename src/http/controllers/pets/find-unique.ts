import { ResourceNotFound } from '@/services/errors/resource-not-found-error'
import { makeFetchPetService } from '@/services/factories/make-fetch-pet-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findUnique(request: FastifyRequest, reply: FastifyReply) {
  try {
    const findUniqueParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = findUniqueParamsSchema.parse(request.params)

    const fetchPetService = makeFetchPetService()

    const { pet } = await fetchPetService.execute({ id })

    return reply.status(200).send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
