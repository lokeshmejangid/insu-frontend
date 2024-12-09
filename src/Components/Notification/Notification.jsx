import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditInsu from "../Modal/AddEditInsu.jsx";
import { addInsurance, deleteInsurance, getAllCetegory, getAllClient, getAllInsurance, updateInsurance } from "../../Services/Api.js";
import DeleteModal from "../Modal/DeleteModal.jsx";
import { format } from 'date-fns';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from "@mui/material/CircularProgress";

const Notification = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();

  const [loading, setLoading] = useState(false);
  const [insurance, setInsurance] = useState();
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
    setDelete(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteInsurance(deleteData[1]);
      toast.error(result.message, {position: "top-center"});
      setDelete(false);
      getInsurance();
    } catch (error) {
      console.log(error);
    }
  };
  const updateInsuranceItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      console.log(payload);
      const result = await updateInsurance(payload, editData[1]);
      if (result !== undefined) {
        toast.success(result.message, { position: "top-center" });
        setEdit(false);
        getInsurance();
      } else {
        toast.error(result.message, {position: "top-center"});
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // End loading
    }
  };

  const addInsuranceItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      console.log(payload);
      const result = await addInsurance(payload);
      console.log(result)
      toast.success(result.message, { position: "top-center" });
      setEdit(false);
      getInsurance();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleUpdate = (data) => { 
    console.log(data);
    if (editData !== undefined) {
      updateInsuranceItem(data);
    } else {
      addInsuranceItem(data);
    }
  }

  const deleteItem = (data) => {
    setDelete(true);
    setDeleteData(data);
  };

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
      name: 'serialNo', // S. No. Column
      label: 'S. No.',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1; // Display row index + 1 for serial numbers
        },
      },
    },
    {
      name: '_id',
      label: 'Id',
      options: { filter: false, sort: true, display:false },
    },

    {
      name: 'createdAt',
      label: 'Date Registered',
      options: { 
        filter: false, 
        sort: true,
        customBodyRender: (value) => {
          return value ? format(new Date(value), 'dd-MM-yy') : "";  
        }
      }
      
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      options: { filter: false, sort: true, display: true },
    },
    {
      name: 'policy',
      label: 'Policy',
      options: { filter: false, sort: true, display: false },
    },
    {
      name: 'registrationDate',  
      label: 'Registration Date',
      options: { filter: true, sort: true, display: false },
    },
    {
      name: 'client',
      label: 'Client Name',
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value) => {
          if (value && typeof value === 'object') {
            return <span>{value.name}</span>; // Display the "name" field from the "client" object
          }
          return <span>Unknown</span>; // Fallback if "client" is undefined or not an object
        },
      },
    },
    {
      name: 'client',
      label: 'Phone Number',
      options: { 
        filter: true, 
        sort: true,
        customBodyRender: (value) => {
          if (value && typeof value === 'object') {
            return <span>{value.phoneNumber}</span>; // Display the "name" field from the "client" object
          }
          return <span>Unknown</span>; // Fallback if "client" is undefined or not an object
        },
      },
    },
  
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    download: true,
    print: true,
    searchPlaceholder: 'Search...',
  };

  const getInsurance = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllInsurance();
      console.log(result);
      setInsurance(result.data);
      toast.success(result.message, { position: "top-center" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    getInsurance();
  }, [])

  return (
    <div className="clients-container">
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <MUIDataTable title={"List of Notifications"} data={insurance} columns={columns} options={options} />
      <ToastContainer />
    </div>
  );
};

export default Notification;
