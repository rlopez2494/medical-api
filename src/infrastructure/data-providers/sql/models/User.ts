import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

// Had to use jwt here, because I couldn't use it in the use-case
// I'll get back to this once we can generate an id previously to the beforeCreate hook
import jwt from "jsonwebtoken";

const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  citizenId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {});

User.beforeCreate((user: any) => {
  user.token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
})

export default User;
