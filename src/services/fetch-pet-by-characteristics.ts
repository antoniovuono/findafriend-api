import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ParamNotInformedError } from './errors/param-not-informed'

interface FetchPetByCharacteristicsServiceRequest {
  age?: number
  color?: string
}

interface FetchPetByCharacteristicsServiceResponse {
  pets: Pet[]
}

export class FetchPetByCharacteristicsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    color,
  }: FetchPetByCharacteristicsServiceRequest): Promise<FetchPetByCharacteristicsServiceResponse> {
    if (!age && !color) throw new ParamNotInformedError()

    const pets = await this.petsRepository.findManyByCharacteristics(age, color)

    return { pets }
  }
}
