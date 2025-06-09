import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  gender: text("gender").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPatientSchema = createInsertSchema(patients, {
  email: z.string().email(),
  gender: z.enum(["Masculino", "Feminino"]),
});

export const selectPatientSchema = createSelectSchema(patients);

export type Patient = z.infer<typeof selectPatientSchema>;
export type NewPatient = z.infer<typeof insertPatientSchema>;
