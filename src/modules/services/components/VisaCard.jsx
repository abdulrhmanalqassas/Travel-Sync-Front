import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { displayByLanguage } from "../../../utils/helper";
export default function VisaCard({ service }) {
  const { t, i18n } = useTranslation();
  const CurrentLang = i18n.language;
  const navigate = useNavigate();
  const { ReadyVisa } = service;
  return (
    <div className="flex justify-between gap-6 p-3 border-2 rounded-xl m-2 ">
      <div className="flex  gap-6 justify-center  ">
        <div className="w-64  h-44">
          {console.log(">>>>>>>>>>serrrr>>>>>>>>>>>", service)}
          <img
            className="w-full h-full rounded object-center overflow-hidden "
            src={service.images[0]?.imageUrl}
            alt="nature image"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">
            {displayByLanguage(CurrentLang, "name", service)}
          </h1>
          <h2> {displayByLanguage(CurrentLang, "description", service)}</h2>
          <div className="flex gap-4">
            <div className="text-[#415A77] p-1 px-2 bg-[#f6f0f0] flex justify-center rounded-lg ">
              {t("VisaCountry")}: {ReadyVisa?.country}
            </div>
            <div className="text-[#415A77] p-1 px-2 bg-[#f6f0f0] flex justify-center rounded-lg ">
              {t("Type")}: {ReadyVisa?.type}
            </div>
          </div>
          <h3 className="text-[black2]">
            <span className="text-black">{service?.quantityAvailable}</span>{" "}
            {t("Visa")}
            {service.quantityAvailable > 1 && "s "}
          </h3>
        </div>
      </div>
      <div
        id="right part"
        className="text-center w-1/6 flex flex-col justify-center "
      >
        <div className="mb-4">
          <h1 className="font-semibold">{service?.price}$</h1>
        </div>
        <Button
          onClick={() => {
            navigate(`/user/readyvisa/${service?.id}`);
          }}
          className="bg-[#616CA8] text-white font-semibold"
        >
          {t("Reserve_Visa")}
        </Button>
      </div>
    </div>
  );
}
