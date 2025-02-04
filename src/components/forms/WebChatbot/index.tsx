import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

const FormStep1 = ({ control }: any) => (
  <div className="space-y-4">
    <div>
      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
        Business Name
      </label>
      <Controller
        name="businessName"
        control={control}
        rules={{ required: "Business name is required" }}
        render={({ field, fieldState }) => (
          <div>
            <Input
              {...field}
              id="businessName"
              className="mt-1 block w-full"
              placeholder="Enter business name"
            />
            {fieldState?.error && (
              <p className="mt-2 text-sm text-red-600">{fieldState?.error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Business Description
      </label>
      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field, fieldState }) => (
          <div>
            <Textarea
              {...field}
              id="description"
              className="mt-1 block w-full"
              placeholder="Enter a description of your business"
            />
            {fieldState?.error && (
              <p className="mt-2 text-sm text-red-600">{fieldState?.error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  </div>
);

const FormStep2 = ({ control }: any) => (
  <div className="space-y-4">
    
    <div>
      <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
        File Upload
      </label>
      <Controller
        name="fileUpload"
        control={control}
        rules={{ required: "File is required" }}
        render={({ field, fieldState }) => (
          <div>
            <FileInput
              {...field}
              id="fileUpload"
              className="mt-1 block w-full"
            />
            {fieldState?.error && (
              <p className="mt-2 text-sm text-red-600">{fieldState?.error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  </div>
);

const FormStep3 = ({ control }: any) => (
  <div className="space-y-4">
    <div>
      <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
        Website URL
      </label>
      <Controller
        name="websiteUrl"
        control={control}
        rules={{
          required: "Website URL is required",
          pattern: {
            value: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
            message: "Please enter a valid URL",
          },
        }}
        render={({ field, fieldState }) => (
          <div>
            <Input
              {...field}
              id="websiteUrl"
              className="mt-1 block w-full"
              placeholder="https://example.com"
            />
            {fieldState?.error && (
              <p className="mt-2 text-sm text-red-600">{fieldState?.error?.message}</p>
            )}
          </div>
        )}
      />
    </div>
  </div>
);

const WebsiteForm= () => {
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Business Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && <FormStep1 control={control} />}
        {currentStep === 2 && <FormStep2 control={control} />}
        {currentStep === 3 && <FormStep3 control={control} />}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button type="button" onClick={handlePrev} variant="outline">
              <FiArrowLeft className="mr-2" /> Previous
            </Button>
          )}

          {currentStep < 3 ? (
            <Button type="button" onClick={handleNext}>
              Next <FiArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WebsiteForm;
