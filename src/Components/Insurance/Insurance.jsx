import React, { useEffect, useState } from "react";
import MUIDataTable from 'mui-datatables';
import './insurance.css';
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; // Import the plus icon
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Tooltip from "@mui/material/Tooltip";
import AddEditInsu from "../Modal/AddEditInsu.jsx";

const Insurance = () => {
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
      name: 'dateRegistered',
      label: 'Date Registered',
      options: { filter: false, sort: true },
    },

    {
      name: 'refCode',
      label: 'Ref Code',
      options: { filter: true, sort: true },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      options: { filter: true, sort: true },
    },
    {
      name: 'vehicleReg',
      label: 'Vehicle Reg',
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

  const data = [
    {
      dateRegistered: '2022-02-03 11:40',
      refCode: '202202-00002',
      clientName: 'Blake, Claire C',
      vehicleReg: '12345678',
      status: 'Active',
    },
    {
      dateRegistered: '2022-02-03 10:45',
      refCode: '202202-00001',
      clientName: 'Cooper, Mark D',
      vehicleReg: '12345678',
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
      <MUIDataTable title={"List of Insurance"} data={data} columns={columns} options={options} />
      {isEdit && (
        <AddEditInsu
          isEdit={isEdit}
          handleClose={handleClose}
          editData={editData}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Insurance;
