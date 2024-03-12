// Use-case
import SignUp from "@/core/use-cases/auth/signUp";

// Interfaces
import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

// Configs
import { sequelize } from "@/infrastructure/data-providers/sql/config/sequelize";
import { config as dotenvConfig } from "dotenv";

// Mock data
import { validNewUser } from "./mocks/mockData";

describe("Sign up", () => {
  let createUser: SignUp;
  let usersRepository: UsersRepository;
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
    passwordHasher = new BcryptPasswordHasher();

    createUser = new SignUp({
      usersRepository,
      passwordHasher,
    });

    // Recreating the table
    await sequelize.sync({ force: true });
  });

  it("should create a valid user", async () => {
    const result = await createUser.execute({ data: validNewUser });
    expect(result).toEqual(expect.objectContaining({
      ...validNewUser,
      id: expect.any(String),
      password: expect.any(String),
      token: expect.any(String),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    }));
  });

  it("should throw an error if the user is invalid", async () => {
    const invalidNewUser = {
      firstName: null,
      middleName: "Jose",
      lastName: "Lopez",
      email: "robert@hotmail.com",
      password: "abcd1234",
    }

    const createUserPromise = createUser.execute({ data: invalidNewUser });
    await expect(createUserPromise).rejects.toThrow("Invalid user data");
  });

  it("should throw an error if the email already exists", async () => {
    await usersRepository.createUser({ data: validNewUser });
    const createUserWithSameEmailPromise = createUser.execute({ data: validNewUser });
    await expect(createUserWithSameEmailPromise).rejects.toThrow("Existing user with same email");
  });
});