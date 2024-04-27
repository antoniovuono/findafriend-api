import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityService } from '../fetch-pets-by-city'

export function makeFetchPetsByCityService() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCityService = new FetchPetsByCityService(petsRepository)

  return fetchPetsByCityService
}
