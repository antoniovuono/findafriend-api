import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/@lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: { city },
    })

    return pets
  }

  findManyByCharacteristics(
    age?: number | undefined,
    color?: string | undefined,
  ): Promise<Pet[]> {
    const whereClause: Prisma.PetWhereInput = {}

    if (age !== undefined) whereClause.age = age
    if (color !== undefined) whereClause.color = color

    const pets = prisma.pet.findMany({
      where: whereClause,
    })

    return pets
  }
}
