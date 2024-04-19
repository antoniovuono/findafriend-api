import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { IncompleteInputError } from './errors/incomplete-input-error'

type UserTypeProps = 'ORGANIZATION' | 'NORMAL'

interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  userType?: UserTypeProps
  address?: string
  city?: string
  postalCode?: string
}

interface CreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    userType,
    address,
    city,
    postalCode,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const passwordHash = await hash(password, 8)

    const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if (emailAlreadyRegistered) {
      throw new UserAlreadyExistsError()
    }

    if (userType === 'ORGANIZATION' && (!address || !city || !postalCode)) {
      throw new IncompleteInputError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      whatsapp,
      user_type: userType,
      address,
      city,
      postal_code: postalCode,
    })

    return { user }
  }
}
