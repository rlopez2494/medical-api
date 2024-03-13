export const validNewUser = {
  id: null,
  firstName: "Robert",
  middleName: "Jose",
  lastName: "Lopez",
  phoneNumber: null,
  birthDate: null,
  citizenId: null,
  email: "robert@hotmail.com",
  password: "abcd1234",
  gender: "Male",

  updatedAt: null,
  createdAt: null,
  token: null,
}

export const validNewDoctorUser = {
  name: "Dr. Robert Lopez",
  title: "General Doctor",
  medicalLicenseNumber: "123456",
};


export const validNewUserRequestObject = {
  ...validNewUser,
  doctorData: validNewDoctorUser,
}

export const invalidNewUserRequestObject = {
  ...validNewUser,
  email: null,
  doctorData: validNewDoctorUser,
}