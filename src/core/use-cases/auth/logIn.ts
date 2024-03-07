import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

export default class LogIn {
  private usersRepository: UsersRepository;
  private passwordHasher: PasswordHasher;

  constructor({ usersRepository, passwordHasher }) {
    this.usersRepository = usersRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ email, password }) {

    if (!email || !password) {
      throw new Error("Invalid email or password");
    }

    const user = await this.usersRepository.getUserByEmail({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await this.passwordHasher.compare({
      password,
      hash: user.password,
    });
    console.log("Is password valid? : ", isPasswordValid, "Password: ", password, "Hash: ", user.password)

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}