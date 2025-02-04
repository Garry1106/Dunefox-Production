import StepForm from "@/components/forms/whatsapp/StepForm";
import { FormProvider } from "@/context/whatsapp/FormContext";


export default function WhatsappForm() {
  return (
    <FormProvider>
      <StepForm /> {/* Your form component */}
    </FormProvider>
  );
}