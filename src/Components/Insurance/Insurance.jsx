import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './insurance.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditInsu from "../Modal/AddEditInsu.jsx";
import { addInsurance, deleteInsurance, getAllCetegory, getAllClient, getAllInsurance, updateInsurance } from "../../Services/Api.js";
import DeleteModal from "../Modal/DeleteModal.jsx";

const Insurance = () => {
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
    //setDelete(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteInsurance(deleteData[0]);
      // toast.error("Item Deleted", {
      //   position: "top-center",
      // });
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
      const result = await updateInsurance(payload, editData[0]);
      if (result !== undefined) {
        //toast.success("Category Updated", { position: "top-center" });
        setEdit(false);
        getInsurance();
      } else {
        // toast.error("Category not updated please connect with dev", {
        //   position: "top-center",
        // });
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
      //toast.success("jsfjk", { position: "top-center" });
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
      name: '_id',
      label: 'Id',
      options: { filter: false, sort: true, display:false },
    },

    {
      name: 'createdAt',
      label: 'Date Registered',
      options: { filter: false, sort: true },
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      options: { filter: false, sort: true, display: false },
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
      name: 'vehicleRegNo',
      label: 'Vehicle Reg',
      options: { filter: true, sort: true },
    },
    {
      name: 'vehicleChassisNo',
      label: 'Vehicle Chassis No',
      options: { filter: true, sort: true, display: false },
    },
    {
      name: 'vehicleModal',
      label: 'Vehicle Model No',
      options: { filter: true, sort: true, display: false },
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
      },
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

  const getInsurance = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllInsurance();
      setInsurance(result.data);
      //toast(result.messagge)
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    console.log('h')
    getInsurance();
  }, [])

  return (
    <div className="clients-container">
      <MUIDataTable title={"List of Insurance"} data={insurance} columns={columns} options={options} />
      {isEdit && (
        <AddEditInsu
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

export default Insurance;
