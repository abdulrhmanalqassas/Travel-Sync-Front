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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { PlusIcon } from "../core/components/icons/PlusIcon.jsx";
import * as Yup from "yup"; // For validation.
import { useFormik } from "formik";
import ImagesUploader from "../core/components/ImageUploader/ImageUploader";
import { useEffect, useState } from "react";
import { uploadImage } from "../core/core.handlers";
import Alert from "../core/components/Alert";
import { addService, getService } from "../services/services.handlers.js";
import { useTranslation } from "react-i18next";
import CountrySelector from "../core/components/countrySelector.jsx";
import { COUNTRIES } from "../core/components/countries.js";
const initialValues = [
  { key: "dog", label: "Dog" },
  { key: "cat", label: "Cat" },
  { key: "bird", label: "Bird" },
  { key: "fish", label: "Fish" },
];
export default function VisaForm({ handleUpdate }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [roomImages, setRoomImages] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [apiError, setApiError] = useState("");
  const [roomFeatures, setRoomFeatures] = useState(initialValues);
  const [customFeature, setCustomFeature] = useState({ name: "", ar_name: "" });
  const [customFeatureVisible, setCustomFeatureVisible] = useState(false);
  const [country, setCountry] = useState("AF");
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const handleCloseModal = () => {
    formHandler.resetForm();
  };
  const x = (selectedKeys) => {
    const selectedValues = Array.from(selectedKeys.target.value.split(","));
    formHandler.setFieldValue("ReadyVisa.roomFeatures", selectedValues);
  };
  const handleSelectChange = (selectedKeys) => {
    if (
      Array.from(selectedKeys.target.value.split(",")).includes("add_custom")
    ) {
      setCustomFeatureVisible(true);
    } else {
      setCustomFeatureVisible(false);
      const selectedValues = Array.from(selectedKeys.target.value.split(","));

      formHandler.setFieldValue("ReadyVisa.roomFeatures", selectedValues);
    }
  };
  const handleAddCustomFeature = () => {
    if (customFeature.name.trim() && customFeature.ar_name.trim()) {
      setRoomFeatures((prevState) => [
        ...prevState,
        { key: customFeature.name, label: customFeature.ar_name },
      ]);
      // formHandler.setFieldValue("room.roomFeatures", [
      //   ...formHandler.values.room.roomFeatures,
      //   { ...customFeature },
      // ]);
      setCustomFeature({ name: "", ar_name: "" });
      setCustomFeatureVisible(false);
    }
  };
  const formHandler = useFormik({
    initialValues: {
      service: {
        WholesalerId: 1,
        isCharter: true,
        charterAtQuantity: 5,
        charterSalePercentage: 0,
        name: "",
        description: "",
        price: "",
        quantityAvailable: "",
        savings: "",
        isOffer: false,
        cancellationPolicy: "",
      },
      ReadyVisa: {
        name: "Schengen",
        ar_name: "شنغن",
        description: "Schengen visa",
        ar_description: "تأشيرة شنغن",
        type: "Tourist",
        visaType: "single",
        days: 1,
        country: country,
        imageIds: [],
      },
    },

    validationSchema: () => {
      return Yup.object({
        // service: Yup.object({
        //   name: Yup.string().min(5).max(500).required(t("Required")),
        //   description: Yup.string().required(t("Required")),
        //   price: Yup.number().max(999999).min(0).required(t("Required")),
        //   quantityAvailable: Yup.number()
        //     .min(0)
        //     .max(9999)
        //     .required(t("Required"))
        //     .integer("Must be a number"),
        //   savings: Yup.number().min(0).max(9999).required(t("Required")),
        //   isOffer: Yup.boolean().required(t("Required")),
        //   cancellationPolicy: Yup.string()
        //     .min(2)
        //     .max(500)
        //     .required(t("Required")),
        // }),
        // ReadyVisa: Yup.object({
        //   type: Yup.string().required(t("Required")),
        //   days: Yup.number().min(0).max(9999).required(t("Required")),
        //   numberOfBeds: Yup.number().min(0).max(9999).required(t("Required")),
        //   numberOfSleeps: Yup.number().min(0).max(9999).required(t("Required")),
        //   // hotelId: Yup.number().required(t("Required")),
        //   roomFeatures: Yup.array().required(t("Required")),
        // }),
      });
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        let imageIds;
        if (roomImages.length !== 0) {
          imageIds = await uploadImage(roomImages, setIsLoading, setApiError);
          values.service.imageIds = imageIds ? imageIds : [];
        }
        values.service.imageIds = imageIds ? imageIds : [];

        values.service.WholesalerId = 1;
        await addService(values, setIsLoading, handleUpdate, "ReadyVisa");
        onClose();
        resetForm();
      } catch (error) {
        setApiError(error.response.data?.message);
      }
    },
  });
  const handleNameChange = (event) => {
    const newName = event.target.value;
    formHandler.setValues((prevValues) => ({
      ...prevValues,
      service: { ...prevValues.service, name: newName },
      ReadyVisa: { ...prevValues.ReadyVisa, name: newName },
    }));
  };
  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    formHandler.setValues((prevValues) => ({
      ...prevValues,
      service: { ...prevValues.service, description: newDescription },
      ReadyVisa: { ...prevValues.ReadyVisa, description: newDescription },
    }));
  };
  return (
    <div className="flex flex-col gap-2">
      <Button
        className="bg-foreground text-background"
        onPress={onOpen}
        endContent={<PlusIcon />}
        size="sm"
      >
        {t("add_new_readyVisa")}
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
                {t("Add_Visa")}
              </ModalHeader>
              <ModalBody className="flex flex-row items-center">
                <div className="w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    <CountrySelector
                      id="countries"
                      open={isSelectorOpen}
                      onToggle={() => setIsSelectorOpen(!isSelectorOpen)}
                      onChange={(val) => setCountry(val)}
                      selectedValue={COUNTRIES.find(
                        (option) => option.value === country,
                      )}
                    />

                    <div>
                      <Input
                        id="service.name"
                        type="text"
                        name="service.name"
                        label={t("Title")}
                        radius="lg"
                        onChange={handleNameChange}
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
                        onChange={handleDescriptionChange}
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
                        id="ReadyVisa.type"
                        name="ReadyVisa.type"
                        type="text"
                        label={t("Visa Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values?.ReadyVisa?.type}
                        isInvalid={
                          formHandler.errors?.ReadyVisa?.type &&
                          formHandler.touched?.ReadyVisa?.type
                        }
                        errorMessage={formHandler?.errors?.ReadyVisa?.type}
                      />
                    </div>
                    <div>
                      <Input
                        id="ReadyVisa.visaType"
                        name="ReadyVisa.visaType"
                        type="text"
                        label={t("Visa Type")}
                        radius="lg"
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values?.ReadyVisa?.visaType}
                        isInvalid={
                          formHandler.errors?.ReadyVisa?.visaType &&
                          formHandler.touched?.ReadyVisa?.visaType
                        }
                        errorMessage={formHandler?.errors?.ReadyVisa?.visaType}
                      />
                    </div>
                    <div>
                      <Input
                        id="ReadyVisa.days"
                        name="ReadyVisa.days"
                        type="number"
                        label={t("visa_days")}
                        radius="lg"
                        onChange={(e) => {
                          if (e.target.value === "") {
                            formHandler.setFieldValue("ReadyVisa.days", "");
                            return;
                          }

                          const value = Math.max(0, parseFloat(e.target.value));
                          formHandler.setFieldValue("ReadyVisa.days", value);
                        }}
                        onBlur={formHandler.handleBlur}
                        value={formHandler.values.ReadyVisa?.days}
                        isInvalid={
                          formHandler.errors.ReadyVisa?.days &&
                          formHandler.touched.ReadyVisa?.days
                        }
                        errorMessage={formHandler.errors.ReadyVisa?.days}
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
                    files={roomImages}
                    setFiles={setRoomImages}
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
