import validate from "validate.js";

export default class User {
  id?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;

  constructor({
    id = null,
    firstName = null,
    middleName = null,
    lastName = null,
    email = null,
    phoneNumber = null,
    password = null
  }) {
    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
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
    };
  }
}