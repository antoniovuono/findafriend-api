import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  surname: string
  color: string
  city: string
  age: number
  description: string
  userId: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    surname,
    color,
    city,
    age,
    description,
    userId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petRepository.create({
      surname,
      color,
      city,
      age,
      description,
      user_id: userId,
    })

    return { pet }
  }
}
