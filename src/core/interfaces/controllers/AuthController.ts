import UserDTO from "@/core/data-transfer-objects/UserDTO";
import SignUp from "@/core/use-cases/auth/signUp";
import LogIn from "@/core/use-cases/auth/logIn";

interface ControllerDependencies {
  signUpUseCase: SignUp;
  loginUseCase: LogIn;
}

export default class AuthController {
  private signUpUseCase: SignUp;
  private loginUseCase: LogIn;

  constructor({ signUpUseCase, loginUseCase }: ControllerDependencies) {
    this.signUpUseCase = signUpUseCase;
    this.loginUseCase = loginUseCase;
  }

  async signUp({ firstName, lastName, email, password }: { firstName: any; lastName: any; email: any; password: any; }): Promise<UserDTO> {
    return await this.signUpUseCase.execute({ data: { firstName, lastName, email, password } });
  }

  async logIn({ email, password }: { email: any; password: any; }): Promise<UserDTO> {
    return await this.loginUseCase.execute({ email, password });
  }
}