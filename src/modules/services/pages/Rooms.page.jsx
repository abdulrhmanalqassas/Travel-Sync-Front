import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { getService } from "../services.handlers";
import { BiSolidOffer } from "react-icons/bi";
import { useTranslation } from "react-i18next";
const RoomsPage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [, setIsLoading] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));
  const navigate = useNavigate();

  useEffect(() => {
    getService(setData, setIsLoading, `hotel-rooms/${id}`);
  }, [id]);

  return (
    <div className="m-5 mt-1 pr-10  p-5 rounded-lg bg-white w-full  ">
      <ImageGallery images={data?.images} />
      <div className="my-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
          <Button
            onClick={() => {
              navigate(`/user/Reserve/${id}`);
            }}
            className="font-semibold bg-black text-white"
          >
            {t("Reserve_Room")}
          </Button>
        </div>
        <div>
          <p className="flex  items-center gap-2">
            {" "}
          </p>
          <p className="flex items-center gap-2">
            {data?.isOffer ? <BiSolidOffer className="w-5 h-5" /> : null}
            {`$${data?.price + data?.margin}`}
          </p>
          <div className="mt-2">
            <h1 className="font-semibold">About room</h1>
            <p>
              {data?.description}
            </p>

            <br />

            <h1 className="font-semibold">Room Facilities</h1>

            <table className="table-auto w-full mt-2">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Number of Beds</td>
                  <td className="border px-4 py-2">{data?.room?.numberOfBeds}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Number of Sleeps</td>
                  <td className="border px-4 py-2">{data?.room?.numberOfSleeps}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Room Area</td>
                  <td className="border px-4 py-2">{data?.room?.roomArea} m²</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Type</td>
                  <td className="border px-4 py-2">{data?.room?.type}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Features</td>
                  <td className="border px-4 py-2">{data?.room?.features?.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
