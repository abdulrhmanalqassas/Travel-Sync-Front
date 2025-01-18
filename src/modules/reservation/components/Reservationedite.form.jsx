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
import * as Yup from "yup";
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { EditIcon } from "../../core/components/icons/EditIcon";
import { useTranslation } from "react-i18next";
import { instance } from "../../../network/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const edited = () =>
  toast.success("Traveler information updated successfully.");

export default function TravelerFormEdit({
  handleUpdate,
  reservationId,
  travelerId,
  data,
}) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const cookie = Cookies.get("auth-token-data");
  const token = JSON.parse(cookie ? cookie : "null")?.token;

  const editTraveler = async (values, reservationId, travelerId) => {
    setIsLoading(true);
    try {
      await instance.patch(
        `/api/reservations/${reservationId}/travelers/${travelerId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      handleUpdate();
      edited();
    } catch (error) {
      console.error(error);
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formHandler = useFormik({
    initialValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      mobilePhone: data?.mobilePhone || "",
      dateOfBirth: data?.dateOfBirth || "",
      nationality: data?.nationality || "",
      passportNumber: data?.passportNumber || "",
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required(t("Required")),
      lastName: Yup.string().required(t("Required")),
      email: Yup.string().email(t("Invalid email")).required(t("Required")),
      mobilePhone: Yup.string().required(t("Required")),
      dateOfBirth: Yup.date().required(t("Required")),
      nationality: Yup.string().required(t("Required")),
      passportNumber: Yup.string().required(t("Required")),
    }),

    onSubmit: async (values, { resetForm }) => {
      const fileIds =
        documents.length > 0
          ? await uploadImage(documents, setIsLoading, setApiError)
          : [];

      const submitData = {
        ...values,
        fileIds: fileIds || [],
      };

      await editTraveler(submitData, reservationId, travelerId);
      onClose();
      resetForm();
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <span
        onClick={onOpen}
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
      >
        <EditIcon />
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
        backdrop="blur"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {t("Edit Traveler Information")}
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="firstName"
                    label={t("First Name")}
                    value={formHandler.values.firstName}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.firstName &&
                      formHandler.errors.firstName
                    }
                    errorMessage={
                      formHandler.touched.firstName &&
                      formHandler.errors.firstName
                    }
                  />
                  <Input
                    id="lastName"
                    label={t("Last Name")}
                    value={formHandler.values.lastName}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.lastName &&
                      formHandler.errors.lastName
                    }
                    errorMessage={
                      formHandler.touched.lastName &&
                      formHandler.errors.lastName
                    }
                  />
                  <Input
                    id="email"
                    type="email"
                    label={t("Email")}
                    value={formHandler.values.email}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.email && formHandler.errors.email
                    }
                    errorMessage={
                      formHandler.touched.email && formHandler.errors.email
                    }
                  />
                  <Input
                    id="mobilePhone"
                    label={t("Mobile Phone")}
                    value={formHandler.values.mobilePhone}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.mobilePhone &&
                      formHandler.errors.mobilePhone
                    }
                    errorMessage={
                      formHandler.touched.mobilePhone &&
                      formHandler.errors.mobilePhone
                    }
                  />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    label={t("Date of Birth")}
                    value={formHandler.values.dateOfBirth}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.dateOfBirth &&
                      formHandler.errors.dateOfBirth
                    }
                    errorMessage={
                      formHandler.touched.dateOfBirth &&
                      formHandler.errors.dateOfBirth
                    }
                  />
                  <Input
                    id="nationality"
                    label={t("Nationality")}
                    value={formHandler.values.nationality}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.nationality &&
                      formHandler.errors.nationality
                    }
                    errorMessage={
                      formHandler.touched.nationality &&
                      formHandler.errors.nationality
                    }
                  />
                  <Input
                    id="passportNumber"
                    label={t("Passport Number")}
                    value={formHandler.values.passportNumber}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    isInvalid={
                      formHandler.touched.passportNumber &&
                      formHandler.errors.passportNumber
                    }
                    errorMessage={
                      formHandler.touched.passportNumber &&
                      formHandler.errors.passportNumber
                    }
                  />
                </div>
                <div className="mt-4">
                  <ImagesUploader
                    files={documents}
                    setFiles={setDocuments}
                    isMultiple={true}
                    isOnly={false}
                  />
                </div>
                {apiError && <Alert text={apiError} />}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("Close")}
                </Button>
                <Button
                  isLoading={isLoading}
                  color="primary"
                  type="submit"
                  className="text-white"
                >
                  {t("Update")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
