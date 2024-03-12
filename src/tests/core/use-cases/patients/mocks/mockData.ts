import PatientDTO from "@/core/data-transfer-objects/PatientDTO";
export const validPatientData: PatientDTO = {
  phoneNumber: "+50412345678",
  citizenId: "0801199801234",
  firstName: "John",
  middleName: null,
  lastName: "Doe",
  birthDate: "04/05/1998",
  gender: "Male",
  height: 1800,
  weight: 230,
  // otherDisabilities: ["Blindness"], //till internet comes back
  bloodType: "A+",
  emergencyContact: "+504127584938",
  // hereditaryConditions: ["Cancer", "Diabetes"] //till internet comes back
};