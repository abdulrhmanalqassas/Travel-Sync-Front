import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
function QrCodeGenerator({ url }) {
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const qrCodeRef = useRef(null);
  //TODO : for downloadQRCode
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };
  return (
    <>
      <div className="flex w-full flex-col m-5 mt-1 p-5 rounded-lg bg-white mr-2 ">
        <h1 className="text-2xl font-bold">{url} </h1>

        <div className="flex flex-col gap-4">
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-3">
            
              {generateFormInputs(validationSchema, formHandler)} */}
              <div className="qrcode__container--parent" ref={qrCodeRef}>
                {/* <input
  type="text"
  placeholder="Enter a URL"
  value={url}
  onChange={(e) =>{ handleQrCodeGenerator(); setUrl(e.target.value)}}
/> */}

                {/* <button onClick={handleQrCodeGenerator}>Generate QR Code</button> */}
              </div>
              {url !== "" && (
                <div  className="qrcode__download">
                  <div ref={qrCodeRef}  className="qrcode__image">
                    <QRCode value={url} size={90} />
                  </div>
                  <button onClick={downloadQRCode}>Download QR Code</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default QrCodeGenerator;
