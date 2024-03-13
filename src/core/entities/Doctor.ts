import validate from "validate.js";

export default class Doctor {
  id?: string;
  name: string;
  title: string;
  medicalLicenseNumber: string;
  userId: string;

  // Database fields
  updatedAt?: string;
  createdAt?: string;

  constructor({
    id = null,
    name = null,
    title = null,
    medicalLicenseNumber = null,
    userId = null,
    updatedAt = null,
    createdAt = null,
  }) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.medicalLicenseNumber = medicalLicenseNumber;
    this.userId = userId;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }

  validate({ skip = [] }) {
    const presenceTrue = {
      presence: true,
    };

    // 
    const constraints = {
      // No validations at this point
      name: presenceTrue,
      title: presenceTrue,
      medicalLicenseNumber: presenceTrue,
      userId: skip.includes('userId') ? {} : presenceTrue
    };

    return validate(this, constraints);
  }

  getJSON() {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      medicalLicenseNumber: this.medicalLicenseNumber,
      userId: this.userId,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
  }
}