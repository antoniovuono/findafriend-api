import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetService } from '../fetch-pet'

export function makeFetchPetService() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetService = new FetchPetService(petsRepository)

  return fetchPetService
}
