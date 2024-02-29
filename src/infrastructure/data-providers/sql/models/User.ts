import { DataTypes, Sequelize } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";
import { v4 as uuidv4 } from 'uuid';

// Had to use jwt here, because I couldn't use it in the use-case
// I'll get back to this once we can generate an id previously to the beforeCreate hook
import jwt from "jsonwebtoken";

const newUUID = () => uuidv4();
const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: newUUID(), // This is not working, I had to import and use uuid in the createUser use-case
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
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
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
