/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import { Reserve } from "../reservation.handlers";
import TravellerFileUploader from "../components/TravellerFileUploader";
import { useTranslation } from "react-i18next";
import { data } from "autoprefixer";
import { getService } from "../../services/services.handlers";

const ReserveService = ({ type }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState([]);

  

  // Get ID from URL
  const location = useLocation();

  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  useEffect(() => {
    getService(setData, setIsLoading, `hotel-rooms/${id}`);
  }, [id]);


  // State to manage travelers
  const [travelers, setTravelers] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      mobilePhone: "",
      dateOfBirth: "",
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
          nationality: "",
          passportNumber: "",
          fileIds: [],
        },
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
      checkInDate: "1",
      checkOutDate: "1",
      travelers: travelers,
    },
    validationSchema: Yup.object({
      quantity: Yup.string().required(t("Required")),
      checkInDate:
        type == "room" ? Yup.string().required(t("Required")) : Yup.string(),
      checkOutDate:
        type == "room" ? Yup.string().required(t("Required")) : Yup.string(),

      travelers: Yup.array().of(
        Yup.object({
          firstName: Yup.string().required(t("Required")),
          lastName: Yup.string().required(t("Required")),
          email: Yup.string()
            .email("Invalid email address")
            .required(t("Required")),
          mobilePhone: Yup.string().required(t("Required")),
          dateOfBirth: Yup.string().required(t("Required")),
          nationality: Yup.string().required(t("Required")),
          passportNumber: Yup.string().required(t("Required")),
        }),
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      // Handle form submission
      Reserve(setIsLoading, values);
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
            <div className="grid grid-cols-2 gap-3">
              {type == "room" ? (
                <>
                  <div>
                    <Input
                      id="checkInDate"
                      type="date"
                      label={t("Check-In_Date")}
                      variant="bordered"
                      labelPlacement="outside"
                      radius="lg"
                      onChange={formHandler.handleChange}
                      onBlur={formHandler.handleBlur}
                      value={formHandler.values.checkInDate}
                    />
                    {formHandler.touched.checkInDate &&
                    formHandler.errors.checkInDate ? (
                      <div className="text-red-600">
                        {formHandler.errors.checkInDate}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <Input
                      id="checkOutDate"
                      type="date"
                      label={t("Check-Out_Date")}
                      variant="bordered"
                      labelPlacement="outside"
                      radius="lg"
                      onChange={formHandler.handleChange}
                      onBlur={formHandler.handleBlur}
                      value={formHandler.values.checkOutDate}
                    />
                    {formHandler.touched.checkOutDate &&
                    formHandler.errors.checkOutDate ? (
                      <div className="text-red-600">
                        {formHandler.errors.checkOutDate}
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className=" rounded-2xl border-2 p-5 flex-none">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Price_Details")}
            </h2>
            <div className="flex justify-between">
              <p>
                {formHandler.values.quantity} {t("night")}
              </p>
              <p>{ data?.price + data?.margin}$</p>
            </div>
            {/* <div className="flex justify-between">
              <p> {t("Taxes_fees")}</p>
              <p>15$</p>
            </div>
            <div className="flex justify-between">
              <p>{t("Charter at")}</p>
              <p>10 {t("Rooms")}</p>
            </div>
            <div className="flex justify-between">
              <p>{t("charter percenteage")}</p>
              <p>10%</p>
            </div> */}
            <hr className="border-dashed border-2 my-3" />

            <div className="flex justify-between">
              <p className="font-semibold">{t("Total")}</p>
              <p className="font-semibold">
                {`${(data?.price + data?.margin)* formHandler.values.quantity}$`}
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
              <div>
                <Input
                  id={`travelers[${idx}].nationality`}
                  type="text"
                  label={t("nationality")}
                  variant="bordered"
                  labelPlacement="outside"
                  radius="lg"
                  onChange={formHandler.handleChange}
                  onBlur={formHandler.handleBlur}
                  value={formHandler.values.travelers[idx]?.nationality || ""}
                />
                {formHandler.touched.travelers?.[idx]?.nationality &&
                formHandler.errors.travelers?.[idx]?.nationality ? (
                  <div className="text-red-600">
                    {formHandler.errors.travelers[idx].nationality}
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
