

import UsersRepository from "@/core/interfaces/repositories/UsersRepository";
import DoctorsRepository from "@/core/interfaces/repositories/DoctorsRepository";
import PasswordHasher from "@/core/interfaces/adapters/PasswordHasher";

// Entities and DTOs
import User from "@/core/entities/User";
import Doctor from "@/core/entities/Doctor";
import DoctorUserDTO from "@/core/interfaces/requests/NewDoctorUserRequest";

export default class SignUp {
  private usersRepository: UsersRepository;
  private doctorsRepository: DoctorsRepository;
  private passwordHasher: PasswordHasher;

  constructor({ usersRepository, passwordHasher, doctorsRepository }) {
    this.usersRepository = usersRepository;
    this.passwordHasher = passwordHasher;
    this.doctorsRepository = doctorsRepository;
  }

  async execute({ data }: { data: DoctorUserDTO }) {
    const { doctorData = {}, ...userData } = data;

    const user = new User(userData);
    const doctorInstance = new Doctor(doctorData);

    const userIsInvalid = user.validate();
    if (userIsInvalid) {
      throw new Error('Invalid user data');
    }

    const doctorIsInvalid = doctorInstance.validate({ skip: ["userId"] });
    if (doctorIsInvalid) {
      throw new Error('Invalid doctor data');
    }

    const existingUserWithSameEmail = !!(await this.usersRepository.getUserByEmail({ email: user.email }));
    if (existingUserWithSameEmail) {
      throw new Error('Existing user with same email');
    }

    const hash = await this.passwordHasher.hash({ password: user.password });

    const savedUser = await this.usersRepository.createUser({ data: { ...user.getJSON(), password: hash } });
    const savedDoctor = await this.doctorsRepository.createDoctor({ data: { ...doctorInstance.getJSON(), userId: savedUser.id } });

    return {
      ...savedUser,
      doctorData: savedDoctor,
    }
  }
}