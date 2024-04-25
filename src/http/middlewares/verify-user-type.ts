import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserType(verifyUser: 'NORMAL' | 'ORGANIZATION') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { userType } = request.user

    console.log(userType)

    if (userType !== verifyUser) {
      return reply
        .status(401)
        .send({ message: 'You do not have permission to perform this action' })
    }
  }
}
