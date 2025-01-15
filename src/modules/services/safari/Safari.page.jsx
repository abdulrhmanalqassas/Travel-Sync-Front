
// SafariPage.jsx
import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { getService } from "../services.handlers";
import { BiSolidOffer } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const SafariPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [, setIsLoading] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));
  const navigate = useNavigate();

  useEffect(() => {
    getService(setData, setIsLoading, `safari/${id}`);
  }, [id]);

  return (
    <div className="m-5 mt-1 pr-10 p-5 rounded-lg bg-white w-full">
      <ImageGallery images={data?.images || []} />
      <div className="my-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
          <Button
            onClick={() => navigate(`/user/safari/${id}`)}
            className="font-semibold bg-black text-white"
          >
            {t("Reserve_Safari")}
          </Button>
        </div>
        <div>
          <p className="flex items-center gap-2">
            {data?.isOffer ? <BiSolidOffer className="w-5 h-5" /> : null}
            {`$${(data?.price || 0) + (data?.margin || 0)}`}
          </p>
          <div className="mt-2">
            <h1 className="font-semibold">{t("About_Safari")}</h1>
            <p>{data?.description}</p>

            <br />

            <h1 className="font-semibold">{t("Safari_Details")}</h1>
            <table className="table-auto w-full mt-2">
              <tbody>
                <tr>
                  <td className="border px-4 py-2 font-semibold">{t("Type")}</td>
                  <td className="border px-4 py-2">{data?.type}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">{t("Quantity_Available")}</td>
                  <td className="border px-4 py-2">{data?.quantityAvailable}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">{t("Savings")}</td>
                  <td className="border px-4 py-2">${data?.savings}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariPage;