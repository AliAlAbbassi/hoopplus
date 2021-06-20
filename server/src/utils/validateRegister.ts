import { HumanInput } from 'src/resolvers/HumanInput'

export const validateRegister = (options: HumanInput) => {
  if (options.username!.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2',
      },
    ]
  }

  if (options.username!.includes('@')) {
    return [
      {
        field: 'username',
        message: 'cannot include an @',
      },
    ]
  }

  if (options.bio)
    if (options.bio.length > 40) {
      return [
        {
          field: 'bio',
          message: 'length must not be greater than 40 letters',
        },
      ]
    }

  return null
}
