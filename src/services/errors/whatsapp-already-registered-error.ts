export class WhatsappAlreadyRegisteredError extends Error {
  constructor() {
    super('Whatsapp already registered')
  }
}
