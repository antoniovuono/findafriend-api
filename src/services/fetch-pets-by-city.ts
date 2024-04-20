import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ParamNotInformedError } from './errors/param-not-informed'

interface FetchPetsByCitServiceRequest {
  city: string
}

interface FetchPetsByCityServiceResponse {
  pets: Pet[]
}

export class FetchPetsByCityService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchPetsByCitServiceRequest): Promise<FetchPetsByCityServiceResponse> {
    if (!city) throw new ParamNotInformedError()

    const pets = await this.petsRepository.findManyByCity(city)

    return { pets }
  }
}
