import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import AddEditInsu from "../Modal/AddEditInsu.jsx";
import "./transations.css";
import { getAllInsurance, getAllTransation } from "../../Services/Api.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from "@mui/material/CircularProgress";
import { format } from 'date-fns';

const Transations = () => {
  const [transations, setTransations] = useState();
  const [loading, setLoading] = useState(false);

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
      options: { filter: false, sort: true, display: false },

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
      name: 'policy',
      label: 'Policy',
      options: {
        filter: true,
        sort: true,
        display: true,
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
      label: 'Vehicle Reg No',
      options: { filter: true, sort: true },
    },
    {
      name: 'registrationDate',
      label: 'Registration Date',
      options: { filter: true, sort: true, display: true },
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      options: { filter: false, sort: true, display: true },
    },
    {
      name: 'client',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
        display: false,
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
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    download: true,
    print: true,
    searchPlaceholder: "Search...",
  };
  const getInsurance = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllInsurance();
      setTransations(result.data);
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
    <>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <MUIDataTable
        title={"All Transactions"}
        data={transations}
        columns={columns}
        options={options}
      />
      <ToastContainer />
    </>
  );
};

export default Transations;
