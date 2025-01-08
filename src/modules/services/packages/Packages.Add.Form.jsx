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
  Textarea,
  Checkbox
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
import HotelsForm from "../hotels/Hotels.Add.Form";
import FlightsTable from "../flights/Flights.Table";

export default function PackagesForm({ handleUpdate }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [agencyImage, setAgencyImage] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");

  const formHandler = useFormik({
    initialValues: {
      service: {
        name: "",
        description: "",
        price: "",
        margin: "",
        WholesalerId: 1,
        quantityAvailable: "",
        savings: "",
        isOffer: false,
        cancellationPolicy: "",
      },
      package: {
        data: {
          city: "",
          state: "",
          Hotel: "",
          hotelLocation: "",
          stars: "",
          room: "",
          roomType: "",
          trip: "",
          tripLocation: "",
          tripType: "",
          transportation: "",
          flight: "",
          FlightsType: "",
          flightTime: "",
          flightAirline: "",
        }
      }
    },
    validationSchema: () => {
      const phoneRegex = /^\+20(1[0125]\d{8})$/; // Egyptian phone number regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        // name: Yup.string().required(t("Required")),
        // ar_name: Yup.string().required(t("Required")),
        // description: Yup.string().required(t("Required")),
        // ar_description: Yup.string().required(t("Required")),
        // margin: Yup.number().max(999999).min(-99999).required(t("Required")),
        // price: Yup.number().max(999999).min(0).required(t("Required")),
        // address: Yup.string().required(t("Required")),
        // stars: Yup.number().integer().required(t("Required")),
        // city: Yup.string().required(t("Required")),
        // state: Yup.string().required(t("Required")),
        // hotel: Yup.string().required(t("Required")),
        // hotelLocation: Yup.string().required(t("Required")),
        // room: Yup.string().required(t("Required")),
        // roomType: Yup.string(),
        // trip: Yup.string(),
        // tripLocation: Yup.string(),
        // tripType: Yup.string(),
        // transportation: Yup.string(),
        // flight: Yup.string(),
        // FlightsType: Yup.string(),
        // flightTime: Yup.string(),
        // flightAirline: Yup.string(),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      let imageIds;
      if (agencyImage.length !== 0) {
        imageIds = await uploadImage(agencyImage, setIsLoading, setApiError);
        values.service.imageIds = imageIds ? imageIds : [];
      }
      values.service.imageIds = imageIds ? imageIds : [];

      values.service.WholesalerId = 1;
      // uploadImage(agencyImage, setIsLoading, setApiError).then((id) => {
      //   // Check if image is properly updated
      //   values["imageIds"] = id ? id : null;
      //   values["stars"] = Number(values["stars"]);
      //   values[]
        addService(values, setIsLoading, handleUpdate, "packages").then(() => {
          onClose();
          resetForm();
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
                {t("Add_new_Package")}
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
                        id="service.margin"
                        name="service.margin"
                        type="number"
                        label={t("Margin")}
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
                      <Input
                        id="package.data.city"
                        name="package.data.city"
                        type="text"
                        label={t("City")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package.data.city}
                        isInvalid={
                          formHandler.errors.package?.data?.city &&
                          formHandler.touched.package?.data?.city
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.city
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="package.data.state"
                        name="package.data.state"
                        type="text"
                        label={t("state")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.state}
                        isInvalid={
                          formHandler.errors.package?.data?.state &&
                          formHandler.touched.package?.data?.state
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.state
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="package.data.Hotel"
                        name="package.data.Hotel"
                        type="text"
                        label={t("Hotel")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.Hotel}
                        isInvalid={
                          formHandler.errors.package?.data?.Hotel &&
                          formHandler.touched.package?.data?.Hotel
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.Hotel
                        }
                      />
                    </div>
                    <div>
                      <Input
                        id="package.data.hotelLocation"
                        name="package.data.hotelLocation"
                        type="text"
                        label={t("hotel Location")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.hotelLocation}
                        isInvalid={
                          formHandler.errors.package?.data?.hotelLocation &&
                          formHandler.touched.package?.data?.hotelLocation
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.hotelLocation
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.stars"
                        name="package.data.stars"
                        type="number"
                        label={t("stars")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.stars}
                        isInvalid={
                          formHandler.errors.package?.data?.stars &&
                          formHandler.touched.package?.data?.stars
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.stars
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.room"
                        name="package.data.room"
                        type="text"
                        label={t("room")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.room}
                        isInvalid={
                          formHandler.errors.package?.data?.room &&
                          formHandler.touched.package?.data?.room
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.room
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.roomType"
                        name="package.data.roomType"
                        type="text"
                        label={t("roomType")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.roomType}
                        isInvalid={
                          formHandler.errors.package?.data?.roomType &&
                          formHandler.touched.package?.data?.roomType
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.roomType
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.trip"
                        name="package.data.trip"
                        type="text"
                        label={t("trip")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.trip}
                        isInvalid={
                          formHandler.errors.package?.data?.trip &&
                          formHandler.touched.package?.data?.trip
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.trip
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.tripLocation"
                        name="package.data.tripLocation"
                        type="text"
                        label={t("trip Location")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.tripLocation}
                        isInvalid={
                          formHandler.errors.package?.data?.tripLocation &&
                          formHandler.touched.package?.data?.tripLocation
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.tripLocation
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.tripType"
                        name="package.data.tripType"
                        type="text"
                        label={t("trip Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.tripType}
                        isInvalid={
                          formHandler.errors.package?.data?.tripType &&
                          formHandler.touched.package?.data?.tripType
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.tripType
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.transportation"
                        name="package.data.transportation"
                        type="text"
                        label={t("City")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.transportation}
                        isInvalid={
                          formHandler.errors.package?.data?.transportation &&
                          formHandler.touched.package?.data?.transportation
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.transportation
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.flight"
                        name="package.data.flight"
                        type="text"
                        label={t("flight")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.flight}
                        isInvalid={
                          formHandler.errors.package?.data?.flight &&
                          formHandler.touched.package?.data?.flight
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.flight
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.FlightsType"
                        name="package.data.FlightsType"
                        type="text"
                        label={t("Flights Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.FlightsType}
                        isInvalid={
                          formHandler.errors.package?.data?.FlightsType &&
                          formHandler.touched.package?.data?.FlightsType
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.FlightsType
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.flightTime"
                        name="package.data.flightTime"
                        type="text"
                        label={t("flight Time")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.flightTime}
                        isInvalid={
                          formHandler.errors.package?.data?.flightTime &&
                          formHandler.touched.package?.data?.flightTime
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.flightTime
                        }
                      />
                    </div><div>
                      <Input
                        id="package.data.flightAirline"
                        name="package.data.flightAirline"
                        type="text"
                        label={t("flight Air line")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.package?.data?.flightAirline}
                        isInvalid={
                          formHandler.errors.package?.data?.flightAirline &&
                          formHandler.touched.package?.data?.flightAirline
                        }
                        errorMessage={
                          formHandler.errors.package?.data?.flightAirline
                        }
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
