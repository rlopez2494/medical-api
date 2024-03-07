import UsersRepository from "@/core/interfaces/repositories/UsersRepository"
import UserDTO from "@/core/data-transfer-objects/UserDTO"

// Sequelize Model
import UserModel from "@/infrastructure/data-providers/sql/models/User";
import { v4 as uuidv4 } from 'uuid';

export default class SqlUsersRepository implements UsersRepository {
  async createUser({ data }: { data: UserDTO }) {
    try {
      const savedUser = await UserModel.create({ ...data, id: uuidv4() });
      return savedUser.toJSON();
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getUserByEmail({ email }: { email: string }) {
    try {
      const user = await UserModel.findOne({ where: { email } });
      return user ? user.toJSON() : null;
    } catch (error) {
      throw new Error(error.message)
    }
  }
}