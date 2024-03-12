import validate from "validate.js";

export default class Patient {
  id?: string;
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
      // No validations at this point
      weight: presenceTrue,
      height: presenceTrue,
      emergencyContact: presenceTrue,
    };

    return validate(this, constraints);
  }

  getJSON() {
    return {
      id: this.id,
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