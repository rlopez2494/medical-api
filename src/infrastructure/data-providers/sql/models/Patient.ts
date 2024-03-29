import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

const Patient = db.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  bloodType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  emergencyContact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {});

export default Patient;
