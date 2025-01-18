import {
  Avatar,
  Skeleton,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import { LuBellRing as Bell } from "react-icons/lu";
import useAuth from "../auth/context/use-auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { instance } from "../../network/axios";
import Cookies from "js-cookie";
import { RoleEnum } from "../../enums/role-enum";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { user, isLoaded } = useAuth();
  const language = i18n.language;
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const cookie = Cookies.get("auth-token-data");
    const token = JSON.parse(cookie ? cookie : "null")?.token;

    try {
      const { data } = await instance.get("/api/v1/notification", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t("minutes_ago")}`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${t("hours_ago")}`;
    } else {
      return `${diffInDays} ${t("days_ago")}`;
    }
  };

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let formattedDay;
    if (day === 1 || day === 21 || day === 31) {
      formattedDay = `${day}st`;
    } else if (day === 2 || day === 22) {
      formattedDay = `${day}nd`;
    } else if (day === 3 || day === 23) {
      formattedDay = `${day}rd`;
    } else {
      formattedDay = `${day}th`;
    }

    return `${formattedDay}, ${month} ${year}`;
  };

  const formatDateInArabic = () => {
    const date = new Date();
    const day = date.toLocaleString("ar-EG", { day: "numeric" });
    const month = date.toLocaleString("ar-EG", { month: "long" });
    const year = date.toLocaleString("ar-EG", { year: "numeric" });
    return `${day} ${month} ${year}`;
  };

  const formattedDate = language === "ar" ? formatDateInArabic() : formatDate();
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const markAsRead = async (notificationId) => {
    const cookie = Cookies.get("auth-token-data");
    const token = JSON.parse(cookie ? cookie : "null")?.token;

    try {
      await instance.patch(
        `/api/v1/notification/read/${notificationId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Refresh notifications after marking as read
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };
  // i want ot to open this if it is a user accounrt /user/ReservationUser/{id}  and thios if it is an admin account http://localhost:4173/Reservation/{id}
  return (
    <div className="h-[80px] bg-second flex items-center justify-between px-5">
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-bold">
          {t("Welcome")}, {user.firstName}{" "}
        </h1>
        <h3 className="text-small text-[#8f9191]">
          {t("Today_is") + " "}
          {formattedDate}
        </h3>
      </div>

      <div className="flex items-center gap-4">
        <Dropdown>
          <DropdownTrigger>
            <div className="cursor-pointer relative">
              <Bell className="h-6 w-6 text-[#8f9191]" />
              {unreadCount > 0 && (
                <Badge
                  content={unreadCount}
                  color="danger"
                  size="sm"
                  className="absolute -top-2 -right-2"
                />
              )}
            </div>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Notifications"
            className="w-80"
            items={notifications}
          >
            {isLoading ? (
              <DropdownItem>
                <Skeleton className="h-8 w-full rounded-lg" />
              </DropdownItem>
            ) : notifications.length === 0 ? (
              <DropdownItem>
                <p className="text-center text-gray-500">
                  {t("no_notifications")}
                </p>
              </DropdownItem>
            ) : (
              notifications.map((notification) => (
                <DropdownItem
                  key={notification.id}
                  className={`py-2 ${!notification.isRead ? "bg-blue-50" : ""}`}
                  onClick={() => {
                    !notification.isRead && markAsRead(notification.id);
                    user.role.id === RoleEnum.admin
                      ? navigate(`/reservation/${notification.reservation.id}`)
                      : navigate(
                          `/user/reservationUser/${notification.reservation.id}`,
                        );
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">
                        {t("reservation_id")}: {notification.reservation.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                    </div>
                  </div>
                </DropdownItem>
              ))
            )}
          </DropdownMenu>
        </Dropdown>

        {isLoaded ? (
          <div className="flex gap-5">
            <Avatar
              radius="full"
              isBordered
              size="md"
              src={user && user.profilePhoto.imageUrl}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-base font-semibold leading-none text-[#3e4740]">
                {user?.firstName} {user?.lastName}
              </h4>
              <h5 className="text-small text-[#8f9191]">{user?.email}</h5>
            </div>
          </div>
        ) : (
          <div className="max-w-[300px] w-full flex items-center gap-3">
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
