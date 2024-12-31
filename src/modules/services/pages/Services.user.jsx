import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiSolidPlaneAlt, BiSolidOffer } from "react-icons/bi";
import { FaCar, FaHotel, FaHouseTsunami, FaNewspaper } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";

// import { MdOutlineDirectionsBoat } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
import { getService } from "../services.handlers";
import ServicesWrapper from "../components/ServicesWrapper";
import { useTranslation } from "react-i18next";
export default function ServicesView() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState("hotels");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(">>selected", selected);
    getService(setData, setIsLoading, selected);
  }, [selected]);

  let tabs = [
    {
      id: "hotels",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "hotels" ? "text-black" : " "} `}
        >
          <FaHotel className="w-4 h-4" />
          <span>{t("Hotels")}</span>
        </div>
      ),
    },
    {
      id: "hotel-rooms",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "hotel-rooms" ? "text-black" : " "} `}
        >
          <RiHotelBedFill className="w-5 h-5" />
          <span>{t("Rooms")}</span>
        </div>
      ),
    },
    {
      id: "flights",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "flights" ? "text-black" : " "} `}
        >
          <BiSolidPlaneAlt className="w-5 h-5" />
          <span>{t("Flights")}</span>
        </div>
      ),
    },
    {
      id: "safari",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "safari" ? "text-black" : " "} `}
        >
          <FaHouseTsunami className="w-4 h-4" />
          <span>{t("Safari")}</span>
        </div>
      ),
    },
    {
      id: "transportations",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "transportations" ? "text-black" : " "} `}
        >
          <FaCar className="w-4 h-4" />
          <span>{t("Transportation")}</span>
        </div>
      ),
    },
    {
      id: "standard-packages",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "standard-packages" ? "text-black" : " "} `}
        >
          <FiPackage className="w-5 h-5" />
          <span>{t("Packages")}</span>
        </div>
      ),
    },
    {
      id: "ReadyVisa",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "ReadyVisa" ? "text-black" : " "} `}
        >
          <FaNewspaper className="w-5 h-5" />
          <span>{t("ReadyVisa")}</span>
        </div>
      ),
    },
    {
      id: "offers",
      label: (
        <div
          className={`flex items-center space-x-2  ${selected == "offers" ? "text-black" : " "} `}
        >
          <BiSolidOffer className="w-5 h-5" />
          <span>{t("Offers")}</span>
        </div>
      ),
    },
    // {
    //   id: "custom-packages",
    //   label: (
    //     <div
    //       className={`flex items-center space-x-2  ${selected == "custom-packages" ? "text-black" : " "} `}
    //     >
    //       <FiPackage className="w-5 h-5" />
    //       <span>{t("Packages")}</span>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="flex w-full flex-col m-5 mt-1 p-5 rounded-lg bg-white ">
      <Tabs
        aria-label="Services tabs"
        selectedKey={selected}
        onSelectionChange={setSelected}
        items={tabs}
        color="primary"
        variant="bordered"
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <ServicesWrapper data={data} isLoading={isLoading} type={item.id} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
