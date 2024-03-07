// Use-cases
import SignUp from "@/core/use-cases/auth/signUp";
import LogIn from "@/core/use-cases/auth/logIn";

// Interfaces
import AuthController from "@/core/interfaces/controllers/AuthController";

// Interface implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

const dependencies = {
  signUpUseCase: new SignUp({
    usersRepository: new SqlUsersRepository(),
    passwordHasher: new BcryptPasswordHasher(),
  }),
  loginUseCase: new LogIn({
    usersRepository: new SqlUsersRepository(),
    passwordHasher: new BcryptPasswordHasher(),
  }),
}

export default new AuthController(dependencies);

