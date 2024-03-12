// Use-case
import CreatePatient from "@/core/use-cases/patients/createPatient";

// Interfaces
import PatientsRepository from "@/core/interfaces/repositories/PatientsRepository";

// Implementations
import SqlPatientsRepository from "@/infrastructure/data-providers/sql/SqlPatientsRepository";

// Configs
import { sequelize } from "@/infrastructure/data-providers/sql/config/sequelize";
import { config as dotenvConfig } from "dotenv";

// Mock data
import { validPatientData } from "./mocks/mockData";

describe("Create patient", () => {
  let createPatient: CreatePatient;
  let patientsRepository: PatientsRepository;

  beforeAll(async () => {
    dotenvConfig();
    await sequelize.authenticate()
  });

  afterAll(async () => {
    await sequelize.close();
  })

  beforeEach(async () => {
    patientsRepository = new SqlPatientsRepository();

    createPatient = new CreatePatient({
      patientsRepository,
    });

    try {
      await sequelize.sync({ force: true });
    } catch (error) {
      throw new Error(error.message)
    }
  })

  it("Creates a patient with valid data", async () => {
    const result = await createPatient.execute({ data: validPatientData });
    expect(result).toEqual(expect.objectContaining({
      ...validPatientData,
      id: expect.any(String),
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    }));
  })

  it("Throws an error if the data is invalid", async () => {
    const invalidData = { ...validPatientData, weight: null };
    await expect(createPatient.execute({ data: invalidData })).rejects.toThrow("Invalid patient data");
  });
})
