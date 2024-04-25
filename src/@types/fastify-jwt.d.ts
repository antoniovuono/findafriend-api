import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      userType: 'NORMAL' | 'ORGANIZATION'
    }
  }
}
