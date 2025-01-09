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
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../../core/components/ImageUploader/ImageUploader";
import { useState } from "react";
import { uploadImage } from "../../core/core.handlers";
import Alert from "../../core/components/Alert";
import { editService } from "../services.handlers";
import { EditIcon } from "../../core/components/icons/EditIcon";
import { useTranslation } from "react-i18next";

export default function FlightsFormEdit({ handleUpdate, flightID, data }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [flightImages, setflightImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: data?.name,
        description: data?.description,
        price: data?.price,
        margin: data?.margin,
        quantityAvailable: data?.quantityAvailable,
        savings: data?.savings,
        isOffer: data?.isOffer,
        cancellationPolicy: data?.cancellationPolicy,
      },
      flight: {
        airline: data?.flight?.airline,
        departureAddress: data?.flight?.departureAddress,
        departureCity: data?.flight?.departureCity,
        arrivalAddress: data?.flight?.arrivalAddress,
        arrivalCity: data?.flight?.arrivalCity,
        departureTime: data?.flight?.departureTime,
        arrivalTime: data?.flight?.arrivalTime,
        seatType: data?.flight?.seatType,
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
        flight: Yup.object({
          airline: Yup.string().min(3).max(60).required(t("Required")),
          departureAddress: Yup.string()
            .min(3)
            .max(250)
            .required(t("Required")),
          departureCity: Yup.string().min(3).max(60).required(t("Required")),
          arrivalAddress: Yup.string().min(3).max(250).required(t("Required")),
          arrivalCity: Yup.string().min(3).max(60).required(t("Required")),
          departureTime: Yup.string().required(t("Required")),
          arrivalTime: Yup.string().required(t("Required")),
          seatType: Yup.string().required(t("Required")),
        }),
      });
    },

    // validationSchema: () => {
    //   return Yup.object({
    //     service: Yup.object({
    //       name: Yup.string().min(5).max(500),
    //       type: Yup.string(),
    //       description: Yup.string(),
    //       price: Yup.number().max(999999).min(0),
    //       quantityAvailable: Yup.number().min(0).max(9999),
    //       savings: Yup.number(),
    //       isOffer: Yup.boolean(),
    //       cancellationPolicy: Yup.string(),
    //     }),
    //     flight: Yup.object({
    //       airline: Yup.string(),
    //       departureAddress: Yup.string(),
    //       departureCity: Yup.string(),
    //       arrivalAddress: Yup.string(),
    //       arrivalCity: Yup.string(),
    //       departureTime: Yup.string(),
    //       arrivalTime: Yup.string(),
    //       seatType: Yup.string(),
    //     }),
    //   });
    // },

    onSubmit: async (values, { resetForm }) => {
      // values = RemoveEmptyValues(values);

      if (flightImages.length !== 0) {
        const imageIds = await uploadImage(
          flightImages,
          setIsLoading,
          setApiError,
        );
        values.service.imageIds = imageIds ? imageIds : [];
      }
      values.service.WholesalerId = 1;
      await editService(
        values,
        flightID,
        setIsLoading,
        handleUpdate,
        "flights",
      );
      onClose();
      resetForm();
      // uploadImage(flightImages, setIsLoading, setApiError).then((ids) => {
      //     // Check if image is properly updated
      //   values["service"]["WholesalerId"] = 1;
      //   values["service"]["imageIds"] = ids ? ids : [];
      //
      //     // Check if values are properly updated
      //   editService(
      //     values,
      //     flightID,
      //     setIsLoading,
      //     handleUpdate,
      //     "flights",
      //   ).then(() => {
      //     onClose();
      //     resetForm();
      //   });
      // });
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
        size="5xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formHandler.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Flight Service
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
                        id="service.margin"
                        name="service.margin"
                        type="number"
                        label={t("margin")}
                        placeholder="0.00"
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("service.margin", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("service.margin", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.service?.margin}
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              $
                            </span>
                          </div>
                        }
                        isInvalid={
                          formHandler.errors.service?.margin &&
                          formHandler.touched.service?.margin
                        }
                        errorMessage={formHandler.errors.service?.margin}
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
                        label={t("Quantity Available")}
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
                        id="flight.airline"
                        name="flight.airline"
                        type="text"
                        label={t("Airline")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight?.airline}
                        isInvalid={
                          formHandler.errors.flight?.airline &&
                          formHandler.touched.flight?.airline
                        }
                        errorMessage={formHandler.errors.flight?.airline}
                      />
                    </div>
                    <div>
                      <Input
                        id="flight.seatType"
                        name="flight.seatType"
                        type="text"
                        label={t("Seat Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight?.seatType}
                        isInvalid={
                          formHandler.errors.flight?.seatType &&
                          formHandler.touched.flight?.seatType
                        }
                        errorMessage={formHandler.errors.flight?.seatType}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.departureAddress"
                        name="flight.departureAddress"
                        type="text"
                        label={t("Departure_Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureAddress}
                        isInvalid={
                          formHandler.errors.flight?.departureAddress &&
                          formHandler.touched.flight?.departureAddress
                        }
                        errorMessage={
                          formHandler.errors.flight?.departureAddress
                        }
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.departureCity"
                        name="flight.departureCity"
                        type="text"
                        label={t("Departure City")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureCity}
                        isInvalid={
                          formHandler.errors.flight?.departureCity &&
                          formHandler.touched.flight?.departureCity
                        }
                        errorMessage={formHandler.errors.flight?.departureCity}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalAddress"
                        name="flight.arrivalAddress"
                        type="text"
                        label={t("Arrival Address")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalAddress}
                        isInvalid={
                          formHandler.errors.flight?.arrivalAddress &&
                          formHandler.touched.flight?.arrivalAddress
                        }
                        errorMessage={formHandler.errors.flight?.arrivalAddress}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalCity"
                        name="flight.arrivalCity"
                        type="text"
                        label={t("Arrival City")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalCity}
                        isInvalid={
                          formHandler.errors.flight?.arrivalCity &&
                          formHandler.touched.flight?.arrivalCity
                        }
                        errorMessage={formHandler.errors.flight?.arrivalCity}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.departureTime"
                        name="flight.departureTime"
                        type="datetime-local"
                        label={t("Departure Time")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.departureTime}
                        isInvalid={
                          formHandler.errors.flight?.departureTime &&
                          formHandler.touched.flight?.departureTime
                        }
                        errorMessage={formHandler.errors.flight?.departureTime}
                      />
                    </div>

                    <div>
                      <Input
                        id="flight.arrivalTime"
                        name="flight.arrivalTime"
                        type="datetime-local"
                        label={t("Arrival Time")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight.arrivalTime}
                        isInvalid={
                          formHandler.errors.flight?.arrivalTime &&
                          formHandler.touched.flight?.arrivalTime
                        }
                        errorMessage={formHandler.errors.flight?.arrivalTime}
                      />
                    </div>

                    <div className="col-span-2">
                      <Input
                        id="service.cancellationPolicy"
                        name="service.cancellationPolicy"
                        type="text"
                        label={t("Cancelation Policy")}
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
                      <Checkbox
                        id="serviceIsOffer"
                        label={t("is_offer")}
                        onChange={formHandler.handleChange("service.isOffer")}
                        value={formHandler.values.service?.isOffer}
                        isSelected={formHandler.values.service.isOffer}
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

                    <div className="col-span-2">
                      {apiError ? <Alert text={apiError} /> : ""}
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <ImagesUploader
                    files={flightImages}
                    setFiles={setflightImages}
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
                  onclick={() => console.log("clicked")}
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
