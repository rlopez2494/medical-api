export default interface UserDTO {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
}