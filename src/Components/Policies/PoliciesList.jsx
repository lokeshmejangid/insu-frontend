import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './policieslist.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditPolicies from "../Modal/AddEditPolicies.jsx";
import { addPolicy, deletePolicy, getAllPolicies, updatePolicy } from "../../Services/Api.js";
import DeleteModal from "../Modal/DeleteModal.jsx";

const PoliciesList = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState();
  const [deleteData, setDeleteData] = useState();
  const [isDelete, setDelete] = useState(false);
 
  const handleAddBtn = () => {
    setEdit(true);
    setEditData();
  }

  const handleEdit = (data) => {
    setEdit(true);
    setEditData(data);
    console.log(data);
  };

  const handleClose = () => {
    setEdit(false);
    //setDelete(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true); // Start loading
      const result = await deletePolicy(deleteData[0]);
      console.log(result);
      // toast.error("Item Deleted", {
      //   position: "top-center",
      // });
      setDelete(false);
      getPolicies();
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false); // End loading
    }
  };

  const updatePolicyItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      const result = await updatePolicy(payload, editData[0]);
      if (result !== undefined) {
        //toast.success("Category Updated", { position: "top-center" });
        setEdit(false);
        getPolicies();
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

  const addPolicyItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      console.log(payload);
      const result = await addPolicy(payload);
      console.log(result)
      //toast.success("jsfjk", { position: "top-center" });
      setEdit(false);
      getPolicies();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleUpdate = (data) => { 
    console.log(data);
    if (editData !== undefined) {
      updatePolicyItem(data);
    } else {
      addPolicyItem(data);
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
      options: { filter: false, sort: true, display: false },
    },
    {
      name: 'code',
      label: 'Policy Code',
      options: { filter: false, sort: true },
    },

    {
      name: 'name',
      label: 'Name',
      options: { filter: true, sort: true },
    },
    {
      name: 'cost',
      label: 'Policy Cost',
      options: { filter: true, sort: true },
    },
    {
      name: 'duration',
      label: 'Duration',
      options: { filter: true, sort: true,  display: false },
    },
    {
      name: 'category',
      label: 'category',
      options: { filter: true, sort: true,  display: false },
    },
    {
      name: 'description',
      label: 'Description',
      options: { filter: true, sort: true,  display: false },
    },
    {
      name: 'createdAt',
      label: 'Date',
      options: { filter: true, sort: true },
    },
    {
      name: 'updatedAt',
      label: 'updatedAt',
      options: { filter: true, sort: true, display: false },
    },
    {
      name: 'category',
      label: 'category',
      options: { 
        filter: true, 
        sort: true,
        display: false,
        customBodyRender: (value) => {
          if (value && typeof value === 'object') {
            return <span>{value.name}</span>; // Display the "name" field from the "client" object
          }
          return <span>Unknown</span>; // Fallback if "client" is undefined or not an object
        },
      },
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
  

  const getPolicies = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllPolicies();
      setPolicies(result.data);
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
    getPolicies();
  }, [])

  return (
    <>
      <MUIDataTable title={"List of Policies"} data={policies} columns={columns} options={options} />
      {isEdit && (
        <AddEditPolicies
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
    </>
  );
};

export default PoliciesList;
