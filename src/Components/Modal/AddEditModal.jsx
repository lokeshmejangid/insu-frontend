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
import { getAllPolicies } from "../../Services/Api";

const AddEditModal = (props) => {
  const { isEdit, handleClose, editData, handleUpdate } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  const [txtClientName, setClientName] = useState("");
  const [txtPhoneNo, setPhoneNo] = useState("");
  const [status, setStatus] = useState(""); // Initializing as empty string
  const [isBtnVisible, setBtnVisible] = useState(false);
  const [policyList, setPolicyList] = useState([]);
  const [polices, setPolicies] = useState(""); // Initialize with empty string

  let userId;
  if (user !== undefined && user !== null) userId = user._id;

  useEffect(() => {
    // Fetch policy and client data
    const getPolicies = async () => {
      const result = await getAllPolicies();
      setPolicyList(result.data);
    };
    getPolicies();
  }, []);

  useEffect(() => {
    if (editData !== null && editData !== undefined) {
      console.log(editData);
      setClientName(editData[2]); // Assuming editData[2] contains the name
      setPhoneNo(editData[3]); // Assuming editData[3] contains the phone number
      setStatus(editData[4]); // Assuming editData[4] contains the status, make sure it's boolean
      setPolicies(editData[5]._id); // Assuming editData[5] is the policy object and contains _id
    }
  }, [editData]);

  useEffect(() => {
    handleBtnVisibility();
  }, [txtClientName, txtPhoneNo, status, polices]);

  const handleSave = () => {
    handleClose();
    const updatedData = {
      name: txtClientName,
      phoneNumber: txtPhoneNo,
      policy_id: polices,
      status: Boolean(status), // Ensure status is boolean
    };
    console.log(updatedData);
    handleUpdate(updatedData);
  };

  const handleBtnVisibility = () => {
    if (txtClientName.length > 0) setBtnVisible(true);
    else setBtnVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'txtClientName') {
      setClientName(value);
    } else if (name === 'txtPhoneNo') {
      setPhoneNo(value);
    } else if (name === 'policies') {
      setPolicies(value); // Store the _id of the selected policy
    } else if (name === 'status') {
      setStatus(value); // Update status based on selection
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
            {editData !== undefined ? "Edit Client Info" : "Add Client"}
          </div>
        </Grid>
        <Grid item xs={12} justifyContent={"center"}>
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
            id="txtPhoneNo"
            name="txtPhoneNo"
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="number"
            value={txtPhoneNo}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Policies</InputLabel>
            <Select
              value={polices}
              onChange={handleChange}
              name="policies"
            >
              {policyList &&
                policyList.map((item, index) => (
                  <MenuItem key={index} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              name="status"
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>
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
            disabled={!isBtnVisible}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddEditModal;
