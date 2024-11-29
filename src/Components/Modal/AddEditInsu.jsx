import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import {
  Grid,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const AddEditInsu = (props) => {
  const { isEdit, handleClose, editData, handleUpdate } = props;
  //const { userId } = useSelector((state) => state.saveUserId);
  const user = JSON.parse(localStorage.getItem('user'));
  const [txtClientName, setClientName] = useState("");
  const [txtRefCode, setRefCode] = useState("");
  const [txtRegDate, setRegDate] = useState("");
  const [txtVehicleReg, setVehicleReg] = useState("");

  const [isBtnVisible, setBtnVisible] = useState(false);

  
  let userId;
  if(user !== undefined && user !== null) userId = user._id;


  useEffect(() => {
    if (editData !== null && editData !== undefined) {
      setRefCode(editData[2]);
      setRegDate(editData[1]);
      setVehicleReg(editData[3]);
      setClientName(editData[4]);
    }
  }, [editData]);

  useEffect(() => {
    handleBtnVisibility();
  }, [txtClientName, txtRefCode, txtRegDate, setClientName]);

  const handleSave = () => {
    handleClose();
    const updatedData = {
      refCode: txtRefCode,
      regDate: txtRegDate,
      vehicleReg: txtVehicleReg,
      clientName: txtClientName,
      userId: userId
    };
    handleUpdate(updatedData);
  };

  const handleBtnVisibility = () => {
    if (
      txtClientName.length > 0 && 
      txtRefCode.length > 0 && 
      txtRegDate.length > 0 && 
      txtVehicleReg.length > 0 
    )
      setBtnVisible(true);
    else setBtnVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'txtClientName') {
      setClientName(value);
    }else if (name === 'txtRefCode') {
      setRefCode(value);
    }else if (name === 'txtRegDate') {
      setRegDate(value);
    }else if (name === 'txtVehicleReg') {
      setVehicleReg(value);
    } else {
      // Handle other casesll
    }

    handleBtnVisibility();
  };

  return (
    <Modal
      open={isEdit}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container spacing={0} className="modal">
        <Grid item xs={12}>
          <div className="title">
            {editData !== undefined ? "Edit Insurance Info" : "Add Insurance"}
          </div>
        </Grid>
        <Grid item xs={12} justifyContent={"center"}>
          <TextField
            id="txtRegDate"
            name="txtRegDate"
            label="Registered Date"
            variant="outlined"
            fullWidth
            value={txtRegDate}
            onChange={handleChange}
          />
          <TextField
            id="txtRefCode"
            name="txtRefCode"
            label="Ref Code"
            variant="outlined"
            fullWidth
            value={txtRefCode}
            onChange={handleChange}
          />
          <TextField
            id="txtClientName"
            name="txtClientName"
            label="Client Name"
            variant="outlined"
            fullWidth
            value={txtClientName}
            onChange={handleChange}
          />
          <TextField
            id="txtVehicleReg"
            name="txtVehicleReg"
            label="Vehicle Registertion"
            variant="outlined"
            fullWidth
            value={txtVehicleReg}
            onChange={handleChange}
          />

        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={0}
          justifyContent={"center"}
          mt={2}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isBtnVisible ? false : true}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddEditInsu;
