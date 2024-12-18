import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { acceptReservation } from "../reservation.handlers";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AcceptReservation({ id, handleUpdate }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState("");
  const { t } = useTranslation();
  return (
    <>
      <Button
        onPress={onOpen}
        color="success"
        className="text-white font-semibold"
      >
        Accept
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("accept_reservation")}
              </ModalHeader>
              <ModalBody>{t("confirm_this_reservation")}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {t("close")}
                </Button>
                <Button
                  color="success"
                  className="text-white"
                  isLoading={isLoading}
                  onPress={() => {
                    acceptReservation(setIsLoading, id, handleUpdate).then(
                      () => {
                        onClose();
                      },
                    );
                  }}
                >
                  {t("accept")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
