import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

const Doctor = db.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  medicalLicenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true
  }
}, {});

export default Doctor;
