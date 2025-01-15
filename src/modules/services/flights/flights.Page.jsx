import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { getService } from "../services.handlers";
import { BiSolidOffer } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const FlightPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [, setIsLoading] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));
  const navigate = useNavigate();

  useEffect(() => {
    getService(setData, setIsLoading, `flights/${id}`);
  }, [id]);

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="m-5 mt-1 pr-10 p-5 rounded-lg bg-white w-full">
      <ImageGallery images={data?.images || []} />
      <div className="my-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
          <Button
            onClick={() => navigate(`/user/Reserve/flight/${id}`)}
            className="font-semibold bg-black text-white"
          >
            {t("Reserve_Flight")}
          </Button>
        </div>
        <div>
          <p className="flex items-center gap-2">
            {data?.isOffer ? <BiSolidOffer className="w-5 h-5" /> : null}
            {`$${(data?.price || 0) + (data?.margin || 0)}`}
          </p>
          <div className="mt-2">
            <h1 className="font-semibold">{t("About_Flight")}</h1>
            <p>{data?.description}</p>

            <br />

            <h1 className="font-semibold">{t("Flight_Details")}</h1>
            <table className="table-auto w-full mt-2">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Airline")}
                  </td>
                  <td className="border px-4 py-2">{data?.flight?.airline}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Departure")}
                  </td>
                  <td className="border px-4 py-2">
                    {data?.flight?.departureCity} -{" "}
                    {data?.flight?.departureAddress}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Arrival")}
                  </td>
                  <td className="border px-4 py-2">
                    {data?.flight?.arrivalCity} - {data?.flight?.arrivalAddress}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Departure_Time")}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDateTime(data?.flight?.departureTime)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Arrival_Time")}
                  </td>
                  <td className="border px-4 py-2">
                    {formatDateTime(data?.flight?.arrivalTime)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Seat_Type")}
                  </td>
                  <td className="border px-4 py-2">{data?.flight?.seatType}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">
                    {t("Available_Seats")}
                  </td>
                  <td className="border px-4 py-2">
                    {data?.quantityAvailable}
                  </td>
                </tr>
                {data?.savings > 0 && (
                  <tr>
                    <td className="border px-4 py-2 font-semibold">
                      {t("Savings")}
                    </td>
                    <td className="border px-4 py-2">${data?.savings}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPage;
