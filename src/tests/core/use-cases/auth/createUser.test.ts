// Use-case
import CreateUser from "@/core/use-cases/auth/createUser";

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
const validNewUser = {
  id: null,
  firstName: "Robert",
  middleName: "Jose",
  lastName: "Lopez",
  email: "robert@hotmail.com",
  password: "abcd1234",

  updatedAt: null,
  createdAt: null,
  token: null,
}

describe("Create User", () => {
  let createUser: CreateUser;
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

    createUser = new CreateUser({
      usersRepository,
      passwordHasher,
    });

    // Recreating the table
    sequelize.sync({ force: true }).then(() => done());
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