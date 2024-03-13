// Use-case
import LogIn from "@/core/use-cases/auth/logIn";
import SignUp from "@/core/use-cases/auth/signUp";

// Interfaces
import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import DoctorsRepository from "@/core/interfaces/repositories/DoctorsRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import SqlDoctorsRepository from "@/infrastructure/data-providers/sql/SqlDoctorsRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

import { sequelize } from "@/infrastructure/data-providers/sql/config/sequelize";
import { config as dotenvConfig } from "dotenv";

// Mock data (Creating a user prior to testing the login)
import { validNewUser, validNewUserRequestObject } from "./mocks/mockData";

describe("Log In", () => {
  let logIn: LogIn;
  let signUp: SignUp;
  let usersRepository: UsersRepository;
  let doctorsRepository: DoctorsRepository;
  let passwordHasher: PasswordHasher;

  beforeAll(async () => {
    dotenvConfig();
    await sequelize.authenticate();
  });

  afterAll(async () => {
    await sequelize.close();
  })

  beforeEach(async () => {
    usersRepository = new SqlUsersRepository();
    doctorsRepository = new SqlDoctorsRepository();
    passwordHasher = new BcryptPasswordHasher();

    // For the creation of a user throgh the signUp use-case first
    signUp = new SignUp({
      usersRepository,
      doctorsRepository,
      passwordHasher,
    });

    logIn = new LogIn({
      usersRepository,
      passwordHasher,
    });

    // Recreating the table
    await sequelize.sync({ force: true });
  });

  it("should log in a valid user", async () => {
    // Creating a user
    await signUp.execute({ data: validNewUserRequestObject });

    const result = await logIn.execute({
      email: validNewUser.email,
      password: validNewUser.password,
    });

    expect(result).toEqual(expect.objectContaining({
      ...validNewUser,
      id: expect.any(String),
      password: expect.any(String),
      token: expect.any(String),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    }));
  });

  it("should throw an error if the input data is invalid", async () => {
    const nonexistentUser = {
      email: validNewUser.email,
      password: null
    };

    const loginResult = logIn.execute(nonexistentUser);
    await expect(loginResult).rejects.toThrow("Invalid email or password");
  });

  it("should throw an error if the user does not exist", async () => {
    const nonexistentUser = {
      email: "nonExistent@testing.com",
      password: "somePassword"
    };

    const loginResult = logIn.execute(nonexistentUser);
    await expect(loginResult).rejects.toThrow("User not found");
  });
})
