import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './InsuranceCategory.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditCategory from "../Modal/AddEditCategory.jsx";

const InsuranceCategory = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();

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
      name: 'dateCreated',
      label: 'dateCreated',
      options: { filter: false, sort: true },
    },

    {
      name: 'name',
      label: 'Name',
      options: { filter: true, sort: true },
    },
    {
      name: 'description',
      label: 'description',
      options: { filter: true, sort: true },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        customBodyRender: (value) => (
          <span className={`status ${value.toLowerCase()}`}>{value}</span>
        ),
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

  const categories = [
    {
      id: 1,
      dateCreated: "2022-02-03 08:53",
      name: "2 Wheeler",
      description: "Integer auctor at mauris a...",
      status: "Active",
    },
    {
      id: 2,
      dateCreated: "2022-02-03 08:54",
      name: "3 Wheeler",
      description: "Sed at leo vel felis pellentesque...",
      status: "Active",
    },
    {
      id: 3,
      dateCreated: "2022-02-03 08:56",
      name: "4 Wheeler",
      description: "Quisque at erat at ipsum mollis...",
      status: "Active",
    },
    {
      id: 4,
      dateCreated: "2022-02-03 08:52",
      name: "Commercial",
      description: "Lorem ipsum dolor sit amet...",
      status: "Active",
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
      <MUIDataTable title={"List of Insurance"} data={categories} columns={columns} options={options} />
      {isEdit && (
        <AddEditCategory
          isEdit={isEdit}
          handleClose={handleClose}
          editData={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default InsuranceCategory;
