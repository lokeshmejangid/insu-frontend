import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './Clients.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditModal from "../Modal/AddEditModal";

const Clients = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState();

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

const handleUpdate = () => {}
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
      label: 'Date Created',
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
            <MdDelete size={20} color="red" className="pointer"  onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(tableMeta.rowData);
                }}/>
          </div>
        ),
      },
    },
  ];

  const data = [
    {
      dateCreated: '2022-02-03 11:40',
      image: 'https://via.placeholder.com/50',
      code: '202202-00002',
      name: 'Blake, Claire C',
      status: 'Active',
    },
    {
      dateCreated: '2022-02-03 10:45',
      image: 'https://via.placeholder.com/50',
      code: '202202-00001',
      name: 'Cooper, Mark D',
      status: 'Active',
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
      <MUIDataTable title={"List of Clients"} data={data} columns={columns} options={options} />
      {isEdit && (
        <AddEditModal
          isEdit={isEdit}
          handleClose={handleClose}
          editData={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Clients;