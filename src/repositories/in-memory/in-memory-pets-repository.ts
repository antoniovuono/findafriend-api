import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pet: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      surname: data.surname,
      color: data.color,
      city: data.city,
      age: data.age,
      description: data.description,
      user_id: data.user_id,
      created_at: new Date(),
    }

    this.pet.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pet.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = this.pet.filter((pet) => pet.city === city)

    return pets
  }

  async findManyByCharacteristics(
    age?: number | undefined,
    color?: string | undefined,
  ): Promise<Pet[]> {
    const pets = this.pet.filter(
      (pet) => pet.age === age || pet.color === color,
    )

    return pets
  }
}
