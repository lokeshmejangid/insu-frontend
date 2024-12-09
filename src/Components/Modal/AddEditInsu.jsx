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
import { addYears, format } from "date-fns"; // Import for date calculations

const AddEditInsu = (props) => {
  const { isEdit, handleClose, editData, handleUpdate } = props;

  const [policyList, setPolicyList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [polices, setPolicies] = useState(null);
  const [client, setClient] = useState(null);

  const [txtRegDate, setTxtRegDate] = useState(null);
  const [txtExpDate, setTxtExpDate] = useState("");
  const [txtVehicleRegNo, setVehicleRegNo] = useState("");
  const [txtVehicleChassisNo, setVehicleChassisNo] = useState("");
  const [txtVehicleModel, setVehicleModel] = useState("");
  const [status, setStatus] = useState("");
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [cost, setCost] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    // Fetch all policies and clients
    const fetchPoliciesAndClients = async () => {
      try {
        const policyResult = await getAllPolicies();
        setPolicyList(policyResult.data || []);

        const clientResult = await getAllClient();
        setClientList(clientResult.data || []);
      } catch (error) {
        console.error("Error fetching policies or clients:", error);
      }
    };

    fetchPoliciesAndClients();
  }, []);
  useEffect(() => {
    if (editData) {
      console.log("Edit Data:", editData);

      // Format and initialize the registration date correctly
      const formattedExpDate = editData[3]
        ? format(new Date(editData[3]), "yyyy-MM-dd")
        : "";
      const formattedRegDate = editData[5]
        ? new Date(editData[5]) // Ensure it's a Date object
        : new Date(); // Default to the current date if no reg date is available

      setTxtExpDate(formattedExpDate);
      setTxtRegDate(formattedRegDate); // Store the Date object

      // Set dropdown values
      setPolicies(policyList.find((item) => item._id === editData[4]?._id) || null);
      setClient(clientList.find((item) => item._id === editData[6]?._id) || null);

      // Set other fields
      setVehicleRegNo(editData[8] || "");
      setVehicleChassisNo(editData[9] || "");
      setVehicleModel(editData[10] || "");

      // Handle status
      setStatus(editData[11]);
    }
  }, [editData, policyList, clientList]);



  useEffect(() => {
    // Calculate expiry date based on registration date and policy duration
    if (txtRegDate && polices?.duration) {
      const expiryDate = addYears(new Date(txtRegDate), polices.duration);
      setTxtExpDate(expiryDate.toISOString().split("T")[0]);
    }
  }, [txtRegDate, polices]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "client") {
      setClient(value);
    } else if (name === "policies") {
      setPolicies(value);
      setCost(value?.cost || "");
      setDuration(value?.duration || "");
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedDocument(file);
  };

  const handleSave = async () => {
    if (!client || !polices || !txtRegDate) {
      console.error("Please fill all required fields.");
      return;
    }

    const formattedExpDate = txtExpDate
      ? format(new Date(txtExpDate), "yyyy-MM-dd")
      : null;
    const formattedRegDate = txtRegDate
      ? format(new Date(txtRegDate), "yyyy-MM-dd")
      : null;

    const updatedData = {
      clientId: client._id,
      insurancePolicyId: polices._id,
      registrationDate: formattedRegDate,
      expiryDate: formattedExpDate,
      vehicleRegNo: txtVehicleRegNo,
      vehicleChassisNo: txtVehicleChassisNo,
      vehicleModal: txtVehicleModel,
      status: Boolean(status),
      document: uploadedDocument
    };

    console.log(updatedData);
    handleUpdate(updatedData);
    handleClose();
  };

  return (
    <Modal
      open={isEdit}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container spacing={2} className="modal">
        <Grid item xs={12}>
          <Typography variant="h6" className="title">
            {editData ? "Edit Insurance Info" : "Add Insurance"}
          </Typography>
        </Grid>

        <Grid item xs={6} container>
          <FormControl fullWidth>
            <InputLabel>Policies</InputLabel>
            <Select
              value={polices || ""}
              onChange={(e) => handleChange(e)}
              name="policies"
            >
              {policyList.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid item xs={6}>
            {cost && (
              <Typography mt={1}>{`Cost: ${cost} rs`}</Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            {duration && (
              <Typography mt={1}>{`Duration: ${duration} yr(s)`}</Typography>
            )}
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Client</InputLabel>
            <Select
              value={client || ""}
              onChange={(e) => handleChange(e)}
              name="client"
            >
              {clientList.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Registration Date"
              value={txtRegDate} // Ensure txtRegDate is a Date object
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
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
              readOnly: true,
            }}
          />
        </Grid>

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
            label="Vehicle Chassis No."
            variant="outlined"
            fullWidth
            value={txtVehicleChassisNo}
            onChange={handleChange}
          />
        </Grid>

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
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

        <Grid item xs={12}>
          <Typography>Upload Document:</Typography>
          <input type="file" onChange={handleFileChange} />
          {uploadedDocument && (
            <Typography variant="body2" mt={1}>
              Selected File: {uploadedDocument.name}
            </Typography>
          )}
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
