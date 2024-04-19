export class IncompleteInputError extends Error {
  constructor() {
    super('Required input fields are missing')
  }
}
