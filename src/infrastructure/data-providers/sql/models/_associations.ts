import User from "@/infrastructure/data-providers/sql/models/User";
import Doctor from "@/infrastructure/data-providers/sql/models/Doctor";
import Patient from "@/infrastructure/data-providers/sql/models/Patient";
import Appointment from "@/infrastructure/data-providers/sql/models/Appointment";
import BlockedOutPeriod from "@/infrastructure/data-providers/sql/models/BlockedOutPeriod";
import RecurringAvailability from "@/infrastructure/data-providers/sql/models/RecurringAvailability";
import MedicalRecord from "@/infrastructure/data-providers/sql/models/MedicalRecord";

// User - Doctor
User.hasOne(Doctor, { foreignKey: 'userId' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

// User - Patient
User.hasOne(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

// Patient - Doctor
Patient.belongsToMany(Doctor, { through: 'PatientDoctor' });
Doctor.belongsToMany(Patient, { through: 'PatientDoctor' });

// Doctor - Appointment 
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Patient - Appointment
Patient.hasMany(Appointment, { foreignKey: 'patientId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

// Doctor - BlockedOutPeriod
Doctor.hasMany(BlockedOutPeriod, { foreignKey: 'doctorId' });
BlockedOutPeriod.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Doctor - RecurringAvailability
Doctor.hasMany(RecurringAvailability, { foreignKey: 'doctorId' });
RecurringAvailability.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Patient - MedicalRecord
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId' });
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId' });

// Doctor - MedicalRecord
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId' });