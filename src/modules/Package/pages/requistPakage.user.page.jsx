import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Reserve } from "../reservation.handlers";
import * as Yup from "yup"; // For validation.
import { Button, Input } from "@nextui-org/react";
import { ClockLoader } from "react-spinners";
import { useFormik } from "formik";

// import { RoleEnum } from "../../../../enums/role-enum";

const RequestPackage = () => {
  //this ia a page for the user to request a package using a form for new package
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
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

  const formHandler = useFormik({
    initialValues: {
      // visaRequirementId: id,
      quantity: 1,
      travelers: travelers,
      customPackage: {
        name: "",
        description: "",
        customService: "",
        text: "",
      },
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
        }),
      ),
      customPackage: Yup.object({
        text: Yup.string().required(t("Required")),
      }),
    }),
    onSubmit: (values, { resetForm }) => {
      // Handle form submission
      Reserve(setIsLoading, formHandler.values);
      resetForm();
    },
  });
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
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // };
  useEffect(() => {
    formHandler.setFieldValue("travelers", travelers);
  }, [travelers]);
  return (
    <>
      {" "}
      <h1 className="text-2xl font-bold">{t("Request_Package")}</h1>
      <form
        onSubmit={formHandler.handleSubmit}
        className="m-5 p-5 rounded-lg bg-white"
      >
        <div className="flex-grow">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 ">
              {/* <h1 className="text-2xl font-semibold">
                {" "}
                {t("Reservation_details")}
              </h1> */}

              {/* Quantity Input */}
              {/* <div className="mb-2">
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
            </div> */}

              {/* Check-In Date Input */}
            </div>
          </div>
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
              <div className="text-red-600">{formHandler.errors.quantity}</div>
            ) : null}
          </div>

          {/* Check-In Date Input */}
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
          <Input
            id={`customPackage.description`}
            type="textarea"
            label={t("description")}
            variant="bordered"
            labelPlacement="outside"
            radius="lg"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.customPackage.description || " "}
          />
          <Input
            id={`customPackage.customService`}
            type="text"
            label={t("customService")}
            variant="bordered"
            labelPlacement="outside"
            radius="lg"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.customPackage.customService || " "}
          />
          <Input
            id={`customPackage.text`}
            type="text"
            label={t("text")}
            variant="bordered"
            labelPlacement="outside"
            radius="lg"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.customPackage.text || " "}
          />
          <Input
            id={`customPackage.name`}
            type="text"
            label={t("name")}
            variant="bordered"
            labelPlacement="outside"
            radius="lg"
            onChange={formHandler.handleChange}
            onBlur={formHandler.handleBlur}
            value={formHandler.values.customPackage.name || " "}
          />

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
              </div>

              {/* <TravellerFileUploader
                key={idx}
                TravellerFiles={formHandler.values.travelers[idx]?.fileIds}
                idx={idx}
                setIsUploading={setIsUploading}
              /> */}
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
            isLoading={isLoading}
            className={`btn ${isLoading ? "bg-gray-400" : "btn-primary"}  mt-4`}
          >
            {t("Submit")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RequestPackage;
