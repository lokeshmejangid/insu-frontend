import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './policieslist.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditPolicies from "../Modal/AddEditPolicies.jsx";
import { getAllPolicies } from "../../Services/Api.js";

const PoliciesList = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();
  const [loading, setLoading] = useState(false);
  const [policies, setPolicies] = useState();

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
    // try {
    //   const result = await deleteMenu(deleteData[0]);
    //   toast.error("Item Deleted", {
    //     position: "top-center",
    //   });
    //   setDelete(false);
    //   getMenuData();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleUpdate = () => { }
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
              handleEdit(tableMeta.rowData);
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
    </>
  );
};

export default PoliciesList;
