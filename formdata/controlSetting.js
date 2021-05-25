// ws.send("kind:set_hydro,lamp:off,phup:off,phdown:off,nutrition:off,solenoid:off,ph_max:8.0,ph_min:3.0,tds_min:650,ph_cal:0.45,tds_cal:127.28,tank_height:600,tank_min:200")

export const formSetting = {
  ph_max: { value: "0", isValid: true, message: null },
  ph_min: { value: "0", isValid: true, message: null },
  tds_min: { value: "0", isValid: true, message: null },
  ph_cal: { value: "0", isValid: true, message: null },
  tds_cal: { value: "0", isValid: true, message: null },
  tank_height: { value: "0", isValid: true, message: null },
  tank_min: { value: "0", isValid: true, message: null },
}

export const formSettingIsValid = (state, setState) => {
  const ph_max = { ...state.ph_max }
  const ph_min = { ...state.ph_min }
  const tds_min = { ...state.tds_min }
  const ph_cal = { ...state.ph_cal }
  const tds_cal = { ...state.tds_cal }
  const tank_height = { ...state.tank_height }
  const tank_min = { ...state.tank_min}
  let isGood = true

  if(+ph_max.value < 0 || +ph_max.value > 20){
    isGood = false;
    ph_max.isValid = false;
    ph_max.message = "Ensure this value is between 0 - 20";
  }

  if(+ph_min.value < 0 || +ph_min.value > 20){
    isGood = false;
    ph_min.isValid = false;
    ph_min.message = "Ensure this value is between 0 - 20";
  }

  if(+tds_min.value < 0 || +tds_min.value > 3000){
    isGood = false;
    tds_min.isValid = false;
    tds_min.message = "Ensure this value is between 0 - 3000";
  }

  if(+ph_cal.value < 0 || +ph_cal.value > 10000){
    isGood = false;
    ph_cal.isValid = false;
    ph_cal.message = "Ensure this value is between 0 - 10000";
  }

  if(+tds_cal.value < 0 || +tds_cal.value > 10000){
    isGood = false;
    tds_cal.isValid = false;
    tds_cal.message = "Ensure this value is between 0 - 10000";
  }

  if(+tank_height.value < 0 || +tank_height.value > 1000000){
    isGood = false;
    tank_height.isValid = false;
    tank_height.message = "Ensure this value is between 0 - 1000000";
  }

  if(+tank_min.value < 0 || +tank_min.value > 1000000){
    isGood = false;
    tank_min.isValid = false;
    tank_min.message = "Ensure this value is between 0 - 1000000";
  }

  if(!isGood) setState({ ...state, ph_max, ph_min, tds_min, ph_cal, tds_cal, tank_height, tank_min })

  return isGood
}


export const formServo = {
  servo_horizontal: { value: "90", isValid: true, message: null },
  servo_vertical: { value: "90", isValid: true, message: null }
}

export const formServoIsValid = (state, setState) => {
  const servo_horizontal = { ...state.servo_horizontal }
  const servo_vertical = { ...state.servo_vertical }
  let isGood = true

  if(+servo_horizontal.value < 0 || +servo_horizontal.value > 180){
    isGood = false;
    servo_horizontal.isValid = false;
    servo_horizontal.message = "Ensure this value is between 0 - 180";
  }

  if(+servo_vertical.value < 0 || +servo_vertical.value > 180){
    isGood = false;
    servo_vertical.isValid = false;
    servo_vertical.message = "Ensure this value is between 0 - 180";
  }

  if(!isGood) setState({ ...state, servo_horizontal, servo_vertical })

  return isGood
}
