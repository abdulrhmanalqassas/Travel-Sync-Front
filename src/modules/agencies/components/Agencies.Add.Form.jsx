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
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import { addAgency } from "../Agencies.handlers";
import Alert from "../../core/components/Alert";
import { useTranslation } from "react-i18next";

export default function AgenciesForm({ handleUpdate }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agencyImage, setAgencyImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      name: "",
      state: "",
      city: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      postalCode: "",
      WholesalerId: 1,
      agencyOwnerName: "",
      bankAccountNumber: "",
      commercialRegistryNumber: "",
      agencyOwnerId: "",
      agencyOwnerAddress: "",
      taxCardNumber: "",
    },
    validationSchema: () => {
      const phoneRegex = /^\+\d{1,3}\(?\d{1,4}?\)?\d{6,14}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        name: Yup.string().required(t("Required")),
        state: Yup.string().required(t("Required")),
        city: Yup.string().required(t("Required")),
        email: Yup.string()
          .matches(emailRegex, "Invalid email address")
          .required(t("Required")),
        phone: Yup.string()
          .matches(phoneRegex, "Invalid  phone number")
          .required(t("Required")),
        address: Yup.string().required(t("Required")),
        country: Yup.string().required(t("Required")),
        postalCode: Yup.string().required(t("Required")),
        agencyOwnerName: Yup.string().required(t("Required")),
        bankAccountNumber: Yup.string().required(t("Required")),
        taxCardNumber: Yup.string().required(t("Required")),
        // commercialRegistryNumber: Yup.string().required(t("Required")),
        // agencyOwnerId: Yup.string().required(t("Required")),
        agencyOwnerAddress: Yup.string().required(t("Required"))
      });
    },

    onSubmit: (values, { resetForm }) => {
      uploadImage(agencyImage, setIsLoading, setApiError).then((id) => {
        values["profilePhotoId"] = id ? id[0] : null;
        addAgency(values, setIsLoading, handleUpdate).then(() => {
          onClose();
          resetForm();
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
        scrollBehavior="inside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {t("Add_new_Agency")}
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
                        errorMessage={formHandler.errors.name}
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
                        errorMessage={formHandler.errors.state}
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
                        errorMessage={formHandler.errors.city}
                      />
                    </div>

                    <div>
                      <Input
                        id="email"
                        label={t("email")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.email}
                        isInvalid={
                          formHandler.touched.email && formHandler.errors.email
                        }
                        errorMessage={formHandler.errors.email}
                      />
                    </div>

                    <div>
                      <Input
                        id="phone"
                        type="phone"
                        label={t("phone")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.phone}
                        errorMessage={formHandler.errors.phone}
                        isInvalid={
                          formHandler.touched.phone && formHandler.errors.phone
                        }
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
                        errorMessage={formHandler.errors.address}
                      />
                    </div>
                    <div>
                      <Input
                        id="country"
                        type="country"
                        label={t("country")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.country}
                        isInvalid={
                          formHandler.touched.country &&
                          formHandler.errors.country
                        }
                        errorMessage={formHandler.errors.country}
                      />
                    </div>

                    <div>
                      <Input
                        id="postalCode"
                        type="postalCode"
                        label={t("postalCode")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.postalCode}
                        isInvalid={
                          formHandler.touched.postalCode &&
                          formHandler.errors.postalCode
                        }
                        errorMessage={formHandler.errors.postalCode}
                      />
                    </div>
                    <div>
                      <Input
                        id="commercialRegistryNumber"
                        type="commercialRegistryNumber"
                        label={t("commercial_Registry_Number")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.commercialRegistryNumber}
                        isInvalid={
                          formHandler.touched.commercialRegistryNumber &&
                          formHandler.errors.commercialRegistryNumber
                        }
                        errorMessage={formHandler.errors.commercialRegistryNumber}
                      />
                    </div>
                    <div>
                      <Input
                        id="taxCardNumber"
                        type="taxCardNumber"
                        label={t("Tax Card Number")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.taxCardNumber}
                        isInvalid={
                          formHandler.touched.taxCardNumber &&
                          formHandler.errors.taxCardNumber
                        }
                        errorMessage={formHandler.errors.taxCardNumber}
                      />
                    </div>
                    <div>
                      <Input
                        id="agencyOwnerName"
                        type="agencyOwnerName"
                        label={t("Agency Owner Name")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.agencyOwnerName}
                        isInvalid={
                          formHandler.touched.agencyOwnerName &&
                          formHandler.errors.agencyOwnerName
                        }
                        errorMessage={formHandler.errors.agencyOwnerName}
                      />
                    </div>
                    <div>
                      <Input
                        id="bankAccountNumber"
                        type="bankAccountNumber"
                        label={t("Bank Account Number")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.bankAccountNumber}
                        isInvalid={
                          formHandler.touched.bankAccountNumber &&
                          formHandler.errors.bankAccountNumber
                        }
                        errorMessage={formHandler.errors.bankAccountNumber}
                      />
                    </div>
                    <div>
                      <Input
                        id="agencyOwnerAddress"
                        type="agencyOwnerAddress"
                        label={t("agency_Owner_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.agencyOwnerAddress}
                        isInvalid={
                          formHandler.touched.agencyOwnerAddress &&
                          formHandler.errors.agencyOwnerAddress
                        }
                        errorMessage={formHandler.errors.agencyOwnerAddress}
                      />
                    </div>
                    <div>
                      <Input
                        id="agencyOwnerId"
                        type="agencyOwnerId"
                        label={t("agency_Owner_id")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.agencyOwnerId}
                        isInvalid={
                          formHandler.touched.agencyOwnerId &&
                          formHandler.errors.agencyOwnerId
                        }
                        errorMessage={formHandler.errors.agencyOwnerId}
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
                    isMultiple={false}
                    isOnly={true}
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
