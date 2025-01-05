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
      name: "",
      ar_name: "",
      description: "",
      ar_description: "",
      price: "",
      margin: "",
      service: {
        price: "",
        savings: "",
        margin: "",
      } || {},
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
    },
    validationSchema: () => {
      const phoneRegex = /^\+20(1[0125]\d{8})$/; // Egyptian phone number regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex

      return Yup.object({
        name: Yup.string().required(t("Required")),
        ar_name: Yup.string().required(t("Required")),
        description: Yup.string().required(t("Required")),
        ar_description: Yup.string().required(t("Required")),
        margin: Yup.number().max(999999).min(-99999).required(t("Required")),
        price: Yup.number().max(999999).min(0).required(t("Required")),
        address: Yup.string().required(t("Required")),
        stars: Yup.number().integer().required(t("Required")),
        city: Yup.string().required(t("Required")),
        state: Yup.string().required(t("Required")),
        hotel: Yup.string().required(t("Required")),
        hotelLocation: Yup.string().required(t("Required")),
        room: Yup.string().required(t("Required")),
        roomType: Yup.string(),
        trip: Yup.string(),
        tripLocation: Yup.string(),
        tripType: Yup.string(),
        transportation: Yup.string(),
        flight: Yup.string(),
        FlightsType: Yup.string(),
        flightTime: Yup.string(),
        flightAirline: Yup.string(),
      });
    },

    onSubmit: (values, { resetForm }) => {
      uploadImage(agencyImage, setIsLoading, setApiError).then((id) => {
        // Check if image is properly updated
        values["imageIds"] = id ? id : null;
        values["stars"] = Number(values["stars"]);
        addService(values, setIsLoading, handleUpdate, "packages").then(() => {
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
                        id="name"
                        type="name"
                        label={t("Name")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.name}
                      />
                      {formHandler.touched.name && formHandler.errors.name ? (
                        <div className="text-red-600">
                          {formHandler.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="ar_name"
                        type="ar_name"
                        label={t("ar_name")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_name}
                      />
                      {formHandler.touched.name && formHandler.errors.name ? (
                        <div className="text-red-600">
                          {formHandler.errors.name}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="stars"
                        // type=""
                        label={t("stars")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.stars}
                      />
                      {formHandler.touched.stars && formHandler.errors.stars ? (
                        <div className="text-red-600">
                          {formHandler.errors.stars}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="state"
                        type="state"
                        label={t("state")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.state}
                      />
                      {formHandler.touched.state && formHandler.errors.state ? (
                        <div className="text-red-600">
                          {formHandler.errors.state}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="price"
                        type="number"
                        label={t("price")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.price}
                      />
                      {formHandler.touched.price && formHandler.errors.price ? (
                        <div className="text-red-600">
                          {formHandler.errors.price}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="margin"
                        type="number"
                        label={t("Margin")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.margin}
                      />
                      {formHandler.touched.margin && formHandler.errors.margin ? (
                        <div className="text-red-600">
                          {formHandler.errors.margin}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="city"
                        type="city"
                        label={t("city")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.city}
                      />
                      {formHandler.touched.city && formHandler.errors.city ? (
                        <div className="text-red-600">
                          {formHandler.errors.city}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="address"
                        type="address"
                        label={t("address")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.address}
                      />
                      {formHandler.touched.address &&
                      formHandler.errors.address ? (
                        <div className="text-red-600">
                          {formHandler.errors.address}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="website"
                        type="website"
                        label={t("website")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.website}
                      />
                      {formHandler.touched.website &&
                      formHandler.errors.website ? (
                        <div className="text-red-600">
                          {formHandler.errors.website}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Input
                        id="description"
                        type="description"
                        label={t("Description")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.description}
                      />
                      {formHandler.touched.description &&
                      formHandler.errors.description ? (
                        <div className="text-red-600">
                          {formHandler.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="ar_description"
                        type="description"
                        label={t("ar_description")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ar_description}
                      />
                      {formHandler.touched.ar_description &&
                      formHandler.errors.ar_description ? (
                        <div className="text-red-600">
                          {formHandler.errors.description}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-span-2">
                      <Input
                        id="hotel"
                        type="hotel"
                        label={t("hotel")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.hotel}
                      />
                      {formHandler.touched.hotel && formHandler.errors.hotel ? (
                        <div className="text-red-600">
                          {formHandler.errors.hotel}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="hotelLocation"
                        type="hotelLocation"
                        label={t("hotelLocation")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.hotelLocation}
                      />
                      {formHandler.touched.hotelLocation &&
                      formHandler.errors.hotelLocation ? (
                        <div className="text-red-600">
                          {formHandler.errors.hotelLocation}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="room"
                        type="room"
                        label={t("room")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.room}
                      />
                      {formHandler.touched.room && formHandler.errors.room ? (
                        <div className="text-red-600">
                          {formHandler.errors.room}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="roomType"
                        type="roomType"
                        label={t("roomType")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.roomType}
                      />
                      {formHandler.touched.roomType &&
                      formHandler.errors.roomType ? (
                        <div className="text-red-600">
                          {formHandler.errors.roomType}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="trip"
                        type="trip"
                        label={t("trip")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.trip}
                      />
                      {formHandler.touched.trip && formHandler.errors.trip ? (
                        <div className="text-red-600">
                          {formHandler.errors.trip}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="tripLocation"
                        type="tripLocation"
                        label={t("tripLocation")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.tripLocation}
                      />
                      {formHandler.touched.tripLocation &&
                      formHandler.errors.tripLocation ? (
                        <div className="text-red-600">
                          {formHandler.errors.tripLocation}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="tripType"
                        type="tripType"
                        label={t("tripType")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.tripType}
                      />
                      {formHandler.touched.tripType &&
                      formHandler.errors.tripType ? (
                        <div className="text-red-600">
                          {formHandler.errors.tripType}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="transportation"
                        type="transportation"
                        label={t("transportation")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.transportation}
                      />
                      {formHandler.touched.transportation &&
                      formHandler.errors.transportation ? (
                        <div className="text-red-600">
                          {formHandler.errors.transportation}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="flight"
                        type="flight"
                        label={t("flight")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flight}
                      />
                      {formHandler.touched.flight &&
                      formHandler.errors.flight ? (
                        <div className="text-red-600">
                          {formHandler.errors.flight}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="FlightsType"
                        type="FlightsType"
                        label={t("FlightsType")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.FlightsType}
                      />
                      {formHandler.touched.FlightsType &&
                      formHandler.errors.FlightsType ? (
                        <div className="text-red-600">
                          {formHandler.errors.FlightsType}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="flightTime"
                        type="flightTime"
                        label={t("flightTime")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flightTime}
                      />
                      {formHandler.touched.flightTime &&
                      formHandler.errors.flightTime ? (
                        <div className="text-red-600">
                          {formHandler.errors.flightTime}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        id="flightAirline"
                        type="flightAirline"
                        label={t("flightAirline")}
                        variant="bordered"
                        labelPlacement="outside"
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.flightAirline}
                      />
                      {formHandler.touched.flightAirline &&
                      formHandler.errors.flightAirline ? (
                        <div className="text-red-600">
                          {formHandler.errors.flightAirline}
                        </div>
                      ) : null}
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
