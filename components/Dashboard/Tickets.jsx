import React, { useEffect, useState } from "react";
import generatePDF from "services/reportGenerator";

const dataSource = [ { key: 0.19777277608656285, report: { sh: "29", tds: "958", ldr: "570", ta: "81", ph: "9.30" }, }, { key: 0.8150942087462312, report: { sh: "30", tds: "881", ldr: "548", ta: "91", ph: "8.72" }, }, { key: 0.5210355778665618, report: { sh: "27", tds: "870", ldr: "592", ta: "86", ph: "11.50" }, }, { key: 0.8165505380731397, report: { sh: "28", tds: "949", ldr: "506", ta: "76", ph: "8.38" }, }, { key: 0.07374130493711961, report: { sh: "28", tds: "870", ldr: "568", ta: "96", ph: "9.52" }, }, { key: 0.4687208647341543, report: { sh: "28", tds: "913", ldr: "538", ta: "93", ph: "13.13" }, }, { key: 0.5665714778124649, report: { sh: "29", tds: "835", ldr: "571", ta: "71", ph: "11.11" }, }, { key: 0.30834060088598214, report: { sh: "28", tds: "834", ldr: "505", ta: "85", ph: "12.59" }, }, { key: 0.7151410357998422, report: { sh: "29", tds: "900", ldr: "510", ta: "91", ph: "10.93" }, }, { key: 0.13392430164420221, report: { sh: "27", tds: "878", ldr: "522", ta: "80", ph: "9.74" }, }, { key: 0.04448957640096296, report: { sh: "29", tds: "808", ldr: "562", ta: "77", ph: "15.79" }, }, { key: 0.46947968474652146, report: { sh: "27", tds: "983", ldr: "561", ta: "74", ph: "13.89" }, }, { key: 0.8939867673632909, report: { sh: "29", tds: "886", ldr: "503", ta: "98", ph: "11.72" }, }, { key: 0.9273474416398337, report: { sh: "30", tds: "941", ldr: "546", ta: "92", ph: "11.64" }, }, { key: 0.6173171154653958, report: { sh: "29", tds: "960", ldr: "510", ta: "76", ph: "12.09" }, }, ];

const Tickets = () => {
  
  const [tickets, setTickets] = useState([]);
  

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tickets");
        setTickets(response.data.tickets);
      } catch (err) {
        console.log("error");
      }
    };
    getAllTickets();
  }, []);

const reportTickets = tickets.filter(ticket => ticket.status === "completed");
  
  return (
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          {user.user.role === "user" ? (
            <> </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => generatePDF(reportTickets)}
            >
              Generate monthly report
            </button>
          )}
        </div>
      </div>
      <TicketsComponent tickets={tickets} />
    </div>
  );
};

export default Tickets;
