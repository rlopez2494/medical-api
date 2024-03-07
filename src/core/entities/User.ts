import validate from "validate.js";

export default class User {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;

  // Database fields
  updatedAt?: string;
  createdAt?: string;
  token?: string;

  constructor({
    id = null,
    firstName = null,
    middleName = null,
    lastName = null,
    email = null,
    phoneNumber = null,
    password = null,

    updatedAt = null,
    createdAt = null,
    token = null,
  }) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;

    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.token = token;
  }

  validate() {
    const presenceTrue = {
      presence: true,
    };

    // 
    const constraints = {
      firstName: presenceTrue,
      lastName: { ...presenceTrue },
      email: presenceTrue,
      password: presenceTrue,
    };

    return validate(this, constraints);
  }

  getJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
      token: this.token,
    };
  }
}