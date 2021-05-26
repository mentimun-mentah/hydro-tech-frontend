import 'jspdf-autotable'
import jsPDF from 'jspdf'
import _ from 'lodash'
import moment from 'moment'

const generatePDF = tickets => {
  const doc = new jsPDF();

  const tableColumn = ["PH", "Nutrition", "Light Status", "Water Temp.", "Water Level", "Time"];
  const tableRows = [];

  tickets.forEach(ticket => {
    const ticketData = [
      ticket.ph,
      ticket.tds + ' ppm',
      _.capitalize(ticket.ldr),
      ticket.temp + '°C',
      ticket.tank + '%',
      moment(ticket.created_at).format('lll'),
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
  doc.text(`Sensor reports for ${moment().format('LLL')}`, 14, 10);
  // the name of PDF file.
  doc.save(`Sensor Report ${moment().format('LLL')}.pdf`);
};

export default generatePDF
