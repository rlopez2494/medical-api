import UsersRepository from "@/core/interfaces/repositories/UsersRepository"
import UserDTO from "@/core/interfaces/data-transfer-objects/UserDTO"

export default class SqlUsersRepository implements UsersRepository {
  async createUser({ data }: { data: UserDTO }) {
    return Promise.resolve({ ...data, id: '123'})
  }
  async getUserByEmail({ email }: { email: string }) {
    return Promise.resolve(null)
  }
}