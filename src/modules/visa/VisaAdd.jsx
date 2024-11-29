// import TravellerFileUploader from "../reservation/components/TravellerFileUploader";
import { Button, Input } from "@nextui-org/react";
import { useState, useRef } from "react";
import { TECollapse } from "tw-elements-react";
import CountrySelector from "../core/components/countrySelector";
import { COUNTRIES } from "../core/components/countries";
import ImagesUploader from "../core/components/ImageUploader/ImageUploader";
import { uploadImage } from "../core/core.handlers";
import Form from "../core/components/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addVisaByImg } from "./visa.handlers";
import { RiVisaLine } from "react-icons/ri";

// Helper function to create form inputs based on validation schema
// Example validation schema
const initialValidationSchema = Yup.object({
  nameAndSurname: Yup.string("يجب ان يكون الاسم صحيح")
    .required("يجب ادخال الاسم")
    .min(3)
    .max(100)
    .required(),
  religion: Yup.string().required(),
  gender: Yup.string().required(),
  originalNationality: Yup.string().required(),
  currentNationality: Yup.string().required(),
  countryOfBirth: Yup.string().required(),
  dateOfBirth: Yup.date().required(),
  previosOccupation: Yup.string().required(),
  currentOccupation: Yup.string().required(),
  addresOfhisResidenceInHisCountry: Yup.string().required(),
  languagesSpokenOrRead: Yup.string().required(),
  nationality: Yup.string().required(),
  wifeOrHusbandName: Yup.string().required(),
  occupatoin: Yup.string().required(),
  hPlaceOfBirth: Yup.string().required(),
  hDateOfBirth: Yup.date().required(),
  placeOfHusbandOrWifeWork: Yup.string().required(),
  PassportNumber: Yup.number().required(),
  issuingCountry: Yup.string().required(),
  expPassport: Yup.string().required(),
  dateOfIssue: Yup.string().required(),
  accompaniedPersons: Yup.string().required(),
  proffession: Yup.string().required(),
  certificates: Yup.string().required(),
  placeOfIssuingCertificates: Yup.string().required(),
  dateOfIssueCertificates: Yup.string().required(),
  placeOfIssuingVisa: Yup.string().required(),
  placeProceedFrom: Yup.string().required(),
  placeOfEntering: Yup.string().required(),
  purposeOfEnteringIraq: Yup.string().required(),
  expectedTimeOfResidenceInIraq: Yup.string().required(),
  fullAddressForStayingInIraq: Yup.string().required(),
  fullAddressForPlaceOfWorkInIraq: Yup.string().required(),
  nameOfContractingFirmInIraq: Yup.string().required(),
  numberOfPreviousEntringToIraq: Yup.string().required(),
  dateOfTheLastPreviousEntryToIraq: Yup.string().required(),
  previousOccupationInIraq: Yup.string().required(),
  placesOfPreciousResidenceInIraq: Yup.string().required(),
})

// Initial values
const initialValues ={
  nameAndSurname: "",
  religion: "",
  gender: "",
  originalNationality: "",
  currentNationality: "",
  countryOfBirth: "",
  // dateOfBirth: "",
  previosOccupation: "",
  currentOccupation: "",
  addresOfhisResidenceInHisCountry: "",
  languagesSpokenOrRead: "",
  nationality: "",
  wifeOrHusbandName: "",
  occupatoin: "",
  hPlaceOfBirth: "",
  // hDateOfBirth: "",
  placeOfHusbandOrWifeWork: "",
  PassportNumber: "",
  issuingCountry: "",
  expPassport: "",
  dateOfIssue: "",
  accompaniedPersons: "",
  proffession: "",
  certificates: "",
  placeOfIssuingCertificates: "",
  dateOfIssueCertificates: "",
  placeOfIssuingVisa: "",
  placeProceedFrom: "",
  placeOfEntering: "",
  purposeOfEnteringIraq: "",
  expectedTimeOfResidenceInIraq: "",
  fullAddressForStayingInIraq: "",
  fullAddressForPlaceOfWorkInIraq: "",
  nameOfContractingFirmInIraq: "",
  numberOfPreviousEntringToIraq: "",
  dateOfTheLastPreviousEntryToIraq: "",
  previousOccupationInIraq: "",
  placesOfPreciousResidenceInIraq: "",
}

// Handle submit function

