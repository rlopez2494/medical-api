type HashMethodParameters = {
  password: string
}

type CompareMethodParameters = {
  password: string
  hash: string
}

export default interface PasswordHasher {
  hash({ password }: HashMethodParameters): Promise<string>
  compare({ password, hash }: CompareMethodParameters): Promise<boolean>
}