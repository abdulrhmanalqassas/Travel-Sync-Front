/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { ReserveVisa } from "../reservation.handlers";
import TravellerFileUploader from "../components/TravellerFileUploader";
import { useTranslation } from "react-i18next";

const ReserveService = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Get ID from URL
  const location = useLocation();

  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  // State to manage travelers
  const [travelers, setTravelers] = useState([
    {
      travelerData: {
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: "",
        dateOfBirth: "",
      },
      fileIds: [],
    },
  ]);

  // Function to add a new traveler
  const addTraveler = () => {
    setTravelers(() => {
      // Create the new traveler object
      const newTraveler = {
        travelerData: {
          firstName: "",
          lastName: "",
          email: "",
          mobilePhone: "",
          dateOfBirth: "",
        },
        fileIds: [],
      };

      // Append the new traveler to the existing travelers array
      return [...formHandler.values.travelers, newTraveler];
    });
  };

  // Use useFormik for form handling
  const formHandler = useFormik({
    initialValues: {
      serviceId: id,

      quantity: 1,

      travelers: travelers,
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required(t("Required")),

      travelers: Yup.array().of(
        Yup.object({
          travelerData: Yup.object({
            firstName: Yup.string().required(t("Required")),
            lastName: Yup.string().required(t("Required")),
            email: Yup.string().email("Invalid email address"),
            mobilePhone: Yup.string(),
            dateOfBirth: Yup.string(),
          }),
        }),
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("test values", values);
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
      <div className="flex-grow">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 ">
            <h1 className="text-2xl font-semibold">
              {" "}
              {t("Reservation details")}
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
          <div className=" rounded-2xl border-2 p-5 flex-none">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Price Details")}
            </h2>
            <div className="flex justify-between">
              <p>
                {formHandler.values.quantity} {t(" visa")}
              </p>
              <p>120$</p>
            </div>
            <div className="flex justify-between">
              <p> {t("Taxes & fees")}</p>
              <p>15$</p>
            </div>
            <div className="flex justify-between">
              <p>{t("Charter at")}</p>
              <p>10 {t("rooms")}</p>
            </div>
            <div className="flex justify-between">
              <p>{t("charter percenteage")}</p>
              <p>10%</p>
            </div>
            <hr className="border-dashed border-2 my-3" />

            <div className="flex justify-between">
              <p className="font-semibold">{t("Total")}</p>
              <p className="font-semibold">
                {formHandler.values.quantity >= 10
                  ? formHandler.values.quantity * 120 +
                    15 * 0.9 +
                    "$" +
                    "   10% off"
                  : formHandler.values.quantity * 120 + 15 + "$"}
              </p>
            </div>
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
                  id={`travelers[${idx}].travelerData.firstName`}
                  type="text"
                  label={t("First_Name")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.travelerData
                      ?.firstName || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.travelerData
                  ?.firstName &&
                formHandler.errors.travelers?.[idx]?.travelerData?.firstName ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].travelerData.firstName}
                  </div>
                ) : null}
              </div>

              <div>
                <div>
                  <Input
                    id={`travelers[${idx}].travelerData.lastName`}
                    type="text"
                    label={t("last_name")}
                    variant="bordered"
                    labelPlacement="outside"
                    radius="lg"
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    value={
                      formHandler.values.travelers[idx]?.travelerData
                        ?.lastName || ""
                    }
                  />
                  {formHandler.touched.travelers?.[idx]?.travelerData
                    ?.lastName &&
                  formHandler.errors.travelers?.[idx]?.travelerData
                    ?.lastName ? (
                    <div className="text-red-600">
                      {formHandler.errors.travelers[idx].travelerData.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Input
                  id={`travelers[${idx}].travelerData.mobilePhone`}
                  type="text"
                  label={t("mobileNumber")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.travelerData
                      ?.mobilePhone || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.travelerData
                  ?.mobilePhone &&
                formHandler.errors.travelers?.[idx]?.travelerData
                  ?.mobilePhone ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].travelerData.mobilePhone}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  id={`travelers[${idx}].travelerData.email`}
                  type="email"
                  label={t("email")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={
                    formHandler.values.travelers[idx]?.travelerData?.email || ""
                  }
                />
                {formHandler.touched.travelers?.[idx]?.travelerData?.email &&
                formHandler.errors.travelers?.[idx]?.travelerData?.email ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].travelerData.email}
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
          {t("Add_Traveler_visa")}
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
