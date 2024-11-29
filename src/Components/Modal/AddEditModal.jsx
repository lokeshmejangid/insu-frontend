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

const AddEditModal = (props) => {
  const { isEdit, handleClose, editData, handleUpdate } = props;
  //const { userId } = useSelector((state) => state.saveUserId);
  const user = JSON.parse(localStorage.getItem('user'));
  const [txtClientName, setClientName] = useState("");
  const [txtClientImg, setClientImg] = useState("");
  const [isBtnVisible, setBtnVisible] = useState(false);
  const [isImgValid, setImgValid] = useState(true);
  const [isImgBlur, setImgBlur] = useState(false);
  
  let userId;
  if(user !== undefined && user !== null) userId = user._id;


  useEffect(() => {
    if (editData !== null && editData !== undefined) {
      setClientName(editData[3]);
      setClientImg(editData[1]);
    }
  }, [editData]);

  useEffect(() => {
    handleBtnVisibility();
  }, [txtClientName, txtClientImg]);

  const handleSave = () => {
    handleClose();
    const updatedData = {
      clientName: txtClientName,
      clientImg: txtClientImg,
      userId: userId
    };
    handleUpdate(updatedData);
  };

  const handleBtnVisibility = () => {
    if (
      txtClientName.length > 0 &&
      txtClientImg.length > 0
    )
      setBtnVisible(true);
    else setBtnVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'txtClientName') {
      setClientName(value);
    } else if(name === 'txtClientImg'){
      const imageUrlRegex = /\.(jpeg|jpg|gif|png|bmp)$/.test(value);
      setImgValid(imageUrlRegex);
      setClientImg(value)
    }else {
      // Handle other casesll
    }

    handleBtnVisibility();
  };

  const handleBlur = () => {
    setImgBlur(true);
  }

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
            id="txtClientImg"
            name="txtClientImg"
            label="Please Add Image"
            variant="outlined"
            sx={{ mt: 1 }}
            fullWidth
            value={txtClientImg}
            autoFocus={false}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isImgBlur && (!isImgValid || txtClientImg.trim() == "")}
            helperText={
              isImgBlur &&
              ((!isImgValid && "Invalid Image URL") ||
                (txtClientImg.trim() == "" && "Image URL cannot be empty"))
            }
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

export default AddEditModal;
