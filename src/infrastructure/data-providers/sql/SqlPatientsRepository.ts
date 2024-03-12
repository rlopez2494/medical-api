import PatientsRepository from "@/core/interfaces/repositories/PatientsRepository";
import PatientDTO from "@/core/data-transfer-objects/PatientDTO";
import PatientModel from "@/infrastructure/data-providers/sql/models/Patient";
import { v4 as uuidv4 } from 'uuid';


export default class SqlPatientsRepository implements PatientsRepository {
  async createPatient({ data }: { data: PatientDTO }) {
    try {
      const savedUser = await PatientModel.create({ ...data, id: uuidv4() });
      return savedUser.toJSON();
    } catch (error) {
      throw new Error(error.message)
    }
  }
  async getPatientByCitizenId({ citizenId }) {
    try {
      const user = await PatientModel.findOne({ where: { citizenId } });
      return user ? user.toJSON() : null;
    } catch (error) {
      throw new Error(error.message)
    }

  }
}