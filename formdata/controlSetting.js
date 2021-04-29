    // ws.send("kind:set_hydro,lamp:off,phup:off,phdown:off,nutrition:off,solenoid:off,phmax:8.0,phmin:3.0,tdsmin:650,phcal:0.45,tdscal:127.28,tankheight:600,tankmin:200")
//
export const formSetting = {
  lamp: { value: "off", isValid: true, message: null },
  phup: { value: "off", isValid: true, message: null },
  phdown: { value: "off", isValid: true, message: null },
  nutrition: { value: "off", isValid: true, message: null },
  solenoid: { value: "off", isValid: true, message: null },
  phmax: { value: "0", isValid: true, message: null },
  phmin: { value: "0", isValid: true, message: null },
  tdsmin: { value: "0", isValid: true, message: null },
  phcal: { value: "0", isValid: true, message: null },
  tdscal: { value: "0", isValid: true, message: null },
  tankheight: { value: "0", isValid: true, message: null },
  tankmin: { value: "0", isValid: true, message: null },
}
