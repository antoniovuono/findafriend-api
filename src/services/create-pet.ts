import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Pet } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

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
  constructor(
    private petRepository: PetsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    surname,
    color,
    city,
    age,
    description,
    userId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const doesUserExist = await this.usersRepository.findById(userId)

    if (!doesUserExist) {
      throw new UserNotFoundError()
    }

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
