import React, { useState } from "react";
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

const Transations = () => {
  const [isEdit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [filterFromDate, setFilterFromDate] = useState(null);
  const [filterToDate, setFilterToDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [data] = useState([
    {
      dateRegistered: "2022-02-03 11:40",
      refCode: "202202-00002",
      clientName: "Blake, Claire C",
      vehicleReg: "12345678",
      status: "Active",
    },
    {
      dateRegistered: "2022-02-03 10:45",
      refCode: "202202-00001",
      clientName: "Cooper, Mark D",
      vehicleReg: "12345678",
      status: "Active",
    },
    {
      dateRegistered: "2023-03-15 14:00",
      refCode: "202303-00003",
      clientName: "Taylor, Sarah L",
      vehicleReg: "87654321",
      status: "Inactive",
    },
  ]);

  const handleAddBtn = () => {
    setEdit(true);
    setEditData(null);
  };

  const handleEdit = (rowData) => {
    setEdit(true);
    setEditData(rowData);
  };

  const handleClose = () => {
    setEdit(false);
  };

  // Apply filters
  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const itemDate = dayjs(item.dateRegistered);
      const fromDate = filterFromDate ? dayjs(filterFromDate) : null;
      const toDate = filterToDate ? dayjs(filterToDate) : null;

      if (fromDate && toDate) {
        return itemDate.isAfter(fromDate.startOf("day")) && itemDate.isBefore(toDate.endOf("day"));
      }
      if (fromDate) {
        return itemDate.isAfter(fromDate.startOf("day"));
      }
      if (toDate) {
        return itemDate.isBefore(toDate.endOf("day"));
      }
      return true; // No filters applied
    });

    setFilteredData(filtered);
  };

  // Clear filters
  const clearFilters = () => {
    setFilterFromDate(null);
    setFilterToDate(null);
    setFilteredData(data);
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
      name: "dateRegistered",
      label: "Date Registered",
      options: { filter: false, sort: true },
    },
    {
      name: "refCode",
      label: "Ref Code",
      options: { filter: true, sort: true },
    },
    {
      name: "clientName",
      label: "Client Name",
      options: { filter: true, sort: true },
    },
    {
      name: "vehicleReg",
      label: "Vehicle Reg",
      options: { filter: true, sort: true },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRender: (value) => (
          <span className={`status ${value.toLowerCase()}`}>{value}</span>
        ),
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <div className="actionIcons">
            <MdOutlineEdit
              size={20}
              color="green"
              className="pointer"
              onClick={() => handleEdit(tableMeta.rowData)}
            />
            <MdDelete size={20} color="red" className="pointer" />
          </div>
        ),
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    download: false,
    print: false,
    searchPlaceholder: "Search...",
    customToolbar: addButton,
  };

  React.useEffect(() => {
    setFilteredData(data); // Initially set all data as filtered data
  }, [data]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="clients-container">
        {/* Filters Section */}
        <div
          className="filters-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {/* Filters Row */}
          <div style={{ display: "flex", gap: "16px", marginBottom: "10px" }}>
            {/* Date From Filter */}
            <DatePicker
              label="Date From"
              value={filterFromDate}
              onChange={(newValue) => setFilterFromDate(newValue)}
              renderInput={(params) => <input {...params} />}
            />
            {/* Date To Filter */}
            <DatePicker
              label="Date To"
              value={filterToDate}
              onChange={(newValue) => setFilterToDate(newValue)}
              renderInput={(params) => <input {...params} />}
            />

            <Button variant="contained" className="btnFilter" onClick={applyFilters}>
              Filter
            </Button>
            <Button variant="outlined" className="btnClrFilter"  onClick={clearFilters}>
              Clear
            </Button>
          </div>

        </div>

        {/* Data Table */}
        <MUIDataTable
          title={"All Transactions"}
          data={filteredData}
          columns={columns}
          options={options}
        />
        {isEdit && (
          <AddEditInsu
            isEdit={isEdit}
            handleClose={handleClose}
            editData={editData}
          />
        )}
      </div>
    </LocalizationProvider>
  );
};

export default Transations;
