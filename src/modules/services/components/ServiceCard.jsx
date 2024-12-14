/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BiSolidOffer } from "react-icons/bi";
export default function ServiceCard({
  img,
  hotelName,
  stars,
  numberOfRooms,
  id,
  isOffer,
  type,
  locationUrl,
  data
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log("data in service card", data);
  return (
    <div className="flex justify-between gap-6 p-3 border-2 rounded-lg bg-slate-50 m-2 shadow-md">
      {console.log("type in service card", type)}
      <div className="flex  gap-6 justify-center  ">
        <div className="w-64  h-44">
          <img
            className="w-full h-full rounded-lg object-center overflow-hidden "
            src={img}
            alt="image"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">{hotelName}</h1>
          <div className="flex ">
            {Array.from({ length: stars }).map((_, index) => (
              <FaStar key={index} color="#FFCD6B" width={30} />
            ))}
            {Array.from({ length: 5 - stars }).map((_, index) => (
              <FaStar key={index} color="#F2F2F2" width={30} />
            ))}
          </div>

          {console.log("isOffer", isOffer)}
          {isOffer && (
            <div className="flex ">
              <BiSolidOffer className="w-5 h-5" />
            </div>
          )}
          <h3 className="text-[black2]">
            <span className="text-black">{numberOfRooms}</span>{" "}
            {t(`${type}_with_price`)}
          </h3>
          <h3 className="text-[black2]">
            <span className="text-black">{t(`_${type}`)}</span>{" "}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 justify-between">
            {locationUrl && (
              <div className="w-full text-[#415A77]  p-1 px-2 bg-[#f6f0f0] flex justify-center rounded-lg ">
                <a href={locationUrl} target="_blank" rel="noreferrer">
                  {t("location")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="right part"
        className="text-center w-1/6 flex flex-col justify-center "
      >
        {/* <div className="mb-4" >
                    <h1 className="font-semibold" >1500 EGP</h1>
                    <h1>Per Night</h1>
                </div> */}
        <Button
          onClick={() => {
            navigate(`/user/${type}/${id}`);
          }}
          className="bg-black text-white font-semibold"
        >
          {t(`Reserve_${type}`)}
        </Button>
      </div>
    </div>
  );
}
