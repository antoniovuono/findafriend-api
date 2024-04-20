import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface FetchPetServiceRequest {
  id: string
}

interface FetchPetServiceResponse {
  pet: Pet
}

export class FetchPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FetchPetServiceRequest): Promise<FetchPetServiceResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFound()
    }

    return { pet }
  }
}
