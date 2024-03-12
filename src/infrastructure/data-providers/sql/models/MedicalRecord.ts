import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

const MedicalRecord = db.define('MedicalRecord', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
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
  notesAndObservations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diagnosis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  treatment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommendations: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Additional fields for prescriptions, lab results, etc.
}, {});

export default MedicalRecord