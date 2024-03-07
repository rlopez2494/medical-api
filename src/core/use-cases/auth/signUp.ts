

import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Entities and DTOs
import User from "@/core/entities/User";
import UserDTO from "@/core/data-transfer-objects/UserDTO";

export default class SignUp {
  private usersRepository: UsersRepository;
  private passwordHasher: PasswordHasher;

  constructor({ usersRepository, passwordHasher }) {
    this.usersRepository = usersRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ data }: { data: UserDTO }) {
    const user = new User(data);
    const isInvalid = user.validate();
    if (isInvalid) {
      throw new Error('Invalid user data');
    }

    const existingUserWithSameEmail = !!(await this.usersRepository.getUserByEmail({ email: user.email }));
    if (existingUserWithSameEmail) {
      throw new Error('Existing user with same email');
    }

    const hash = await this.passwordHasher.hash({ password: user.password });
    const savedUser = await this.usersRepository.createUser({ data: { ...user.getJSON(), password: hash } });
    return savedUser;
  }
}