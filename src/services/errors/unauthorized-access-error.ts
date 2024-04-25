export class UnauthorizedAccessErrors extends Error {
  constructor() {
    super('Unauthorized access')
  }
}
