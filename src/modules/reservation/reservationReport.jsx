import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getAllReservations } from "./reservation.handlers";
import useAuthTokens from "../auth/context/use-auth-tokens";
import useAuth from "../auth/context/use-auth";
import "jspdf-autotable";
const PDFReport = () => {
  const [reservations, setReservations] = useState({ data: [], count: {} });
  const [isLoading, setIsLoading] = useState(false);
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;
  const { user, isLoaded } = useAuth();
  useEffect(() => {
    // Fetch data when the component mounts
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    await getAllReservations(
      setReservations,
      setIsLoading,
      "confirmed",
      1,
      10,
      {},
      {},
      token,
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const columns = [
      { header: "ID", dataKey: "id" },
      { header: "Quantity", dataKey: "quantity" },
      { header: "Status", dataKey: "status" },
      { header: "Check-In Date", dataKey: "checkInDate" },
      { header: "Total Price", dataKey: "totalPrice" },
      { header: "Travel Office", dataKey: "travelOffice" },
      { header: "Service", dataKey: "service" },
    ];
    // const input = document.getElementById("report-table");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const imgWidth = 210; // A4 width in mm
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    //   pdf.save("report.pdf");
    // });
    const rows = reservations.data.map((reservation) => ({
      id: reservation.id,
      quantity: reservation.quantity,
      status: reservation.status,
      checkInDate: new Date(reservation.checkInDate).toLocaleDateString(),
      totalPrice: reservation.totalPrice,
      travelOffice: reservation.travelOffice.name,
      service: reservation.service ? reservation.service.name : "N/A",
    }));

    // Add table to the PDF
    doc.autoTable({
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    });
    // Save the PDF
    doc.save("reservations-report.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF} disabled={isLoading}>
        {isLoading ? "Loading..." : "Generate PDF"}
      </button>
      {/* <div id="report-table">
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Check-In Date</th>
              <th>Total Price</th>
              <th>Travel Office</th>
              <th>Service</th>
            </tr>
          </thead>
          <tbody>
            {reservations.data.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.quantity}</td>
                <td>{reservation.status}</td>
                <td>
                  {new Date(reservation.checkInDate).toLocaleDateString()}
                </td>
                <td>{reservation.totalPrice}</td>
                <td>{reservation.travelOffice.name}</td>
                <td>
                  {reservation.service ? reservation.service.name : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default PDFReport;
