import UserDTO from "@/core/data-transfer-objects/UserDTO";
export default interface UsersRepository {
  createUser({ data }: { data: UserDTO }): Promise<UserDTO>
  getUserByEmail({ email }: { email: string }): Promise<UserDTO | null>
}