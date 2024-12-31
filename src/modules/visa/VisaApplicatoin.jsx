// import CountrySelector from "../core/components/countrySelector.jsx";
import TravellerFileUploader from "../reservation/components/TravellerFileUploader.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { ReserveVisa } from "./reservation.handlers";
import { useTranslation } from "react-i18next";
import CountrySelector from "../core/components/countrySelector.jsx";
import { COUNTRIES } from "../core/components/countries.js";

const ReserveService = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [country, setCountry] = useState("AF");
  const [isOpen, setIsOpen] = useState(false);
  // Get ID from URL

  const id = 1;

  // State to manage travelers
  const [travelers, setTravelers] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      dateOfBirth: "",
      PlaceOfBirth: "",
      MaritalStatus: "",
      Nationality: "",
      occupation: "",
      passportNumber: "",
      passportExpiryDate: "",
      passportIssuedDate: "",
      address: "",
      purposeOfTravel: "",
      nameOfRelatives: "",
      AddressOfRelatives: "",
      fileIds: [],
    },
  ]);

  // Function to add a new traveler
  const addTraveler = () => {
    setTravelers(() => {
      // Create the new traveler object
      const newTraveler = {
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
        dateOfBirth: "",
        fileIds: [],
      };

      // Append the new traveler to the existing travelers array
      return [...formHandler.values.travelers, newTraveler];
    });
  };

  // Use useFormik for form handling
  const formHandler = useFormik({
    initialValues: {
      country: country,
      // visaRequirementId: id,
      quantity: 1,
      travelers: travelers,
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required(t("Required")),

      travelers: Yup.array().of(
        Yup.object({
          firstName: Yup.string().required(t("Required")),
          lastName: Yup.string().required(t("Required")),
          email: Yup.string()
            .email("Invalid email address")
            .required(t("Required")),
          mobilePhone: Yup.string().required(t("Required")),
          dateOfBirth: Yup.string().required(t("Required")),
          PlaceOfBirth: Yup.string().required(t("Required")),
          MaritalStatus: Yup.string().required(t("Required")),
          Nationality: Yup.string().required(t("Required")),
          occupation: Yup.string().required(t("Required")),
          passportNumber: Yup.string().required(t("Required")),
          passportExpiryDate: Yup.string().required(t("Required")),
          passportIssuedDate: Yup.string().required(t("Required")),
          address: Yup.string().required(t("Required")),
          purposeOfTravel: Yup.string().required(t("Required")),
          nameOfRelatives: Yup.string().required(t("Required")),
          AddressOfRelatives: Yup.string().required(t("Required")),
        }),
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      // Handle form submission
      ReserveVisa(setIsLoading, values);
      resetForm();
    },
  });

  // Sync travelers state with formik values
  useEffect(() => {
    formHandler.setFieldValue("travelers", travelers);
  }, [travelers]);

  return (
    <form
      onSubmit={formHandler.handleSubmit}
      className="m-5 p-5 rounded-lg bg-white"
    >
      <div className="px-5 py-4 h-40">
        <CountrySelector
          id="countries"
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          onChange={(val) => setCountry(val)}
          selectedValue={COUNTRIES.find((option) => option.value === country)}
        />
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 ">
            <h1 className="text-2xl font-semibold">
              {" "}
              {t("Reservation_details")}
            </h1>

            {/* Quantity Input */}
            <div className="mb-2">
              <Input
                id="quantity"
                type="number"
                label={t("Quantity")}
                variant="bordered"
                labelPlacement="outside"
                radius="lg"
                min={1}
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.quantity}
              />
              {formHandler.touched.quantity && formHandler.errors.quantity ? (
                <div className="text-red-600">
                  {formHandler.errors.quantity}
                </div>
              ) : null}
            </div>

            {/* Check-In Date Input */}
          </div>
        </div>

        {/* Travelers Section */}
        {travelers.map((_, idx) => (
          <div key={idx} className="my-5">
            <h1 className="text-2xl font-semibold">
              {t("Traveler")} {idx + 1}
            </h1>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].firstName`}
                  type="text"
                  label={t("First_Name")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.firstName || ""}
                />
                {formHandler.touched.travelers?.[idx]?.firstName &&
                formHandler.errors.travelers?.[idx]?.firstName ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].firstName}
                  </div>
                ) : null}
              </div>

              <div>
                <div>
                  <Input
                    id={`travelers[${idx}].lastName`}
                    type="text"
                    label={t("Last_Name")}
                    variant="bordered"
                    labelPlacement="outside"
                    radius="lg"
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    value={formHandler.values.travelers[idx]?.lastName || ""}
                  />
                  {formHandler.touched.travelers?.[idx]?.lastName &&
                  formHandler.errors.travelers?.[idx]?.lastName ? (
                    <div className="text-red-600">
                      {formHandler.errors.travelers[idx].lastName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].PlaceOfBirth`}
                  type="text"
                  label={t("PlaceOfBirth")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.PlaceOfBirth || ""}
                />
                {formHandler.touched.travelers?.[idx]?.PlaceOfBirth &&
                formHandler.errors.travelers?.[idx]?.PlaceOfBirth ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].PlaceOfBirth}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].MaritalStatus`}
                  type="text"
                  label={t("MaritalStatus")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.MaritalStatus || ""}
                />
                {formHandler.touched.travelers?.[idx]?.MaritalStatus &&
                formHandler.errors.travelers?.[idx]?.MaritalStatus ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].MaritalStatus}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].Nationality`}
                  type="text"
                  label={t("Nationality")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.Nationality || ""}
                />
                {formHandler.touched.travelers?.[idx]?.Nationality &&
                formHandler.errors.travelers?.[idx]?.Nationality ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].Nationality}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].occupation`}
                  type="text"
                  label={t("occupation")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.occupation || ""}
                />
                {formHandler.touched.travelers?.[idx]?.occupation &&
                formHandler.errors.travelers?.[idx]?.occupation ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].occupation}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].passportNumber`}
                  type="text"
                  label={t("passportNumber")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.passportNumber || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.passportNumber &&
                formHandler.errors.travelers?.[idx]?.passportNumber ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].passportNumber}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].passportExpiryDate`}
                  type="text"
                  label={t("passportExpiryDate")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.passportExpiryDate || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.passportExpiryDate &&
                formHandler.errors.travelers?.[idx]?.passportExpiryDate ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].passportExpiryDate}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].passportIssuedDate`}
                  type="text"
                  label={t("passportIssuedDate")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.passportIssuedDate || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.passportIssuedDate &&
                formHandler.errors.travelers?.[idx]?.passportIssuedDate ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].passportIssuedDate}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].address`}
                  type="text"
                  label={t("address")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.address || ""}
                />
                {formHandler.touched.travelers?.[idx]?.address &&
                formHandler.errors.travelers?.[idx]?.address ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].address}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].purposeOfTravel`}
                  type="text"
                  label={t("purposeOfTravel")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.purposeOfTravel || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.purposeOfTravel &&
                formHandler.errors.travelers?.[idx]?.purposeOfTravel ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].purposeOfTravel}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].nameOfRelatives`}
                  type="text"
                  label={t("Name_of_Relatives")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.nameOfRelatives || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.nameOfRelatives &&
                formHandler.errors.travelers?.[idx]?.nameOfRelatives ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].nameOfRelatives}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].AddressOfRelatives`}
                  type="text"
                  label={t("Address_of_Relatives")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.AddressOfRelatives || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.AddressOfRelatives &&
                formHandler.errors.travelers?.[idx]?.AddressOfRelatives ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].AddressOfRelatives}
                  </div>
                ) : null}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].mobilePhone`}
                  type="text"
                  label={t("mobileNumber")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.mobilePhone || ""}
                />
                {formHandler.touched.travelers?.[idx]?.mobilePhone &&
                formHandler.errors.travelers?.[idx]?.mobilePhone ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].mobilePhone}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].email`}
                  type="email"
                  label={t("email")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.email || ""}
                />
                {formHandler.touched.travelers?.[idx]?.email &&
                formHandler.errors.travelers?.[idx]?.email ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].email}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <Input
                id={`travelers[${idx}].dateOfBirth`}
                type="date"
                label={t("Date_of_Birth")}
                variant="bordered"
                labelPlacement="outside"
                radius="lg"
                onChange={formHandler.handleChange}
                onBlur={formHandler.handleBlur}
                value={formHandler.values.travelers[idx]?.dateOfBirth || ""}
              />
              {formHandler.touched.travelers?.[idx]?.dateOfBirth &&
              formHandler.errors.travelers?.[idx]?.dateOfBirth ? (
                <div className="text-red-600">
                  {formHandler.errors.travelers[idx].dateOfBirth}
                </div>
              ) : null}
            </div>

            <TravellerFileUploader
              key={idx}
              TravellerFiles={formHandler.values.travelers[idx]?.fileIds}
              idx={idx}
              setIsUploading={setIsUploading}
            />
          </div>
        ))}

        {/* Button to add a new traveler */}
        <Button color="warning" className="mr-2" onClick={addTraveler}>
          {t("Add_Traveler")}
        </Button>

        {/* Submit button */}
        <Button
          type="submit"
          color="secondary"
          disabled={isUploading}
          isLoading={isLoading}
          className={`btn ${isUploading ? "bg-gray-400" : "btn-primary"}  mt-4`}
        >
          {t("Submit")}
        </Button>
      </div>
    </form>
  );
};

export default ReserveService;
