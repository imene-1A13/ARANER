import '../assets/Styles/history.css';
import React, { useState,useEffect } from 'react';
import { Search, Calendar, FileDown, BarChart2, RefreshCw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // import datepicker styles
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const lineOptions = {
  Assemblage: ["Sovema 1", "Sovema 2", "TBS"],
  Plaque: [],
  "Charge Finition": [],
};

const History = () => {
  const [selectedUAP, setSelectedUAP] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  const [filterType, setFilterType] = useState('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const historyData = [
    { postHeure: 'Matin : 6h', nOF: '605847', qteProdOK: '357', qteNC: '20', arrets: '00:01:25', trs: '65%', status: 'success' },
    { postHeure: 'Matin : 7h', nOF: '605848', qteProdOK: '412', qteNC: '18', arrets: '00:02:10', trs: '70%', status: 'success' },
    { postHeure: 'Matin : 8h', nOF: '605849', qteProdOK: '389', qteNC: '15', arrets: '00:01:40', trs: '75%', status: 'success' },
    { postHeure: 'Matin : 9h', nOF: '605850', qteProdOK: '410', qteNC: '12', arrets: '00:02:05', trs: '80%', status: 'success' },
    { postHeure: 'Matin : 10h', nOF: '605851', qteProdOK: '380', qteNC: '10', arrets: '00:02:05', trs: '78%', status: 'success' },
    { postHeure: 'Matin : 11h', nOF: '605852', qteProdOK: '390', qteNC: '14', arrets: '00:01:30', trs: '72%', status: 'success' },
  ];

  const filteredData = historyData.filter((row) => {
    if (selectedUAP && selectedLine) {
      if (!lineOptions[selectedUAP]?.includes(selectedLine)) return false;
    }
    if (searchQuery && !row.nOF.includes(searchQuery)) return false;
    if (startDate) {
      const rowDate = new Date(row.postHeure); 
      if (filterType === "day" && rowDate.toDateString() !== startDate.toDateString()) return false;
      if (filterType === "month" && rowDate.getMonth() !== startDate.getMonth()) return false;
      if (filterType === "year" && rowDate.getFullYear() !== startDate.getFullYear()) return false;
      if (filterType === "period" && (rowDate < startDate || rowDate > endDate)) return false;
    }
    return true;
  });

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page is changed
  };
  const ns = [
    { label: 'Total Production', value: '2,547', trend: '+15%' },
    { label: 'Average TRS', value: '78%', trend: '+5%' },
    { label: 'Quality Rate', value: '96%', trend: '+2%' },
  ];
  
 const handleExport =  (data, fileName = "exported_data.xlsx") => {
  if (!Array.isArray(data)) {
    console.error("Data must be an array! Fixing...");
    data = Object.values(data); // Try converting to array
}

const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });

saveAs(dataBlob, fileName);
};


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUAP, selectedLine, searchQuery, startDate, endDate]);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };


  return (
    <>
 
    <div className="history-container">
      <div className="history-content">
        <div className="header-section">
          <h1>Production History</h1>
          <button className="refresh-button" onClick={refreshData}>
            <RefreshCw className={`icon ${isRefreshing ? 'spinning' : ''}`} />
            Refresh Data
          </button>
        </div>

        <div className="ns-grid">
          {ns.map((n, index) => (
            <div key={index} className="n-card">
              <div className="n-content">
                <div>
                  <p className="n-label">{n.label}</p>
                  <p className="n-value">{n.value}</p>
                </div>
                <span
                  className={`trend-badge ${n.trend.startsWith('+') ? 'positive' : 'negative'}`}
                >
                  {n.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="filters-card">
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

      {/* N° OF Search */}
      <input
        type="text"
        placeholder="Enter N° OF"
        className="text-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Operator Selection */}
      <select className="select-input">
        <option value="">Select Operator</option>
        <option value="op1">Operator 1</option>
        <option value="op2">Operator 2</option>
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

        {/* Start Date - End Date for Period Selection */}
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
        <button className="search-button">
          <Search className="search-icon" />
          Search
        </button>
      </div>
    </div>
  </div>
</div>


        <div className="results-card">
          <div className="results-header">
            <div className="header-left">
              <h2>Production Results</h2>
              <span className="line-badge">{`${selectedUAP} > ${selectedLine}`}</span>
            </div>
            <button className="export-button" onClick={() => handleExport(historyData)}>
              <FileDown className="icon" />
              Exporter xls
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {['Post/Heure', 'N°OF', 'Qté Prod OK', 'Qté NC', 'Arrêts', 'TRS'].map((header) => (
                    <th key={header}>
                      <div className="table-header">
                        {header}
                        <BarChart2 className="icon" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
  {currentRows.map((row, index) => (
    <tr key={index}>
      <td>{row.postHeure}</td>
      <td>{row.nOF}</td>
      <td>{row.qteProdOK}</td>
      <td>{row.qteNC}</td>
      <td>{row.arrets}</td>
      <td>{row.trs}</td>
      <td className={`status ${row.status}`}>{row.status}</td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          <div className="pagination" style={{}}>
            <select
              className="rows-per-page"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5 elements</option>
              <option value={10}>10 elements</option>
              <option value={15}>15 elements</option>
              <option value={20}>20 elements</option>
            </select>

            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default History;
