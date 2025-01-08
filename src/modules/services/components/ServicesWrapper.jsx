import { ClockLoader } from "react-spinners";
import FlightCard from "./FlightCard";
import ServiceCard from "./ServiceCard";
// import HotelsFilter from "../components/HotelsFilters";
import RoomCard from "./RoomCard";
import { displayByLanguage } from "../../../utils/helper";
import { useTranslation } from "react-i18next";
import VisaCard from "./VisaCard";

const ServicesWrapper = ({ data, isLoading, type }) => {
  const { i18n } = useTranslation();
  const CurrentLang = i18n.language;

  // data.arName = "test ar at hotel";
  return (
    <div className="flex flex-col  gap-4">
      {console.log(">>>>>>>>>>>>>>>>>>", data)}
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <ClockLoader color="#36d7b7" size={100} />
          </div>
        ) : type === "flights" ? (
            data.map((service) => (
            <FlightCard
                flight={service.flight}
                service={service}
              key={service.id}
                img={service.images[0]?.imageUrl}
                
            />
          ))
        ) : type === "hotel-rooms" ? (
          data.map((service) => <RoomCard key={service.id} service={service} />)
        ) : type === "ReadyVisa" ? (
          data.map((service) => <VisaCard key={service.id} service={service} />)
        ) : (
          // <HotelsFilter>
          // {
          data.map((card) => {
            // card.arname = "test this shite"

            const { id, images, stars, location, isOffer } = card;
            return (
              <ServiceCard
                isOffer={isOffer}
                type={type}
                id={id}
                key={id}
                img={images[0]?.imageUrl}
                stars={stars}
                location={location}
                hotelName={displayByLanguage(CurrentLang, "name", card)}
                // numberOfRooms={52}
                data={card}
              />
            );
          })
          // }
          // </HotelsFilter>
        )}
      </div>
      {/* <Pagination
        className="self-center"
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        page={2}
        total={50}
        variant="light"
      /> */}
    </div>
  );
};

export default ServicesWrapper;
