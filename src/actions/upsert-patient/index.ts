import { db } from "@/db";
import { patients } from "@/db/schema/patients";
import { insertPatientSchema } from "@/db/schema/patients";
import { action } from "@/lib/safe-action";
import { eq } from "drizzle-orm";

export const upsertPatient = action(insertPatientSchema, async (data) => {
  try {
    if (data.id) {
      const [patient] = await db
        .update(patients)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(patients.id, data.id))
        .returning();

      return { success: true, data: patient };
    }

    const [patient] = await db.insert(patients).values(data).returning();

    return { success: true, data: patient };
  } catch (error) {
    return { success: false, error: "Erro ao salvar paciente" };
  }
});
