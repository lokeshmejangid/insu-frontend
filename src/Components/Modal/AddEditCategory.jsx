import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, MenuItem, FormControl, Select, InputLabel } from "@mui/material";

const AddEditCategory = ({ isEdit, handleClose, editData, handleUpdate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true); // Default status to true (active)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Pre-fill form when editing
  useEffect(() => {
    if (editData) {
      setName(editData[3]); // Assuming name is at index 3
      setDescription(editData[4]); // Assuming description is at index 4
      setStatus(editData[5]); // Assuming status is at index 5
    }
  }, [editData]);

  // Enable/Disable Save button based on input validity
  useEffect(() => {
    if (name.trim() && description.trim()) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [name, description]);

  // Handle status change and ensure it is a boolean
  const handleChange = (e) => {
    setStatus(e.target.value === "true"); // Convert string to boolean
  };

  const handleSave = () => {
    const updatedData = {
      name,
      status, // status will now be a boolean value
      description,
    };
    handleUpdate(updatedData);
    handleClose();
  };

  return (
    <Modal open={isEdit} onClose={handleClose}>
      <Grid container spacing={2} className="modal" style={{ padding: 20, backgroundColor: "white", borderRadius: 8 }}>
        <Grid item xs={12}>
          <h2>{editData ? "Edit Insurance Category" : "Add Insurance Category"}</h2>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status.toString()} onChange={handleChange}> {/* Convert status to string for Select component */}
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddEditCategory;
