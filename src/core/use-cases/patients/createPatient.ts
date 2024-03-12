
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

    const alreadyExistingPatient = !!(await this.patientsRepository.getPatientByCitizenId({ citizenId: newPatient.citizenId }))
    if (alreadyExistingPatient) {
      throw new Error("A patient with the same citizenId already exists");
    }

    const savedPatient = await this.patientsRepository.createPatient({ data });
    return savedPatient;
  }
}