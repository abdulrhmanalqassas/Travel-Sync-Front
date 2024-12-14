/* eslint-disable react/prop-types */
import { BsClock } from "react-icons/bs";
import line from "../../../assets/system/line.svg";
import { Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function FlightCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // //{
  //   "id": 3,
  //   "airline": "EgyptAir",
  //   "departureAddress": "Borg El Arab Airport",
  //   "arrivalAddress": "JFK Airport",
  //   "ar_arivalAddress": null,
  //   "departureTime": "2024-10-20T18:51:19.634Z",
  //   "arrivalTime": "2024-10-20T18:51:19.634Z",
  //   "seatType": "Economy",
  //   "ar_seatType": null,
  //   "description": null,
  //   "departureCity": "Alexandria",
  //   "ar_departureCity": null,
  //   "arrivalCity": "New York",
  //   "ar_arrivalCity": null,
  //   "createdAt": "2024-10-20T18:51:19.645Z",
  //   "updatedAt": "2024-10-20T18:51:19.645Z",
  //   "deletedAt": null,
  //   "__entity": "FlightEntity"
  // }
  const { flight, img } = props;
  console.log(">>>>>>>>flight", flight);
  // const formattedDate = formatDuration(
  //   new Date(Reservation?.updatedAt),
  //   new Date(),
  // );

  function formatDuration(startDate, endDate = null) {
    var duration = 0;
    if (startDate && endDate) {
      duration = new Date(endDate) - new Date(startDate);
    } else {
      duration = new Date() - new Date(startDate);
    }

    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return endDate
        ? new Date(endDate).toDateString()
        : new Date(startDate).toDateString();
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return `${seconds}s`;
    }
  }
  function formatDayAndTime(isoString) {
    const date = new Date(isoString);

    // Options for date formatting
    const dayOptions = { weekday: "long" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Format the day and time

    const time = date.toLocaleTimeString("en-US", timeOptions);

    return ` ${time}`;
  }

  // Example usage

  return (
    <div className="flex items-center gap-5 justify-between p-5 border-2 rounded-xl m-2 ">
      <div className="w-40  ">
        <img
          className="w-full rounded-lg object-cover object-center border-2 shadow-md m-2"
          src={img}
          alt="nature image"
        />
      </div>
      <div className="flex gap-4 ">
        <div className="flex flex-col items-center">
          <h1 className="font-semibold">{flight?.departureAddress}</h1>
          <p>{flight?.departureCity}</p>
          <p>{new Date(flight?.departureTime).toDateString()}</p>
          <p>{formatDayAndTime(flight?.departureTime)}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex gap-2 items-center">
            <BsClock width={20} />
            {/* { iwant to convert this to hours and minutes} */}
            {/* <p>{new Date(flight?.departureTime).toDateString()}</p>
            <p>{formatDayAndTime(flight?.departureTime)}</p> */}
            <p>{formatDuration(flight?.departureTime, flight?.arrivalTime)}</p>
          </div>
          <img
            className="w-full rounded-lg object-cover object-center "
            src={line}
            alt="nature image"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold">{flight?.arrivalAddress}</h1>
          <p>{flight?.arrivalCity}</p>
          <p>{new Date(flight?.arrivalTime).toDateString()}</p>
          <p>{formatDayAndTime(flight?.arrivalTime)}</p>
        </div>
      </div>
      <div
        id="right part"
        className="text-center w-1/6 flex flex-col justify-center "
      >
        <div className="mb-4">
          <h1 className="font-semibold">{flight?.price}$</h1>

          <h1>{t("Per_Flight")}</h1>
        </div>
        <Button
          onClick={() => {
            navigate(`/user/Reserve/flight/${flight?.id}`);
          }}
          className="bg-[#616CA8] text-white font-semibold"
        >
          {" "}
          {t("Reserve_Flight")}
        </Button>
      </div>
    </div>
  );
}
