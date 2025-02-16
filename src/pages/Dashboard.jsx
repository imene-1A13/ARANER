import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/Styles/db.css';

const Gauge = ({ value, total, color, label, size = 'medium' }) => {
  const rotation = (value / total) * 180;
  const sizeClasses = {
    small: 'w-24 h-12',
    medium: 'w-32 h-16',
    large: 'w-40 h-20'
  };
  
  return (
    <div className="gauge-container">
      <div className={`gauge ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 50" className="gauge-svg">
          <path
            d="M 10 45 A 35 35 0 0 1 90 45"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          <path
            d="M 10 45 A 35 35 0 0 1 90 45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${(rotation / 180) * 125} 125`}
          />
          <circle cx="50" cy="45" r="2" fill="#333" />
        </svg>
        <div className="gauge-value">{value}/{total}</div>
      </div>
      {label && <div className="gauge-label">{label}</div>}
    </div>
  );
};

const Dashboard = () => {
  const [selectedUAP, setSelectedUAP] = useState('');
  const [selectedLine, setSelectedLine] = useState('');
  
  const performanceData = {
    current: 23,
    marchPoste: 60,
    indicators: [
      { value: 50, total: 100, color: 'yellow' },
      { value: 25, total: 100, color: 'red' },
      { value: 75, total: 100, color: '#green' },
      { value: 64, total: 100, color: 'yellow' }
    ]
  };

  const productionResults = {
    worker: {
      name: 'Mohamed Ahmed',
      id: 'AM0254',
      shift: 'Matin'
    },
    metrics: {
      nof: '6259348',
      target: 1260,
      current: 680,
      percentage: 52
    },
    operations: [
      { id: 1, name: 'Enveloppeuse', target: 35, nonConform: 5,Tc:4 },
      { id: 2, name: 'COS', target: 35, nonConform: 5 },
      { id: 3, name: 'Soudure des connexions', target: 35, nonConform: 5 },
      { id: 4, name: 'Soudure bac / couvercle', target: 35, nonConform: 5 }
    ]
  };

  const yamazumiData = [
    { name: 'Enveloppeuse', value: 10 },
    { name: 'COS', value: 15 },
    { name: 'Soudure des connexions', value: 20 },
    { name: 'Soudure bac / couvercle', value: 8 }
  ];

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

  const stopsData = [
    { name: 'Arrêt 4', duration: '3:21:36' },
    { name: 'Arrêt 3', duration: '1:55:12' },
    { name: 'Arrêt 2', duration: '1:08:48' },
    { name: 'Arrêt 5', duration: '0:43:12' },
    { name: 'Arrêt 1', duration: '0:08:24' }
  ];
  const lineOptions = {
    Assemblage: ["Sovema 1", "Sovema 2", "TBS"],
    Plaque: [],
    "Charge Finition": [],
  };
  const kpiData = Array.from({ length: 9 }, (_, i) => ({
    hour: `${i + 6}h`,
    TRS: Math.random() * 100,
    TD: Math.random() * 100,
    TP: Math.random() * 100,
    TQ: Math.random() * 100,
    Tdc: Math.random() * 20
  }));

  return (
    <div className="flex">
     
      <div className="flex-1">
        <div className="dashboard">
          {/* Header with Filters */}
          <div className="dashboard-header">

            <div className="filters">

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

      <select 
        value={selectedLine} 
        onChange={(e) => setSelectedLine(e.target.value)}
        className="filter-select"
        disabled={!selectedUAP || lineOptions[selectedUAP].length === 0} // Disable if no options
      >
        <option value="">Sélectionner Ligne</option>
        {lineOptions[selectedUAP]?.map((line, index) => (
          <option key={index} value={line}>{line}</option>
        ))}
      </select>
              <span className="timestamp">25/06/2024 15:27:33</span>
            </div>
          </div>


          <span className="line-badge" style={{paddingTop:'-1rem'}}>{`${selectedUAP} > ${selectedLine}`}</span>
          <div className="section">
            <h2 className="section-title">Performance Instantanée</h2>

            <div className="gauges-grid">
              <Gauge value={performanceData.current} total={100} color="red" label="Taux de Retouche" />
              <Gauge value={performanceData.marchPoste} total={100} color="orange" label="Taux de Qualité" />
              <Gauge value={performanceData.marchPoste} total={100} color="red" label="Taux de Disponibilité" />
              <Gauge value={performanceData.marchPoste} total={100} color="green" label="Performance" size="small" />
              <Gauge value={performanceData.marchPoste} total={100} color="orange" label="Taux de Rendement Synthétique (TRS)" size="large" className="trs-gauge" />
            </div>
          </div>

{/* Production Results */}
<div className="production-results">
  <h2 className="section-title">Résultats de Production Instantanés</h2>

  <div className="production-card">
    {/* Worker Info */}
    <div className="worker-section">
      <div className="worker-avatar-container">
        <img src="/api/placeholder/64/64" alt="Worker" className="worker-avatar" />
      </div>
      <div className="worker-details">
        <div className="worker-name">{productionResults.worker.name}</div>
        <div className="worker-id">ID: {productionResults.worker.id}</div>
        <div className="worker-shift">Poste - {productionResults.worker.shift}</div>
      </div>
    </div>

  
{/* Production Metrics */}
<div className="metrics-section">
  <div className="metric" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <span className="metric-value">N° OF</span>
    <span className="metric-label">{productionResults.metrics.nof}</span>
  </div>
  <div className="metric" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <span className="metric-value">Qté Objectif</span>
    <span className="metric-label">{productionResults.metrics.target}</span>
  </div>
  <div className="metric" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <span className="metric-value">Production Actuelle</span>
    <span className="metric-label">{productionResults.metrics.current}</span>
  </div>
  <div className="metric" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
    <span className="metric-value">Ref Art</span>
    <span className="metric-label">{productionResults.worker.id}</span>
  </div>
</div>

    {/* Progress Bar */}
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${productionResults.metrics.percentage}%` }}
        ></div>
      </div>
      <span>{productionResults.metrics.percentage}%</span>
    </div>

    {/* Operations Grid */}
    <div className="operations-grid">
  {productionResults.operations.map((op) => (
    <div key={op.id} className="operation-card">
      <div className="operation-header" style={{gap:'10px'}}>
        <span className="operation-quantity"style={{fontSize:'15px',fontStyle:'revert'}}>{op.name}</span>
        <div className="operation-quantity" style={{ marginTop: '1rem' }}>
  <span className="quantity-ok">Qté produite: {op.target}</span>

          <span className="separator">|</span>
          <span className="quantity-nc">Non Conforme: {op.nonConform}</span>
          <span className="separator">|</span>
          <span className="quantity-tc">Taux de Cycle: {op.Tc}</span>

        </div>
      </div>
    </div>
  ))}
</div>

  </div>
</div>


          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Yamazumi Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Yamazumi Chart</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={yamazumiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quality Defects Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Pareto des Défauts qualité</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={defectsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ffc107" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Line Stops Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Pareto des arrêts</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stopsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#ff5722" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI Evolution Chart */}
            <div className="chart-card">
              <h3 className="chart-title">Evolution des indicateurs de performance</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={kpiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="TRS" stroke="#2196F3" />
                    <Line type="monotone" dataKey="TD" stroke="#4CAF50" />
                    <Line type="monotone" dataKey="TP" stroke="#FFC107" />
                    <Line type="monotone" dataKey="TQ" stroke="#F44336" />
                    <Line type="monotone" dataKey="Tdc" stroke="#9C27B0" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Production History Table */}
          <div className="section">
            <h2 className="section-title">Historique des résultats - 24h</h2>
            <div className="table-container">
              <table className="production-table">
                <thead>
                  <tr>
                    <th>Post/heure</th>
                    <th>N°OF</th>
                    <th>Qté Prod OK</th>
                    <th>Qté NC</th>
                    <th>Arrêts</th>
                    <th>TRS</th>
                    <th>Cons. Plaque</th>
                    <th>Cons. Enveloppe</th>
                    <th>Cons. Bac</th>
                    <th>Conn. Couvercle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Matin i 10h</td>
                    <td>605847</td>
                    <td>357</td>
                    <td>20</td>
                    <td>00:01:25</td>
                    <td>65%</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;