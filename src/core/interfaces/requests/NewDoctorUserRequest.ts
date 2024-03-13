import UserDTO from "@/core/data-transfer-objects/UserDTO";
interface INewUserDoctor {
  name: string;
  title: string;
  medicalLicenseNumber: string;
}

export default interface NewDoctorUserRequest extends UserDTO {
  doctorData: INewUserDoctor;
}