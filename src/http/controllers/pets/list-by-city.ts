import { ParamNotInformedError } from '@/services/errors/param-not-informed'
import { makeFetchPetsByCityService } from '@/services/factories/make-fetch-pets-by-city-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listByCity(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listByCityParamsSchema = z.object({
      city: z.string().min(1),
    })

    const { city } = listByCityParamsSchema.parse(request.params)

    console.log('city', city)

    const fetchPetsByCity = makeFetchPetsByCityService()

    const { pets } = await fetchPetsByCity.execute({
      city,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ParamNotInformedError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
