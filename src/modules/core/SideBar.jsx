import { useState } from "react";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import NavItem from "./components/NavItem";
import ChangeLocale from "./components/ChangeLocale";
import Logout from "../auth/components/Logout";
import { IoPeopleSharp } from "react-icons/io5";
import { SiOnlyoffice } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import { PiCurrencyDollarFill } from "react-icons/pi";
import useAuth from "../auth/context/use-auth";
import { IoHome } from "react-icons/io5";
import { RoleEnum } from "../../enums/role-enum";
import { useTranslation } from "react-i18next";

const ICON_STYLE = "flex-shrink-0 w-6 h-6 ease-in-out";

const SideBar = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState("");

  const ADMIN_ITEMS = [
    {
      title: t("Dashboard"),
      path: "/Dashboard",
      icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
    },
    {
      title: t("Visa_Applications"),
      path: "/visa/applications",
      icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
    },
    {
      title: t("Visa"),
      path: "/visa/add",
      icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
    },
    {
      title: t("Agencies"),
      path: "/Agencies",
      icon: <SiOnlyoffice className={ICON_STYLE} />,
    },
    {
      title: t("Users"),
      path: "/Users",
      icon: <IoPeopleSharp className={ICON_STYLE} />,
    },
    {
      title: t("Services"),
      path: "/Services",
      icon: <GrServices className={ICON_STYLE} />,
    },
    {
      title: t("Reservations"),
      path: "/Reservations",
      icon: <IoDocumentText className={ICON_STYLE} />,
    },
    {
      title: t("Finance"),
      path: "/Finance",
      icon: <PiCurrencyDollarFill className={ICON_STYLE} />,
    },
  ];

  const USER_ITEMS = [
    {
      title: t("Dashboard"),
      path: "/user/Home",
      icon: <IoHome className={ICON_STYLE} />,
    },
    {
      title: t("Request_Visa"),
      path: "/visa/new",
      icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
    },
    {
      title: t("Show Visa"),
      path: "/visa/show",
      icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
    },
    {
      title: t("Requested Visa"),
      path: "/user/requestedVisa",
      icon: <IoDocumentText className={ICON_STYLE} />,
    },
    {
      title: t("Finance"),
      path: "/user/Finance",
      icon: <PiCurrencyDollarFill className={ICON_STYLE} />,
    },
    {
      title: t("Reservations"),
      path: "/user/Reservations",
      icon: <IoDocumentText className={ICON_STYLE} />,
    },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <div className="bg-main h-screen col-span-2 flex flex-col justify-between text-black">
      <div>
        <header className="bg-main px-[20px] h-[80px] flex items-center justify-start gap-2 text-2xl font-bold">
          <img
            width={50}
            height={50}
            src="https://static.thenounproject.com/png/62578-200.png"
            alt="logo"
          />
          <h1 className="text-2xl">BookIt</h1>
        </header>
        <div>
          <ul className="my-2 font-medium">
            {user.role.id === RoleEnum.admin &&
              ADMIN_ITEMS.map(({ title, path, icon }, idx) => (
                <NavItem
                  title={title}
                  path={path}
                  key={idx}
                  activeItem={activeItem}
                  onItemClicked={handleItemClick}
                >
                  {icon}
                </NavItem>
              ))}
            {user.role.id === RoleEnum.travelAgent &&
              USER_ITEMS.map(({ title, path, icon }, idx) => (
                <NavItem
                  title={title}
                  path={path}
                  key={idx}
                  activeItem={activeItem}
                  onItemClicked={handleItemClick}
                >
                  {icon}
                </NavItem>
              ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-start">
          <ChangeLocale />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
