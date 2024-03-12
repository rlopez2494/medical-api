import validate from "validate.js";

export default class Patient {
  id?: string;
  citizenId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  height: number;
  weight: number;
  otherDisabilities: string[];
  bloodType: string;
  emergencyContact: string;
  hereditaryConditions: string[];

  // Database fields
  updatedAt?: string;
  createdAt?: string;

  constructor({
    id = null,
    citizenId = null,
    firstName = null,
    middleName = null,
    lastName = null,
    phoneNumber = null,
    birthDate = null,
    gender = null,
    height = null,
    weight = null,
    otherDisabilities = null,
    bloodType = null,
    emergencyContact = null,
    hereditaryConditions = null,
    updatedAt = null,
    createdAt = null,
  }) {
    this.id = id;
    this.citizenId = citizenId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.birthDate = birthDate;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.otherDisabilities = otherDisabilities;
    this.bloodType = bloodType;
    this.emergencyContact = emergencyContact;
    this.hereditaryConditions = hereditaryConditions;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  validate() {
    const presenceTrue = {
      presence: true,
    };

    // 
    const constraints = {
      // User Related Data
      firstName: presenceTrue,
      lastName: presenceTrue,
      phoneNumber: presenceTrue,

      // Patient Related Data
      citizenId: presenceTrue,
      birthDate: presenceTrue,
      gender: presenceTrue,
    };

    return validate(this, constraints);
  }

  getJSON() {
    return {
      id: this.id,
      citizenId: this.citizenId,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      gender: this.gender,
      height: this.height,
      weight: this.weight,
      otherDisabilities: this.otherDisabilities,
      bloodType: this.bloodType,
      emergencyContact: this.emergencyContact,
      hereditaryConditions: this.hereditaryConditions,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}