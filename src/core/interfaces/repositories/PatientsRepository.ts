import PatientDTO from "@/core/data-transfer-objects/PatientDTO";

export default interface PatientsRepository {
  createPatient({ data }: { data: PatientDTO }): Promise<PatientDTO>;
  getPatientByCitizenId({ citizenId }: { citizenId: string }): Promise<PatientDTO | null>;
}