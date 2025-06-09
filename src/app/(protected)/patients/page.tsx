import { PageContainer } from "@/components/ui/page-container";
import { AddPatientButton } from "./_components/add-patient-button";

export default function PatientsPage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pacientes</h1>
        <AddPatientButton />
      </div>
    </PageContainer>
  );
}
