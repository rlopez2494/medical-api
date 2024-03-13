import DoctorDTO from "@/core/data-transfer-objects/DoctorDTO"

export default interface DoctorsRepository {
  createDoctor({ data }: { data: DoctorDTO }): Promise<DoctorDTO>
}