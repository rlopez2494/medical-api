import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

const RecurringAvailability = db.define('RecurringAvailability', {
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  dayOfWeek: {
    type: DataTypes.INTEGER, // 0 = Sunday, 1 = Monday, etc.
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME, // Could also be STRING if you prefer, but TIME is more semantically correct
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME, // Same as above
    allowNull: false,
  },
  // Additional fields for exceptions, customizations, etc.
}, {});

export default RecurringAvailability;
