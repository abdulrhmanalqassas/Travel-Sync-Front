import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { getService } from "../services.handlers";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaExternalLinkAlt } from "react-icons/fa";

const HotelsPage = () => {

  const { t } = useTranslation();
  
  const [data, setData] = useState([]);
  const [hotel, setHotel] = useState({});

  const [, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  useEffect(() => {
    getService(setData, setIsLoading, `hotels/${id}/rooms`);
  }, [id]);

  useEffect(() => {
    getService(setHotel, setIsLoading, `hotels/${id}`);
  }, [id]);

  return (
    <div className="p-5 m-3 rounded-lg bg-white w-full  ">
      <ImageGallery images={hotel?.images} />
      {/* //TODO: add hotel image location */}
      <ImageGallery images={hotel?.images} /> 
        <div className="my-5">
          <div className="flex justify-between mb-3">
            <h1 className="text-2xl font-semibold">{hotel?.name}</h1>
          </div>
          <div>
            <p className="flex items-center gap-2">
          <CiLocationOn /> {hotel.city}
          <a href={hotel?.location} target="_blank" rel="noopener noreferrer">
            {t("View on map")}
            </a>
            </p>
            {hotel?.website && (
              <p className="flex items-center gap-2 mt-2">
                <FaExternalLinkAlt />
                <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                  {hotel.website}
                </a>
              </p>
            )}
            <div className="flex mt-2">
            {Array.from({ length: hotel?.stars }).map((_, index) => (
            <FaStar key={index} color="#FFCD6B" width={50} />
          ))}
          {Array.from({ length: 5 - 5 }).map((_, index) => (
            <FaStar key={index} color="#F2F2F2" width={50} />
          ))}
            </div>
            <div className="mt-2">
          <h1 className="font-semibold">{t("About Hotel")}</h1>
          <p>
            {hotel?.description}
          </p>
            </div>
          </div>
      </div>
      <div className="mt-4">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <tbody>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("State")}:</td>
              <td className="p-2 border border-gray-200">{hotel.state}</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("Zip Code")}:</td>
              <td className="p-2 border border-gray-200">{hotel.zipCode}</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("Phone Number")}:</td>
              <td className="p-2 border border-gray-200">{hotel.phoneNumber}</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("Mobile Number")}:</td>
              <td className="p-2 border border-gray-200">{hotel.mobileNumber}</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("Email")}:</td>
              <td className="p-2 border border-gray-200">{hotel.email}</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="font-semibold p-2 border border-gray-200">{t("Address")}:</td>
              <td className="p-2 border border-gray-200">{hotel.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
        <div>
          <h1 className="text-2xl font-semibold">{t("Rooms")}</h1>
          <div className="grid grid-cols-4 mt-5 gap-5 ">
            {data?.map((item, index) => (
          <div
            key={index}
            className="border-2 p-3 rounded-2xl flex flex-col gap-4"
          >
            <img
              className="rounded-2xl"
              src={item?.service?.images[0]?.imageUrl}
              alt={item?.type}
            />
            <p className="text-xl font-semibold">{item?.type}</p>
            <p className="text-sm font-semibold">
                  {item?.service?.description}
                  
            </p>
            <Button
              onClick={() => {
                  navigate(`/user/hotel-rooms/${item?.id}`);
                }}
                color="secondary"
              >
                {t("Reserve_Room")}
                  </Button>
              <div>
                <p className="text-lg font-semibold">
                  {item?.service?.price + item.service.margin} EGP
                </p>
                <p>{t("per_night")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
