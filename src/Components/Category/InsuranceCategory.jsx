import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './InsuranceCategory.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditCategory from "../Modal/AddEditCategory.jsx";
import { addCategory, getAllCetegory, updateCategory, deleteCategory } from "../../Services/Api.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DeleteModal from "../Modal/DeleteModal.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import { faIR } from "date-fns/locale";
import { format } from 'date-fns';

const InsuranceCategory = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [category, setCetegory] = useState();
  const [isDelete, setDelete] = useState(false);
  const [deleteData, setDeleteData] = useState();
  const [loading, setLoading] = useState(false);


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
    setDelete(false);
  };
  const deleteItem = (data) => {
    setDelete(true);
    setDeleteData(data);
  };

  const handleDelete = async () => {
    try {
      setLoading(true); // Start loading
      const result = await deleteCategory(deleteData[1]);
      console.log(result);
      toast.error("Item Deleted", {
        position: "top-center",
      });
      setDelete(false);
      getCetegory();
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false); // End loading
    }
  };

  const getCetegory = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllCetegory();
      setCetegory(result.data);
      toast.success(result.mesage, { position: "top-center" });
      // Save API data to local storage
      localStorage.setItem("categories", JSON.stringify(result.data));
      console.log("API data saved to local storage");
      
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  }

  const addCategoryItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      console.log(payload);
      const result = await addCategory(payload);
      console.log(result)
      toast.success(result.messagge, { position: "top-center" });
      setEdit(false);
      getCetegory();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const updateCategoryItem = async (payload) => {
    try {
      setLoading(true); // Start loading
      const result = await updateCategory(payload, editData[1]);
      if (result !== undefined) {
        toast.success(result.messagge, { position: "top-center" });
        setEdit(false);
        getCetegory();
      } else {
        toast.error("Category not updated please connect with dev", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false); // End loading
    }
  };

  const handleUpdate = (data) => {
    console.log(data);
    if (editData !== undefined) {
      updateCategoryItem(data);
    } else {
      addCategoryItem(data);
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

  useEffect(() => {
    console.log('h')
    getCetegory();
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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
      options: { filter: true, sort: true, display: false },
    },
    {
      name: 'createdAt',
      label: 'Date',
      options: { 
        filter: false, 
        sort: true,
        customBodyRender: (value) => {
          return value ? format(new Date(value), 'dd-MM-yy') : "";  
        }
      }
    },

    {
      name: 'name',
      label: 'Category Name',
      options: { filter: true, sort: true },
    },
    {
      name: 'description',
      label: 'Description',
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
    download: true,
    print: true,
    columns:false,
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
      <MUIDataTable title={"Insurance Category"} data={category} columns={columns} options={options} />
      <ToastContainer />
      {isEdit && (
        <AddEditCategory
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

export default InsuranceCategory;
