export default interface PatientDTO {
  id?: string;
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