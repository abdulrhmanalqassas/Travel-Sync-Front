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
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import { PlusIcon } from "../../core/components/icons/PlusIcon";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { addService } from "../services.handlers";
import { useTranslation } from "react-i18next";

export default function TransportationForm({ handleUpdate }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [transportationImages, setTransportationImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const handleCloseModal = () => {
    formHandler.resetForm();
  };

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        savings: "",
        isOffer: false,
        cancellationPolicy: "",
      },
      transportation: {
        type: "",
        description: "",
        departureAddress: "",
        arrivalAddress: "",
        departureTime: new Date().toISOString(),
        arrivalTime: new Date().toISOString(),
        departingDate: new Date().toISOString(),
        returningDate: new Date().toISOString(),
        ar_type:"",
        ar_description:"",
        ar_departureAddress:"",
        ar_arrivalAddress: ""
      },
    },

    validationSchema: () => {
      return Yup.object({
        service: Yup.object({
          name: Yup.string().min(5).max(500).required(t("Required")),
          description: Yup.string().required(t("Required")),
          price: Yup.number().max(999999).min(0).required(t("Required")),
          quantityAvailable: Yup.number()
            .min(0)
            .max(9999)
            .required(t("Required"))
            .integer("Must be a number"),
          savings: Yup.number().min(0).max(9999).required(t("Required")),
          isOffer: Yup.boolean().required(t("Required")),
          cancellationPolicy: Yup.string()
            .min(2)
            .max(500)
            .required(t("Required")),
        }),
        transportation: Yup.object({
          type: Yup.string().required(t("Required")),
          description: Yup.string().min(3).max(250).required(t("Required")),
          departureAddress: Yup.string()
            .min(3)
            .max(250)
            .required(t("Required")),
          arrivalAddress: Yup.string().min(3).max(60).required(t("Required")),
          departureTime: Yup.string(),
          arrivalTime: Yup.string(),
          departingDate: Yup.string(),
          returningDate: Yup.string(),
        }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("valuse for transportation:", values);
        let imageIds;
        if (transportationImages.length !== 0) {
          imageIds = await uploadImage(
            transportationImages,
            setIsLoading,
            setApiError,
          );
          values.service.imageIds = imageIds ? imageIds : [];
        }
        values.service.imageIds = imageIds ? imageIds : [];

        values.service.WholesalerId = 1;
        await addService(values, setIsLoading, handleUpdate, "transportations");
        onClose();
        resetForm();
      } catch (error) {
        setApiError(error.response.data?.message);
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
        {t("add_new")}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={handleCloseModal}
        isDismissable={false}
        scrollBehavior="outside"
        backdrop="blur"
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
               {t("Add_new_Transportation")}
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        id="service.name"
                        type="text"
                        name="service.name"
                        label={t("Title")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.name}
                        isInvalid={
                          formHandler.errors.service?.name &&
                          formHandler.touched.service?.name
                        }
                        errorMessage={formHandler.errors.service?.name}
                      />
                    </div>

                    <div>
                      <Textarea
                        id="service.description"
                        name="service.description"
                        type="text"
                        label={t("Description")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.description}
                        isInvalid={
                          formHandler.errors.service?.description &&
                          formHandler.touched.service?.description
                        }
                        errorMessage={formHandler.errors.service?.description}
                      />
                    </div>
                    <div>
                      <Input
                        id="service.price"
                        name="service.price"
                        type="number"
                        label={t("Price")}
                        placeholder="0.00"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("service.price", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("service.price", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service?.price}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        isInvalid={
                          formHandler.errors.service?.price &&
                          formHandler.touched.service?.price
                        }
                        errorMessage={formHandler.errors.service?.price}
                      />
                    </div>
                    <div>
                      <Input
                        id="service.savings"
                        name="service.savings"
                        type="number"
                        label={t("savings")}
                        placeholder="0.00"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("service.savings", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("service.savings", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.savings}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        isInvalid={
                          formHandler.errors.service?.savings &&
                          formHandler.touched.service?.savings
                        }
                        errorMessage={formHandler.errors.service?.savings}
                      />
                    </div>

                    <div>
                      <Input
                        id="service.quantityAvailable"
                        name="service.quantityAvailable"
                        type="number"
                        label={t("Quantity_Available")}
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue(
                              "service.quantityAvailable",
                              "",
                            );
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue(
                            "service.quantityAvailable",
                            value,
                          );
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.quantityAvailable}
                        isInvalid={
                          formHandler.errors.service?.quantityAvailable &&
                          formHandler.touched.service?.quantityAvailable
                        }
                        errorMessage={
                          formHandler.errors.service?.quantityAvailable
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="service.cancellationPolicy"
                        name="service.cancellationPolicy"
                        type="text"
                        label={t("Cancelation_Policy")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service.cancellationPolicy}
                        isInvalid={
                          formHandler.errors.service?.cancellationPolicy &&
                          formHandler.touched.service?.cancellationPolicy
                        }
                        errorMessage={
                          formHandler.errors.service?.cancellationPolicy
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.type"
                        name="transportation.type"
                        type="text"
                        label={t("Transportation_Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation?.type}
                        isInvalid={
                          formHandler.errors.transportation?.type &&
                          formHandler.touched.transportation?.type
                        }
                        errorMessage={formHandler.errors.transportation?.type}
                      />
                    </div>

                    <div>
                      <Textarea
                        id="transportation.description"
                        name="transportation.description"
                        type="text"
                        label={t("Transportation Description")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.description}
                        isInvalid={
                          formHandler.errors.transportation?.description &&
                          formHandler.touched.transportation?.description
                        }
                        errorMessage={
                          formHandler.errors.transportation?.description
                        }
                      />
                    </div>
                    <div>
                      <Textarea
                        id="transportation.ar_description"
                        name="transportation.ar_description"
                        type="text"
                        label={t("ar_Transportation_Description")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.ar_description}
                        isInvalid={
                          formHandler.errors.transportation?.ar_description &&
                          formHandler.touched.transportation?.ar_description
                        }
                        errorMessage={
                          formHandler.errors.transportation?.ar_description
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departureAddress"
                        name="transportation.departureAddress"
                        type="text"
                        label={t("Departure_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={
                          formHandler.values.transportation.departureAddress
                        }
                        isInvalid={
                          formHandler.errors.transportation?.departureAddress &&
                          formHandler.touched.transportation?.departureAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.arrivalAddress"
                        name="transportation.arrivalAddress"
                        type="text"
                        label={t("Arrival_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.arrivalAddress}
                        isInvalid={
                          formHandler.errors.transportation?.arrivalAddress &&
                          formHandler.touched.transportation?.arrivalAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.arrivalAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.ar_departureAddress"
                        name="transportation.ar_departureAddress"
                        type="text"
                        label={t("ar_Departure_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={
                          formHandler.values.transportation.ar_departureAddress
                        }
                        isInvalid={
                          formHandler.errors.transportation?.ar_departureAddress &&
                          formHandler.touched.transportation?.ar_departureAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.ar_departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.ar_arrivalAddress"
                        name="transportation.ar_arrivalAddress"
                        type="text"
                        label={t("ar_Arrival_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.ar_arrivalAddress}
                        isInvalid={
                          formHandler.errors.transportation?.ar_arrivalAddress &&
                          formHandler.touched.transportation?.ar_arrivalAddress
                        }
                        errorMessage={
                          formHandler.errors.transportation?.ar_arrivalAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departureTime"
                        name="transportation.departureTime"
                        type="text"
                        label={t("Departure_Time")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.departureTime}
                        isInvalid={
                          formHandler.errors.transportation?.departureTime &&
                          formHandler.touched.transportation?.departureTime
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departureTime
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.arrivalTime"
                        name="transportation.arrivalTime"
                        type="text"
                        label={t("Arrival Time")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.arrivalTime}
                        isInvalid={
                          formHandler.errors.transportation?.arrivalTime &&
                          formHandler.touched.transportation?.arrivalTime
                        }
                        errorMessage={
                          formHandler.errors.transportation?.arrivalTime
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="transportation.departingDate"
                        name="transportation.departingDate"
                        type="text"
                        label={t("Departing_Date")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.departingDate}
                        isInvalid={
                          formHandler.errors.transportation?.departingDate &&
                          formHandler.touched.transportation?.departingDate
                        }
                        errorMessage={
                          formHandler.errors.transportation?.departingDate
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="transportation.returningDate"
                        name="transportation.returningDate"
                        type="text"
                        label={t("returningDate")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation.returningDate}
                        isInvalid={
                          formHandler.errors.transportation?.returningDate &&
                          formHandler.touched.transportation?.returningDate
                        }
                        errorMessage={
                          formHandler.errors.transportation?.returningDate
                        }
                      />
                    </div>

                    <div>
                      <Checkbox
                        id="serviceIsOffer"
                        name="service.isOffer"
                        label={t("is_offer")}
                        onChange={formHandler.handleChange("service.isOffer")}
                        value={formHandler.values.service?.isOffer}
                        isInvalid={
                          formHandler.errors.service?.isOffer &&
                          formHandler.touched.service?.isOffer
                        }
                        errorMessage={formHandler.errors.service?.isOffer}
                      >
                        {t("is_offer")}
                      </Checkbox>
                    </div>

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={transportationImages}
                    setFiles={setTransportationImages}
                    isMultiple={true}
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
