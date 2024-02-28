// Use-case
import CreateUser from "@/core/use-cases/auth/createUser";

// Interfaces
import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Implementations
import SqlUsersRepository from "@/infrastructure/data-providers/sql/SqlUsersRepository";
import BcryptPasswordHasher from "@/infrastructure/adapters/BcryptPasswordHasher";

// Mocks
const validNewUser = {
  firstName: "Robert",
  middleName: "Jose",
  lastName: "Lopez",
  email: "robert@hotmail.com",
  password: "abcd1234",
}

describe("Create User", () => {
  let createUser: CreateUser;
  let usersRepository: UsersRepository;
  let passwordHasher: PasswordHasher;

  beforeEach(() => {
    usersRepository = new SqlUsersRepository();
    passwordHasher = new BcryptPasswordHasher();
    createUser = new CreateUser({
      usersRepository: new SqlUsersRepository(),
      passwordHasher: new BcryptPasswordHasher()
    });
  });

  it("should create a valid user", async () => {
    const result = await createUser.execute({ data: validNewUser });
    expect(result).toEqual(expect.objectContaining({
      ...validNewUser,
      id: expect.any(String),
      password: expect.any(String),
    }));
  });
  
  it.todo("should throw an error if the user is invalid");
  it.todo("should throw an error if the user already exists");
});