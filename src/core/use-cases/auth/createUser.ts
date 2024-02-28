

import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";
import User from "@/core/entities/User";
import UserDTO from "@/core/interfaces/data-transfer-objects/UserDTO";

interface CreateUserDependencies {
  usersRepository: UsersRepository;
  passwordHasher: PasswordHasher;
}

export default class CreateUser {
  private usersRepository: UsersRepository;
  private passwordHasher: PasswordHasher;

  constructor({ usersRepository, passwordHasher } : CreateUserDependencies) {
    this.usersRepository = usersRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ data }: { data: UserDTO }) {
    const user = new User(data);
    const isInvalid = user.validate();
    if (isInvalid) {
      throw new Error(isInvalid);
    }

    const exists = await this.usersRepository.getUserByEmail({ email: user.email });
    if (exists) {
      throw new Error('User already exists');
    }

    const hash = await this.passwordHasher.hash({ password: user.password });
    return this.usersRepository.createUser({ data: { ...user.getJSON(), password: hash } });
  }
}