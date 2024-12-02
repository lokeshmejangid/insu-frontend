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
  Typography,
} from "@mui/material";
import { getAllClient, getAllPolicies } from "../../Services/Api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { addYears } from "date-fns"; // Import for adding years to a date

import { format } from "date-fns"; // Import for date formatting

const AddEditInsu = (props) => {
  const { isEdit, handleClose, editData, handleUpdate } = props;

  const user = JSON.parse(localStorage.getItem("user"));
  const [polices, setPolicies] = useState();
  const [client, setClient] = useState();
  const [policyList, setPolicyList] = useState([]);
  const [clientList, setClientList] = useState([]);

  const [txtRegDate, setTxtRegDate] = useState(null); // Initialize state for the date
  const [txtExpDate, setTxtExpDate] = useState("");
  const [txtVehicleRegNo, setVehicleRegNo] = useState("");
  const [txtVehicleChassisNo, setVehicleChassisNo] = useState("");
  const [txtVehicleModel, setVehicleModel] = useState("");
  const [status, setStatus] = useState();
  const [uploadedDocument, setUploadedDocument] = useState(null); // State for uploaded document
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    // Fetch policy and client data
    const getPolicies = async () => {
      const result = await getAllPolicies();
      setPolicyList(result.data);
    };

    const getClient = async () => {
      const result = await getAllClient();
      setClientList(result.data);
    };

    getPolicies();
    getClient();
  }, []);

  useEffect(() => {
    if (editData !== null && editData !== undefined) {
      // Format dates to strings in "YYYY-MM-DD" format
      const formattedExpDate = format(new Date(editData[1]), "yyyy-MM-dd");
      const formattedRegDate = format(new Date(editData[4]), "yyyy-MM-dd");

      // Set the state with the formatted strings
      setTxtExpDate(formattedExpDate);
      setTxtRegDate(formattedRegDate);

      setPolicies(editData[3]);

      setClient(editData[5]);
      setVehicleRegNo(editData[6]);
      setVehicleChassisNo(editData[7]);
      setVehicleModel(editData[8]);
      setStatus(editData[9]);
    }

  }, [editData])

  useEffect(() => {
    // Calculate expiry date when txtRegDate or policy changes
    if (txtRegDate && polices) {
      const expiryDate = addYears(new Date(txtRegDate), polices.duration);
      setTxtExpDate(expiryDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    }
  }, [txtRegDate, polices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "client") {
      setClient(value);
    } else if (name === "policies") {
      setPolicies(value);
      setCost(value.cost);
      setDuration(value.duration);
    } else if (name === "txtVehicleRegNo") {
      setVehicleRegNo(value);
    } else if (name === "txtVehicleChassisNo") {
      setVehicleChassisNo(value);
    } else if (name === "txtVehicleModel") {
      setVehicleModel(value);
    }
  };

  const handleDateChange = (newDate) => {
    setTxtRegDate(newDate);
  };

  const handleSave = () => {
    const formattedExpDate = format(new Date(txtExpDate), "yyyy-MM-dd");
    const formattedRegDate = format(new Date(txtRegDate), "yyyy-MM-dd");

    const updatedData = {
      clientId: client._id,
      insurancePolicyId: polices._id,
      registrationDate: formattedRegDate,
      expiryDate: formattedExpDate,
      vehicleRegNo: txtVehicleRegNo,
      vehicleChassisNo: txtVehicleChassisNo,
      vehicleModal: txtVehicleModel,
      status: Boolean(status),
      //document: uploadedDocument,
    };
    console.log(updatedData);
    handleUpdate(updatedData);
    handleClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedDocument(file);
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
            {editData ? "Edit Insurance Info" : "Add Insurance"}
          </div>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6} container spacing={0}>
            <FormControl fullWidth>
              <InputLabel>Polices</InputLabel>
              <Select
                value={polices}
                onChange={(e) => handleChange(e)}
                name="policies"
              >
                {policyList &&
                  policyList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Grid xs={6} item>
              <Typography pt={1} pb={1}>{`Cost ${cost} rs`}</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography pt={1} pb={1}>{`Duration ${duration} yr`}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Client</InputLabel>
              <Select
                value={client}
                onChange={(e) => handleChange(e)}
                name="client"
              >
                {clientList &&
                  clientList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Registration Date"
                value={txtRegDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="txtExpDate"
              name="txtExpDate"
              label="Expiry Date"
              variant="outlined"
              fullWidth
              value={txtExpDate}
              InputProps={{
                readOnly: true, // Make the expiry date read-only
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="txtVehicleRegNo"
              name="txtVehicleRegNo"
              label="Vehicle Registration No."
              variant="outlined"
              fullWidth
              value={txtVehicleRegNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="txtVehicleChassisNo"
              name="txtVehicleChassisNo"
              label="Vehicle Chassis No"
              variant="outlined"
              fullWidth
              value={txtVehicleChassisNo}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="txtVehicleModel"
              name="txtVehicleModel"
              label="Vehicle Model"
              variant="outlined"
              fullWidth
              value={txtVehicleModel}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12} container spacing={2} mt={0}>
          <Grid item xs={12}>
            <Typography>Upload Document:</Typography>
            <input type="file" onChange={handleFileChange} />
            {uploadedDocument && (
              <Typography variant="body2" mt={1}>
                Selected File: {uploadedDocument.name}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} container justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddEditInsu;
