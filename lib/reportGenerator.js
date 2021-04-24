import 'jspdf-autotable'
import jsPDF from 'jspdf'
import moment from 'moment'

const generatePDF = tickets => {
  const doc = new jsPDF();

  const tableColumn = ["PH", "Nutrition", "Light Intensity", "Water Temp.", "Water Level", "Time"];
  const tableRows = [];

  tickets.forEach(ticket => {
    const ticketData = [
      ticket.report.ph,
      ticket.report.tds + ' ppm',
      ticket.report.ldr + ' lux',
      ticket.report.sh + '°C',
      ticket.report.ta + '%',
      ticket.report.time,
    ];
    tableRows.push(ticketData);
  });

  const tableStyle = {
    startY: 20,
    headStyles: {
      valign: 'middle',
      halign : 'center',
      fontSize: 11,
      minCellHeight: 15,
      fillColor: '#93999E',
      textColor: '#fafafa'
    },
    bodyStyles: {
      valign: 'middle',
      halign : 'center',
      minCellHeight: 10,
      fillColor: '#ffffff'
    },
  }

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { ...tableStyle });
  // file title and margin-top + margin-left
  doc.text(`Sensor reports for ${moment().format('LLL')}`, 14, 15);
  // the name of PDF file.
  doc.save(`Sensor Report ${moment().format('LLL')}.pdf`);
};

export default generatePDF
