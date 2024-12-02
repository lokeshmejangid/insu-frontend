import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './Clients.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditModal from "../Modal/AddEditModal";
import { addClient, deleteClient, getAllClient, updateClient } from "../../Services/Api";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteModal from "../Modal/DeleteModal";

const Clients = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [clients, setClients] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [isDelete, setDelete] = useState(false);

  const handleAddBtn = () => {
    setEdit(true);
    setEditData();
  }

  const handleEdit = (data) => {
    setEdit(true);
    setEditData(data);
  };

  const handleClose = () => {
    setEdit(false);
    //setDelete(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true); // Start loading
      const result = await deleteClient(deleteData[0]);
      console.log(result);
      // toast.error("Item Deleted", {
      //   position: "top-center",
      // });
      setDelete(false);
      getClient();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const updateClientItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      const result = await updateClient(payload, editData[0]);
      if (result !== undefined) {
        //toast.success("Category Updated", { position: "top-center" });
        setEdit(false);
        getClient();
      } else {
        // toast.error("Category not updated please connect with dev", {
        //   position: "top-center",
        // });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const addClientItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      console.log(payload);
      const result = await addClient(payload);
      console.log(result)
      //toast.success("jsfjk", { position: "top-center" });
      setEdit(false);
      getClient();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const getClient = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllClient();
      setClients(result.data);
      //toast(result.messagge)
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  }

  const deleteItem = (data) => {
    setDelete(true);
    setDeleteData(data);
  };
  useEffect(() => {
    console.log('h')
    getClient();
  }, [])

  const handleUpdate = (data) => {
    console.log(data);
    if (editData !== undefined) {
      updateClientItem(data);
    } else {
      addClientItem(data);
    }
  }

  const addButton = () => {
    return (
      <Tooltip disableFocusListener title="Add Client">
        <IconButton onClick={handleAddBtn}>
          <ControlPointIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const columns = [
    {
      name: '_id',
      label: 'Id',
      options: { filter: false, sort: true },
    },
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => (
          <img
            src={value}
            alt="Client"
            style={{ width: 50, height: 50, borderRadius: '50%' }}
          />
        ),
      },
    },
    {
      name: 'code',
      label: 'Code',
      options: { filter: true, sort: true },
    },
    {
      name: 'name',
      label: 'Name',
      options: { filter: true, sort: true },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRender: (value) => {
          // Check if value is boolean, and render the appropriate status text
          const statusText = value === true ? "Active" : "Inactive";

          // Return the status text with styling
          return <span className={`status ${statusText.toLowerCase()}`}>{statusText}</span>;
        },
      }
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div className="actionIcons">
            <MdOutlineEdit size={20} color="green" className="pointer" onClick={(e) => {
              e.stopPropagation();
              handleEdit(tableMeta.rowData);
            }} />
            <MdDelete size={20} color="red" className="pointer" onClick={(e) => {
              e.stopPropagation();
              deleteItem(tableMeta.rowData);
            }} />
          </div>
        ),
      },
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    download: false,
    print: false,
    searchPlaceholder: 'Search...',
    customToolbar: addButton,
  };
  return (
    <div className="clients-container">
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <MUIDataTable title={"List of Clients"} data={clients} columns={columns} options={options} />
      {isEdit && (
        <AddEditModal
          isEdit={isEdit}
          handleClose={handleClose}
          editData={editData}
          handleUpdate={handleUpdate}
        />
      )}
      {isDelete && (
        <DeleteModal
          isDelete={isDelete}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Clients;
