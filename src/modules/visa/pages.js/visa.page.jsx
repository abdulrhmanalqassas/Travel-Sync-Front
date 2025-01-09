import { useEffect, useState } from "react";
import { ImageGallery } from "../../services/components/ImageGallery";
import { Button } from "@nextui-org/react";

import { useLocation, useNavigate } from "react-router-dom";
import { getService } from "../../services/services.handlers";
import { useTranslation } from "react-i18next";
const VisaViewPage = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [, setIsLoading] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));
  const navigate = useNavigate();

  useEffect(() => {
    getService(setData, setIsLoading, `ReadyVisa/${id}`);
  }, [id]);

  return (
    <div className="m-5 mt-1 pr-10  p-5 rounded-lg bg-white w-full  ">
      {data?.images?.length > 0 && <ImageGallery images={data?.images} />}
      <div className="my-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
          <Button
            onClick={() => {
              navigate(`/user/Reserve/visa/${id}`);
            }}
            className="font-semibold bg-black text-white"
          >
            {t("Reserve_visa")}
          </Button>
        </div>
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold"></h1>
          <p><strong>{`${t("total price")}: ${data?.price + data?.margin}$`}</strong> </p>
        </div>
        <div>
          <p className="flex  items-center gap-2"> </p>
          <div className="dddmt-2">
            <h1 className="font-semibold">{t("About_Visa")} </h1>
            <p>{data?.description}</p>
            <h1 className="text-lg font-semibold">{data?.type}</h1>
            <h1 className="text-lg font-semibold">
              {data?.ReadyVisa?.country}
            </h1>
          </div>
          <div>
            <h1 className="font-semibold">{t("Visa Requirements")}</h1>
            <table className="table-auto w-full mt-5">
              
              <tbody>
                {Object.entries(data?.ReadyVisa || {})
                  .filter(([key]) => !["createdAt", "updatedAt", "deletedAt", "__entity", "description", "id", "name", "ar_description", "ar_name"].includes(key))
                  .map(([key, value]) => (
                    <tr key={t(key)}>
                      <td className="border px-4 py-2">{t(key)}</td>
                      <td className="border px-4 py-2">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaViewPage;
