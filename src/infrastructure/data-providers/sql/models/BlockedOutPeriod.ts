import { DataTypes } from "sequelize";
import { sequelize as db } from "@/infrastructure/data-providers/sql/config/sequelize";

const BlockedOutPeriod = db.define('BlockedOutPeriod', {
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  // Additional fields for reasons, types of unavailability, etc.
}, {});

export default BlockedOutPeriod;
