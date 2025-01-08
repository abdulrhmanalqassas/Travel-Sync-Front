/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { useState } from "react";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { addService } from "../services.handlers";
import { useTranslation } from "react-i18next";

export default function HotelsForm({ handleUpdate }) {
  const { t } = useTranslation();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agencyImage, setAgencyImage] = useState([]);
  const [internalMapImage, setinternalMapImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      name: "",
      address: "",
      stars: "",
      city: "",
      state: "",
      zipCode: "",
      mobileNumber: "",
      phoneNumber: "",
      website: "",
      email: "",
      description: "",
      ar_name: "",
      ar_address: "",
      ar_city: "",
      ar_state: "",
      ar_description: "",
      WholesalerId: 1,
      location: "",
    },
    validationSchema: () => {
      const phoneRegex = /^\+20(1[0125]\d{8})$/; // Egyptian phone number regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        name: Yup.string().required(t("Required")),
        // ar_name: Yup.string().required(t("Required")),
        address: Yup.string().required(t("Required")),
        stars: Yup.number().integer().required(t("Required")),
        city: Yup.string().required(t("Required")),
        state: Yup.string().required(t("Required")),
        zipCode: Yup.string().required(t("Required")),
        mobileNumber: Yup.string().required(t("Required")),
        phoneNumber: Yup.string()
          .matches(phoneRegex, "Invalid Egyptian phoneNumber number")
          .required(t("Required")),
        website: Yup.string().required(t("Required")),
        email: Yup.string()
          .matches(emailRegex, "Invalid email address")
          .required(t("Required")),
        description: Yup.string().required(t("Required")),
        location: Yup.string().required(t("Required")),
      });
    },

    onSubmit: (values, { resetForm }) => {
      uploadImage(agencyImage, setIsLoading, setApiError).then((id) => {
        // Check if image is properly updated
        values.imageIds = id || null;
        values.stars = Number(values.stars);
        uploadImage(internalMapImage, setIsLoading, setApiError).then((id) => {
          addService(values, setIsLoading, handleUpdate, "hotels").then(() => {
            onClose();
            resetForm();
          });
        });
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        className="bg-foreground text-background"
        onPress={onOpen}
        endContent={<PlusIcon />}
        size="sm"
      >
        {t("add_new")}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {t("Add_new_hotel")}
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="name"
                        type="name"
                        label={t("Name")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.name}
                        isInvalid={
                          formHandler.touched.name && formHandler.errors.name
                        }
                        errormessage={formHandler.errors.name}
                      />
                    </div>
                    <div>
                      <Input
                        id="ar_name"
                        type="name"
                        label={t("ar_name")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_name}
                        isInvalid={
                          formHandler.touched.name && formHandler.errors.name
                        }
                        errormessage={formHandler.errors.name}
                      />
                    </div>
                    <div>
                      <Input
                        id="stars"
                        label={t("stars")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.stars}
                        isInvalid={
                          formHandler.touched.stars && formHandler.errors.stars
                        }
                        errormessage={formHandler.errors.stars}
                      />
                    </div>
                    <div>
                      <Input
                        id="zipCode"
                        type="zipCode"
                        label={t("ZIP CODE")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.zipCode}
                        isInvalid={
                          formHandler.touched.zipCode &&
                          formHandler.errors.zipCode
                        }
                        errormessage={formHandler.errors.zipCode}
                      />
                    </div>
                    <div>
                      <Input
                        id="state"
                        type="state"
                        label={t("state")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.state}
                        isInvalid={
                          formHandler.touched.state && formHandler.errors.state
                        }
                        errormessage={formHandler.errors.state}
                      />
                    </div>

                    <div>
                      <Input
                        id="city"
                        type="city"
                        label={t("city")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.city}
                        isInvalid={
                          formHandler.touched.city && formHandler.errors.city
                        }
                        errormessage={formHandler.errors.city}
                      />
                      {formHandler.touched.city && formHandler.errors.city ? (
                        <div className="text-red-600">
                          {formHandler.errors.city}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="ar_city"
                        type="city"
                        label={t("ar_city")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_city}
                        isInvalid={
                          formHandler.touched.city && formHandler.errors.city
                        }
                        errormessage={formHandler.errors.city}
                      />
                      {formHandler.touched.ar_city &&
                      formHandler.errors.ar_city ? (
                        <div className="text-red-600">
                          {formHandler.errors.city}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="location"
                        type="location"
                        label={t("location")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.location}
                      />
                      {formHandler.touched.location &&
                      formHandler.errors.location ? (
                        <div className="text-red-600">
                          {formHandler.errors.location}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="email"
                        label={t("email")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                      />
                      {formHandler.touched.email && formHandler.errors.email ? (
                        <div className="text-red-600">
                          {formHandler.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="phoneNumber"
                        type="phoneNumber"
                        label={t("phoneNumber")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.phoneNumber}
                        isInvalid={
                          formHandler.touched.phoneNumber &&
                          formHandler.errors.phoneNumber
                        }
                        errormessage={formHandler.errors.phoneNumber}
                      />
                    </div>

                    <div>
                      <Input
                        id="mobileNumber"
                        type="mobileNumber"
                        label={t("mobileNumber")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.mobileNumber}
                        isInvalid={
                          formHandler.touched.mobileNumber &&
                          formHandler.errors.mobileNumber
                        }
                        errormessage={formHandler.errors.mobileNumber}
                      />
                    </div>

                    <div>
                      <Input
                        id="address"
                        type="address"
                        label={t("address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.address}
                        isInvalid={
                          formHandler.touched.address &&
                          formHandler.errors.address
                        }
                        errormessage={formHandler.errors.address}
                      />
                    </div>
                    <div>
                      <Input
                        id="ar_address"
                        type="ar_address"
                        label={t("ar_address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_address}
                        isInvalid={
                          formHandler.touched.address &&
                          formHandler.errors.address
                        }
                        errormessage={formHandler.errors.address}
                      />
                    </div>

                    <div>
                      <Input
                        id="website"
                        type="website"
                        label={t("website")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.website}
                        isInvalid={
                          formHandler.touched.website &&
                          formHandler.errors.website
                        }
                        errormessage={formHandler.errors.website}
                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        id="description"
                        type="description"
                        label={t("Description")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.description}
                        isInvalid={
                          formHandler.touched.description &&
                          formHandler.errors.description
                        }
                        errormessage={formHandler.errors.description}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id="ar_description"
                        type="description"
                        label={t("ar_description")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_description}
                        isInvalid={
                          formHandler.touched.description &&
                          formHandler.errors.description
                        }
                        errormessage={formHandler.errors.description}
                      />
                    </div>

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={agencyImage}
                    setFiles={setAgencyImage}
                    isMultiple
                    isOnly={false}
                  />
                  {"internalMapImage"}
                  <ImagesUploader
                    files={internalMapImage}
                    setFiles={setinternalMapImage}
                    isMultiple
                    isOnly={false}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("Close")}
                </Button>
                <Button
                  isLoading={isLoading}
                  color="success"
                  type="submit"
                  className="text-white"
                >
                  {t("Add")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
