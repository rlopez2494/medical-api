// Use-case
import SignUp from "@/core/use-cases/auth/signUp";

// Interfaces
import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import DoctorsRepository from "@/core/interfaces/repositories/DoctorsRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import SqlDoctorsRepository from "@/infrastructure/data-providers/sql/SqlDoctorsRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

// Configs
import { sequelize } from "@/infrastructure/data-providers/sql/config/sequelize";
import { config as dotenvConfig } from "dotenv";

// Mock data
import { validNewUserRequestObject, invalidNewUserRequestObject, validNewDoctorUser } from "./mocks/mockData";

describe("Sign up", () => {
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
    passwordHasher = new BcryptPasswordHasher();
    doctorsRepository = new SqlDoctorsRepository();

    signUp = new SignUp({
      usersRepository,
      doctorsRepository,
      passwordHasher,
    });

    // Recreating the table
    await sequelize.sync({ force: true });
  });

  it("should create a valid user", async () => {

    const result = await signUp.execute({ data: validNewUserRequestObject });
    expect(result).toEqual(expect.objectContaining({
      ...validNewUserRequestObject,
      id: expect.any(String),
      password: expect.any(String),
      token: expect.any(String),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
      doctorData: expect.objectContaining({
        ...validNewDoctorUser,
        id: expect.any(String),
        userId: expect.any(String),
        updatedAt: expect.any(Date),
        createdAt: expect.any(Date),
      }),
    }));
  });

  it("should throw an error if the user is invalid (a user with the doctor role at this point)", async () => {
    const createUserPromise = signUp.execute({ data: invalidNewUserRequestObject });
    await expect(createUserPromise).rejects.toThrow("Invalid user data");
  });

  it("should throw an error if the doctor data is invalid", async () => {
    const invalidUserRequestObject = {
      ...validNewUserRequestObject,
      doctorData: {
        name: null,
        title: null,
        medicalLicenseNumber: null,
      },
    }

    const createUserPromise = signUp.execute({ data: invalidUserRequestObject });
    await expect(createUserPromise).rejects.toThrow("Invalid doctor data");
  });

  it("should throw an error if the email already exists", async () => {
    await usersRepository.createUser({ data: validNewUserRequestObject });
    const createUserWithSameEmailPromise = signUp.execute({ data: validNewUserRequestObject });
    await expect(createUserWithSameEmailPromise).rejects.toThrow("Existing user with same email");
  });
});