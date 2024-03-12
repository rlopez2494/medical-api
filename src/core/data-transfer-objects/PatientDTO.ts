export default interface PatientDTO {
  id?: string;
  citizenId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other";
  height: number;
  weight: number;
  // otherDisabilities: string[];
  bloodType: string;
  emergencyContact: string;
  // hereditaryConditions: string[];

  // Database fields
  updatedAt?: string;
  createdAt?: string;
}