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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import { MakeTransaction } from "../Finance.handlers";
import { useLocation } from "react-router-dom";
import useAuthTokens from "../../auth/context/use-auth-tokens";
import { useTranslation } from "react-i18next";
import SingleFileUploader from "../../reservation/components/SingleFileUploader";

export default function Transactions({ handlechange }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;

  const location = useLocation();
  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  const onUpdate = () => {
    handlechange();
    onClose();
  };

  const formHandler = useFormik({
    initialValues: {
      amount: "",
      type: "",
      transactionDate: new Date().toISOString(),
      transactionTime: new Date().toISOString(),
      currency: "USD",
      fileId: [], // Initialize fileId as an empty array
    },
    validationSchema: Yup.object({
      amount: Yup.number().required(t("Required")),
      type: Yup.string().required(t("Required")),
    }),

    onSubmit: (values, { resetForm }) => {
      // Only submit if there's no file uploading in progress
      //sting the araay
      values.fileId = values.fileId[0].toString();
      if (!isUploading) {
        MakeTransaction(values, setIsLoading, id, token, onUpdate);
        resetForm();
      }
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
        {t("Add_Transactions")}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        backdrop="blur"
        size="xl"
      >
        <ModalContent>
          {() => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {t("Add_new_Transactions")}
              </ModalHeader>
              <ModalBody className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input
                    id="amount"
                    type="number"
                    label={t("Amount")}
                    min={1}
                    variant="bordered"
                    radius="lg"
                    startContent={<LuDollarSign className="mb-[1.5px]" />}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    value={formHandler.values.amount}
                  />
                  {formHandler.touched.amount && formHandler.errors.amount ? (
                    <div className="text-red-600">
                      {formHandler.errors.amount}
                    </div>
                  ) : null}
                </div>
                <div>
                  <Select
                    label={t("Type")}
                    variant="bordered"
                    id="type"
                    placeholder={t("Select type")}
                    onBlur={formHandler.handleBlur}
                    value={formHandler.values.type}
                    onChange={formHandler.handleChange("type")}
                  >
                    <SelectItem key={"withdraw"}>{t("Withdraw")}</SelectItem>
                    <SelectItem key={"deposit"}>{t("Deposit")}</SelectItem>
                  </Select>
                  {formHandler.touched.type && formHandler.errors.type ? (
                    <div className="text-red-600">
                      {formHandler.errors.type}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-3">
                  <SingleFileUploader
                    TravellerFiles={formHandler.values.fileId}
                    idx={1}
                    setIsUploading={setIsUploading}
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
                  isDisabled={isUploading} // Disable submit while uploading
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
