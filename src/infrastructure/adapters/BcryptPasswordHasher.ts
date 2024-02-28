import PasswordHasher from '@/core/interfaces/adapters/PasswordHasher'
import bcrypt from 'bcrypt'

export default class BcryptPasswordHasher implements PasswordHasher {
  async hash({ password }: { password: string }) {
    return bcrypt.hash(password, 10)
  }

  async compare({ password, hash }: { password: string, hash: string }) {
    return bcrypt.compare(password, hash)
  }
}