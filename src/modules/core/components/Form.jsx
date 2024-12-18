import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
// import TravellerFileUploader from "../reservation/components/TravellerFileUploader";

// Helper function to create form inputs based on validation schema
// const generateFormInputs = (schema, formHandler, path = "") => {
//   return Object.keys(schema?.fields).map((key) => {
//     const field = schema.fields[key];
//     const fieldPath = key;
//     const fieldType = field.type === "number" ? "number" : "text";
//     return (
//       <div key={fieldPath}>
//         {" "}
//         <Input
//           id={fieldPath}
//           name={fieldPath}
//           type={fieldType}
//           label={key}
//           radius="lg"
//           onChange={formHandler.handleChange}
//           onBlur={formHandler.handleBlur}
//           value={formHandler.values[fieldPath]}
//           isInvalid={
//             formHandler.errors[fieldPath] && formHandler.touched[fieldPath]
//           }
//           errorMessage={formHandler.errors[fieldPath]}
//         />{" "}
//       </div>
//     );
//   });
// };
const generateFormInputs = (schema, formHandler) => {
  return Object.keys(schema?.fields).map((key) => {
    const field = schema.fields[key];
    const fieldPath = key;
    const fieldType = field.type === "number" ? "number" : "text";
    return (
      <div key={fieldPath}>
        {" "}
        <Input
          id={fieldPath}
          name={fieldPath}
          type={fieldType}
          label={key}
          radius="lg"
          onChange={formHandler.handleChange}
          onBlur={formHandler.handleBlur}
          value={formHandler.values[fieldPath] || ""}
          isInvalid={
            formHandler.errors[fieldPath] && formHandler.touched[fieldPath]
          }
          errorMessage={formHandler.errors[fieldPath]}
        />{" "}
      </div>
    );
  });
};

// Your custom function
const createFormikConfig = (initialValues, validationSchema, handleSubmit) => {
  return {
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  };
};

// Handle submit function

const Form = ({ initialValues, handleSubmit, validationSchema }) => {
  const formHandler = useFormik(
    createFormikConfig(initialValues, validationSchema, handleSubmit),
  );
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col m-5 mt-1 p-5 rounded-lg bg-white mr-2 ">
      <h1 className="text-2xl font-bold">Visa Application Form</h1>
      <form onSubmit={formHandler.handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-3">
             
              {generateFormInputs(validationSchema, formHandler)}
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-foreground text-background mt-2" size="lg">
          {t("add_visa")}
        </Button>
      </form>
    </div>
  );
};

export default Form;
