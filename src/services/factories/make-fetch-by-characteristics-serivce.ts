import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByCharacteristicsService } from '../fetch-pet-by-characteristics'

export function makeFetchByCharacteristicsService() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetByCharacteristicsService = new FetchPetByCharacteristicsService(
    petsRepository,
  )

  return fetchPetByCharacteristicsService
}
