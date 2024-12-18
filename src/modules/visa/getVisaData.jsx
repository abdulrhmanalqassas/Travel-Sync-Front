import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVisa, getVisaByImg } from "./visa.handlers";
import { capitalize } from "../users/utils";
const GetVisaData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { type, country } = useParams();

  useEffect(() => {
    if (type === "img") {
      getVisaByImg(country.toUpperCase(), setData, setIsLoading);
    } else {
      getVisa(country.toUpperCase(), setData, setIsLoading);
    }
  }, []);
  return (
    <div className={`bg-[#edf2f6] w-screen flex `}>
      <div className="flex flex-col w-full">
        <div className="h-[calc(100vh-81.5px)] overflow-scroll overflow-x-hidden">
          <div className="m-5 mt-1 p-5 rounded-lg bg-white flex flex-col justify-center">
            <h1 className="text-2xl font-bold">{country} </h1>
            <h1 className="text-2xl font-bold">{type} </h1>

            {JSON.stringify(data)}
            {type == "text" && (
              <div>
                {" "}
                {Object.entries(data.requirements).map(([key, value]) => (
                  <h1 key={key}>{`${key}: ${value}`}</h1>
                ))}{" "}
              </div>
            )}
            {type === "img" && (
              <div className="flex flex-col gap-2">
            {/* {  data.images.map((image) => (
                  <img src={image.image
                  \Url} alt={image.imageUrl} key={image.id} />
                ))} */}
                {data.images.map((image) => ( <img className="w-1/4 h-1/4 object-cover" key={image.id} src={image.imageUrl} alt="Gallery" /> ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* hello world */}
    </div>
  );
};

export default GetVisaData;