const VisaAdd = () => {
  const [extraField, setExtraField] = useState("");

  const [validationSchema, setValidationSchema] = useState(
    initialValidationSchema,
  );
  const [activeElement, setActiveElement] = useState("");
  const [visaImages, setVisaImages] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const addFieldToSchema = (newField) => {
    setValidationSchema((prevSchema) =>
      prevSchema.concat(
        Yup.object({ [newField]: Yup.string().required("Required") }),
      ),
    );
    setExtraField("");
  };
  const handleSubmit = async (values) => {
    console.log("valuse for :>>>>>>>55544", values);
    try {
      console.log("valuse for :>>>>>>>55544", values);
      let imageIds;
      if (visaImages.length !== 0) {
        imageIds = await uploadImage(visaImages, setIsLoading, setApiError);
        values.imageIds = imageIds ? imageIds : [];
      }
      values.imageIds = imageIds ? imageIds : [];

      // values.service.WholesalerId = 1;
      await addVisaByImg(values, setIsLoading);
      // onClose();
      // resetForm();
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };

  const handleClick = (value) => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };

  const myRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState("AF");

  return (
    <div className="m-5 mt-1 p-5 rounded-lg bg-white flex flex-col justify-center">
      <h1 className="text-2xl font-bold">Visa add Form</h1>
      <>
        <div id="accordionExample">
          <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 ">
            <h2 className="mb-0" id="headingOne">
              <button
                className={`${
                  activeElement === "element1" &&
                  `vvvvvvvvvvv text-green-900 text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
                type="button"
                onClick={() => handleClick("element1")}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Add Visa By Image
                <span
                  className={`${
                    activeElement === "element1"
                      ? `rotate-[-180deg] -mr-1`
                      : `rotate-0 fill-[#212529]  dark:fill-white`
                  } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </button>
            </h2>
            <TECollapse
              show={activeElement === "element1"}
              className={`${
                isOpen === "true" && `h-96`
              }!mt-5 h-52 !rounded-b-none !shadow-none `}
            >
              <div className="px-5 py-4 h-40">
                <CountrySelector
                  id="countries"
                  open={isOpen}
                  onToggle={() => setIsOpen(!isOpen)}
                  onChange={(val) => setCountry(val)}
                  selectedValue={COUNTRIES.find(
                    (option) => option.value === country,
                  )}
                />
                <ImagesUploader
                  files={visaImages}
                  setFiles={setVisaImages}
                  isMultiple={true}
                  isOnly={false}
                />
                <Button
                  isLoading={isLoading}
                  color="success"
                  type="submit"
                  className="text-white"
                  onClick={() => handleSubmit({ country })}
                >
                  add visa
                </Button>
              </div>
            </TECollapse>
          </div>
        </div>
        <div className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
          <h2 className="mb-0" id="headingTwo">
            <button
              className={`${
                activeElement === "element2"
                  ? `text-primary [box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:!text-primary-400 dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]`
                  : `transition-none rounded-b-[15px]`
              } group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white`}
              type="button"
              onClick={() => handleClick("element2")}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #2
              <span
                className={`${
                  activeElement === "element2"
                    ? `rotate-[-180deg] -mr-1`
                    : `rotate-0 fill-[#212529] dark:fill-white`
                } ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200 ease-in-out motion-reduce:transition-none dark:fill-blue-300`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </button>
          </h2>
          <TECollapse
            show={activeElement === "element2"}
            className="!mt-0 !rounded-b-none !shadow-none"
          >
            <div className="px-5 py-4">
              {console.log(">>>>>>>>>>>>>>>>>>>>>", validationSchema)}
              <CountrySelector
                  id="countries2"
                  open={isOpen}
                  onToggle={() => setIsOpen(!isOpen)}
                  onChange={(val) => setCountry(val)}
                  selectedValue={COUNTRIES.find(
                    (option) => option.value === country,
                  )}
                />
             
               <div className="w-1/2">
               
            <div className="grid grid-cols-1 gap-3">
              {console.log(">>>>>>>>>>>2222222222>>>>>>>>>>", validationSchema)}
            
              <Input
                id={"extra filed"}
                name={"extra filed "}
                type="text"
                label="add extra key"
                radius="lg"
                onChange={(e) => setExtraField(e.target.value)}
                value={extraField}
              />
                <Button onClick={() => addFieldToSchema(extraField)}>
                add filed
              </Button>
            </div>
          </div>
         
              <Form
                initialValues={initialValues}
                handleSubmit={handleSubmit}
                validationSchema={validationSchema}
              />
            </div>
          </TECollapse>
        </div>
      </>
    </div>
  );
};

export default VisaAdd;
