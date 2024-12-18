import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import { cancelReservation } from "../reservation.handlers";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CancelReservation({ id, handleUpdate }) {
  const { t } = useTranslation();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState("");

  const formHandler = useFormik({
    initialValues: {
      cancelReason: "",
    },
    validationSchema: () => {
      return Yup.object({
        cancelReason: Yup.string().required(t("Required")),
      });
    },

    onSubmit: (values, { resetForm }) => {
      cancelReservation(setIsLoading, values, id, handleUpdate).then(() => {
        onClose();
        resetForm();
      });
    },
  });

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        variant="flat"
        className="font-semibold"
      >
        {t("Cancel")}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {t("Cancel_reservation")}
              </ModalHeader>
              <ModalBody>
               {t("cancel_reason")}
                <div>
                  <Textarea
                    id="cancelReason"
                    type="cancelReason"
                    label="Cancel reason"
                    placeholder="Please leave a comment with the reason of cancelation."
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    value={formHandler.values.cancelReason}
                    isInvalid={
                      formHandler.touched.cancelReason &&
                      formHandler.errors.cancelReason
                    }
                    errorMessage={t("please_reason")}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("Cancel")}
                </Button>
                <Button color="danger" type="submit" isLoading={isLoading}>
                  {t("Confirm")}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
