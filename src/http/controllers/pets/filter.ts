import { ParamNotInformedError } from '@/services/errors/param-not-informed'
import { makeFetchByCharacteristicsService } from '@/services/factories/make-fetch-by-characteristics-serivce'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function filterPets(request: FastifyRequest, reply: FastifyReply) {
  try {
    const filterQuerySchema = z.object({
      age: z
        .string()
        .transform((value) => {
          const numberValue = Number(value)
          if (isNaN(numberValue)) {
            throw new Error('Age must be a number')
          }
          return numberValue
        })
        .optional(),
      color: z.string().optional(),
    })

    const { age, color } = filterQuerySchema.parse(request.query)

    const fetchPetByCharacteristicsService = makeFetchByCharacteristicsService()

    const { pets } = await fetchPetByCharacteristicsService.execute({
      age,
      color,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    if (error instanceof ParamNotInformedError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
