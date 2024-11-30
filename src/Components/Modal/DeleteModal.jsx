import React from "react";
import Modal from "@mui/material/Modal";
import { Grid, Button } from "@mui/material";

const DeleteModal = (props) => {
  const { isDelete, handleClose, handleDelete } = props;

  const handleDeleteAndClose = () => {
    // Call the handleDelete function
    handleDelete();

    // Close the modal
    handleClose();
  };

  return (
    <Modal
      open={isDelete}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container spacing={0} className="modal" justifyContent={"center"}>
        <p className="del-content">Are you sure, you want delete ?</p>
        <Grid
          item
          xs={12}
          container
          spacing={0}
          justifyContent={"center"}
          mt={5}
        >
          <Button variant="contained" onClick={handleDeleteAndClose}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteModal;
