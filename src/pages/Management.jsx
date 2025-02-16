import React, { Component, useState } from 'react'
import html2canvas from "html2canvas";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,PieChart,Pie } from 'recharts';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText, Checkbox, Divider } from "@mui/material";
import { Search,FileText } from 'lucide-react';
import {  PictureAsPdf, ArrowDropDown } from "@mui/icons-material";
import DatePicker from 'react-datepicker';
import '../assets/Styles/mang.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Management = () => {
  const [selectedUAP, setSelectedUAP] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [filterType, setFilterType] = useState('day');
  const lineOptions = {
    Assemblage: ["Sovema 1", "Sovema 2", "TBS"],
    Plaque: [],
    "Charge Finition": [],
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const open = Boolean(anchorEl);

  const options = [
    "Pareto arret",
    "Pie arret",
    "Pareto NC",
    "Pie NC",
    "Pareto dechet",
    "Pie dechet",
    "table arret",
    "table nc",
    "table dechet",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Selected PDF Reports", 14, 20);
  
   
  
    let yOffset = 50; // Starting Y position for charts
  
    for (const option of selectedOptions) {
      const chartId = option.replace(/\s+/g, "-").toLowerCase(); // Convert name to an ID format
      const chartElement = document.getElementById(chartId); // Find chart by ID
  
      if (chartElement) {
        const canvas = await html2canvas(chartElement);
        const imgData = canvas.toDataURL("image/png");
  
        const imgWidth = 180; // Set image width
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
        if (yOffset + imgHeight > doc.internal.pageSize.height - 20) {
          doc.addPage(); // Add a new page if needed
          yOffset = 20;
        }
  
        doc.addImage(imgData, "PNG", 15, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 10; // Move Y position down for next chart
      }
    }
  
    doc.save("Selected_Reports.pdf");
  };
  
  
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    const defectsData = [
      { name: 'Défaut 7', value: 35 },
      { name: 'Défaut 6', value: 28 },
      { name: 'Défaut 3', value: 20 },
      { name: 'Défaut 2', value: 15 },
      { name: 'Défaut 5', value: 12 },
      { name: 'Défaut 8', value: 11 },
      { name: 'Défaut 1', value: 10 },
      { name: 'Défaut 4', value: 8 }
    ];


    return (
      <div>

      <div className="filter-card" style={{width:'170vh',height:'180vh',marginTop:'-7rem',marginRight:'2rem',marginLeft:'7rem',backgroundColor:'#FEBD00'}}>
  <div className="filters-content">
    <div className="filters-grid">
      
      {/* UAP Selection */}
      <select 
        value={selectedUAP} 
        onChange={(e) => {
          setSelectedUAP(e.target.value);
          setSelectedLine(""); // Reset selected line when UAP changes
        }}
        className="filter-select"
      >
        <option value="">Sélectionner UAP</option>
        <option value="Assemblage">Assemblage</option>
        <option value="Plaque">Plaque</option>
        <option value="Charge Finition">Charge Finition</option>
      </select>

      {/* Line Selection */}
      <select 
        value={selectedLine} 
        onChange={(e) => setSelectedLine(e.target.value)}
        className="filter-select"
        disabled={!selectedUAP || lineOptions[selectedUAP].length === 0} 
      >
        <option value="">Sélectionner Ligne</option>
        {lineOptions[selectedUAP]?.map((line, index) => (
          <option key={index} value={line}>{line}</option>
        ))}
      </select>

      
   

    </div>

    {/* Search Filters */}
    <div className="filters-actions">
      <div className="button-group">
        {['day', 'week', 'month', 'year', 'period'].map((type) => (
          <button
            key={type}
            className={`filter-button ${filterType === type ? 'active' : ''}`}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Date Pickers */}
      <div className="date-filters">
        {filterType === 'day' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            className="date-picker"
            placeholderText="Select a date"
          />
        )}

        {filterType === 'week' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            selectsRange
            dateFormat="yyyy/MM/dd"
            className="date-picker"
            placeholderText="Select a week range"
          />
        )}

        {filterType === 'month' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            className="date-picker"
            placeholderText="Select a month"
          />
        )}

        {filterType === 'year' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy"
            showYearPicker
            className="date-picker"
            placeholderText="Select a year"
          />
        )}

        {filterType === 'period' && (
          <div className="date-range-picker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
              placeholderText="Start Date"
            />
            <span className="date-separator">to</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="date-picker"
              placeholderText="End Date"
            />
          </div>
        )}
      </div>

      {/* Search Button */}
      <div className="search-container">
        <button className="search-buttom">
          <Search className="search-icon" />
          Search
        </button>
      </div>
      <div className="pdf-container">
      {/* Main Button */}
      <Button 
        variant="contained" 
        color="info" 
        startIcon={<FileText />} 
        endIcon={<ArrowDropDown />} 
        onClick={handleClick}
      >
        PDF Options
      </Button>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            <ListItemIcon>
              <Checkbox checked={selectedOptions.includes(option)} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
        
        {/* Divider for better visual separation */}
        <Divider />

        {/* Generate PDF Option */}
        <MenuItem onClick={generatePDF} disabled={selectedOptions.length === 0}>
          <ListItemIcon>
            <PictureAsPdf color={selectedOptions.length > 0 ? "success" : "disabled"} />
          </ListItemIcon>
          <ListItemText primary="Generate PDF" />
        </MenuItem>
      </Menu>
    </div>
    </div>
  </div>
  <h2 className="section-title">Les arrets de production</h2>
  <div className="charts-grid">

  <div className="chart-card" id="pareto-arret">
  <h3 className="chart-title">Pareto arret</h3>
              <div className="chart-conta">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defectsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FFA500" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="chart-card" id="pie-arret">
            <h3 className="chart-title">Pie arret</h3>
              <div className="chart-conta">
              <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={defectsData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#FFA500"
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
              </div>
            </div>
            </div>
            <div className="section-m">
            <div className="table-contam">
              <table className="product-table" id='table-arret'>
                <thead>
                  <tr>
                    <th>Cause</th>
                    <th>Durée</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  
                    <td></td>
                    <td></td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 className="section-title">Les NC de production</h2>
            <div className="charts-grid">

            <div className="chart-card" id="pareto-nc">
            <h3 className="chart-title">Pareto NC</h3>
              <div className="chart-conta">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defectsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="chart-card" id="pie-nc">
            <h3 className="chart-title">Pie NC</h3>
              <div className="chart-conta">
              <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={defectsData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#FFD700"
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="section-m">
            <div className="table-contam">
            <table className="product-table" id='table-nc'>
            <thead>
                  <tr>
                    <th>Cause</th>
                    <th>Durée</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  
                    <td></td>
                    <td></td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="section-title">Les dechets de production</h2>
            <div className="charts-grid">

            <div className="chart-card" id="pareto-dechet">
            <h3 className="chart-title">Pareto Dechet</h3>
              <div className="chart-conta">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defectsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#FFC107" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="chart-card" id="pie-dechet">
            <h3 className="chart-title">Pie Dechet</h3>
            <div className="chart-conta">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={defectsData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#FFC107"
        label
      />
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

            </div>
          </div>
          <div className="section-m">
            <div className="table-contam">
            <table className="product-table" id='table-dechet'>
            <thead>
                  <tr>
                    <th>Cause</th>
                    <th>Durée</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  
                    <td></td>
                    <td></td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </div>
       

</div> 



      </div>   );
  };

export default Management