
import PatientsRepository from "@/core/interfaces/repositories/PatientsRepository";
import PatientDTO from "@/core/data-transfer-objects/PatientDTO";
import Patient from "@/core/entities/Patient";
export default class CreatePatient {
  private patientsRepository: PatientsRepository;

  constructor({ patientsRepository }) {
    this.patientsRepository = patientsRepository;
  }

  async execute({ data }: { data: PatientDTO }) {
    const newPatient = new Patient(data);
    const isInvalid = newPatient.validate();
    if (isInvalid) {
      throw new Error("Invalid patient data")
    }

    const savedPatient = await this.patientsRepository.createPatient({ data });
    return savedPatient;
  }
}