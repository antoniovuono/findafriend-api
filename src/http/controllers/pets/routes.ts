import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { verifyUserType } from '@/http/middlewares/verify-user-type'
import { listByCity } from './list-by-city'
import { findUnique } from './find-unique'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', { onRequest: [verifyUserType('ORGANIZATION')] }, create)

  app.get('/pets/:city', listByCity)
  app.get('/pets/search/:id', findUnique)
}
