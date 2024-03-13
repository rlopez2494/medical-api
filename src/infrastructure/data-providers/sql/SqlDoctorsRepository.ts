import DoctorsRepository from "@/core/interfaces/repositories/DoctorsRepository";
import DoctorModel from "@/infrastructure/data-providers/sql/models/Doctor";
import { v4 as uuidv4 } from 'uuid';

export default class SqlDoctorsRepository implements DoctorsRepository {
  async createDoctor({ data }) {
    try {
      const savedDoctor = await DoctorModel.create({ ...data, id: uuidv4() });
      return savedDoctor.toJSON();
    } catch (error) {
      throw new Error(error.message)
    }
  }
}