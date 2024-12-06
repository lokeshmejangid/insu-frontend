import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Button, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { getAllCetegory } from "../../Services/Api";

let category_id;
const AddEditCategory = ({ isEdit, handleClose, editData, handleUpdate }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState();
  const [cost, setCost] = useState();
  const [duration, setDuration] = useState();
  const [category, setCategory] = useState();
  const [categoryList, setCategoryList] = useState();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Pre-fill form when editing
  useEffect(() => {
    console.log(editData);
    if (editData) {
      setName(editData[2]);
      setCode(editData[1]);
      setCost(editData[3]);
      setDuration(editData[4]);
      setCategory(editData[5]);
      setDescription(editData[6]);
      setStatus(editData[9]);
    }
  }, [editData]);

  // Enable/Disable Save button based on input validity
  // useEffect(() => {
  //   if (name.length > 0 && cost.length > 0 && duration.length > 0 && category.length > 0) {
  //     setIsSaveDisabled(false);
  //   } else {
  //     setIsSaveDisabled(true);
  //   }
  // }, [name, cost, duration, category]);

  const getCetegory = async () => {
    try {
      //setLoading(true); // Start loading
      const result = await getAllCetegory();
      setCategoryList(result.data);
      //toast(result.messagge)

      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      //setLoading(false); // End loading
    }
  }

  useEffect(() => {
    // Check if data already exists in local storage
    const cachedData = localStorage.getItem("categories");
    if (cachedData) {
      // If data is available in local storage, use it
      console.log("Using cached data from local storage");
      setCategoryList(JSON.parse(cachedData)); // Parse the data and set it in state
    } else {
      getCetegory();
      console.log(category);
    }
  }, [])

  const handleSave = () => {
    const updatedData = {
      name,
      cost : Number(cost),
      duration: Number(duration),
      category_id,
      description,
      status: Boolean(status)
    };
    handleUpdate(updatedData);
    console.log(updatedData);
    handleClose();
  };

  const handleChange = (e) => {
    console.log(e);
    category_id = e.target.value._id;
    setCategory(e.target.value);
  }

  return (
    <Modal open={isEdit} onClose={handleClose}>
      <Grid container spacing={2} className="modal policies" style={{ padding: 20, backgroundColor: "white", borderRadius: 8 }}>
        <Grid item xs={12}>
          <h2>{editData ? "Edit Insurance Policies" : "Add Insurance Policies"}</h2>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="txtName"
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="txtCost"
              label="Cost"
              variant="outlined"
              fullWidth
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Duration</InputLabel>
              <Select value={duration} type="number" onChange={(e) => setDuration(e.target.value)} id="txtDuration">
                <MenuItem value="1">1 yr</MenuItem>
                <MenuItem value="2">2 yr</MenuItem>
                <MenuItem value="3">3 yr</MenuItem>
                <MenuItem value="4">4 yr</MenuItem>
                <MenuItem value="5">5 yr</MenuItem>
                <MenuItem value="10">10 yr</MenuItem>
                <MenuItem value="15">15 yr</MenuItem>
                <MenuItem value="20">20 yr</MenuItem>
                <MenuItem value="30">30 yr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => handleChange(e)}>
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

          <Grid item xs={12}>
            <TextField
              id="txtDes"
              label="Description"
              variant="outlined"
              multiline
              fullWidth
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

          </Grid>
        </Grid>

        <Grid item xs={12} container justifyContent="flex-end">
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default AddEditCategory;
