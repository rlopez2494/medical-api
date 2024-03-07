// Use-case
import LogIn from "@/core/use-cases/auth/logIn";
import SignUp from "@/core/use-cases/auth/signUp";

// Interfaces
import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

import { sequelize } from "@/infrastructure/data-providers/sql/config/sequelize";
import { config as dotenvConfig } from "dotenv";

// Mock data (Creating a user prior to testing the login)
import { validNewUser } from "./mocks/mockData";

describe("Log In", () => {
  let logIn: LogIn;
  let signUp: SignUp;
  let usersRepository: UsersRepository;
  let passwordHasher: PasswordHasher;

  beforeAll((done) => {
    dotenvConfig();
    sequelize.authenticate()
      .then(() => done())
  });

  afterAll((done) => {
    sequelize.close()
      .then(() => done())
  })

  beforeEach((done) => {
    usersRepository = new SqlUsersRepository();
    passwordHasher = new BcryptPasswordHasher();

    // For the creation of a user throgh the signUp use-case first
    signUp = new SignUp({
      usersRepository,
      passwordHasher,
    });

    logIn = new LogIn({
      usersRepository,
      passwordHasher,
    });

    // Recreating the table
    sequelize.sync({ force: true }).then(() => done());
  });

  it("should log in a valid user", async () => {
    // Creating a user
    await signUp.execute({ data: validNewUser });

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
