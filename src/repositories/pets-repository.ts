import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  findManyByCharacteristics(age?: number, color?: string): Promise<Pet[]>
}
