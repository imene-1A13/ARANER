import React, { useState,useEffect,useRef} from 'react';
import '../assets/Styles/cos.css';
import { useNavigate } from 'react-router-dom';
import im1 from '../assets/image1.png'
import im2 from '../assets/image2.png'
import im3 from '../assets/image3.png'

import { Sun,Moon } from 'lucide-react';

const Usine = () => {
  const navigate = useNavigate();
  const getProgressColor = (value) => {
    if (value >= 80) return 'green';
    if (value >= 50) return 'yellow';
    return 'red';
  };
  const handleCardClick = (machineId) => {
    navigate(`/section/${machineId}`);
  };
  const handleAddOF = (machineId) => {
    const newOF = { label: 'New OF', subtitle: 'New OF Description', value: '--' };
    setMachines(prevMachines =>
      prevMachines.map(machine =>
        machine.id === machineId
          ? { ...machine, ofs: [...machine.ofs, newOF] }
          : machine
      )
    );
  };
  const machineRefs = useRef([]);

  const [showAlert, setShowAlert] = useState(false);
  const [offlineMachine, setOfflineMachine] = useState(null);
  const handleAlertClick = () => {
    if (offlineMachine) {
      const machineIndex = machines.findIndex((machine) => machine.id === offlineMachine.id);
      if (machineRefs.current[machineIndex]) {
        machineRefs.current[machineIndex].scrollIntoView({ behavior: 'smooth' });
      }
      setShowAlert(false);
    }
  };
  useEffect(() => {
    const offline = machines.find((machine) => machine.status === 'Offline');
    if (offline) {
      setOfflineMachine(offline);
      setShowAlert(true);
    }
  }, []);

  const handleShowAlert = () => {
    const offline = machines.find((machine) => machine.status === 'Offline');
    if (offline) {
      setOfflineMachine(offline);
      setShowAlert(true);
    }
  };
  const [machines, setMachines] = useState([
    {id:1,
      image:im1,
      tempsMarche: "last checked at :21/07/2000",
      titre:'UAP',
      soustitre:' ASSEMBLAGE',
      status: 'Idle',
      runtime: '4h 15m',
      downtime: '45m',
      kpis: [
        { label: 'TRS', subtitle: 'Taux de Rendement Synthétique', value: '--' },
        { label: 'TP', subtitle: 'Taux de Performance', value: '--' },
        { label: 'TD', subtitle: 'Taux de Disponibilité', value: '--' },
        { label: 'TQ', subtitle: 'Taux de Qualité', value: '--' },
      ],
      ofs: [
        { label: 'TBS', subtitle: 'Ligne d assemblage TBS', value: '--' },
        { 
          label: 'SOVEMA1', 
          subtitle: 'Ligne d assemblage SOVEMA 1',
          components: [
            { label: 'OF Element', subtitle: 'OF des elements', value: '--' },
            { label: 'OF Batterie', subtitle: 'OF des batteries', value: '--' }
          ]
        },
        { 
          label: 'SOVEMA2', 
          subtitle: 'Ligne d assemblage SOVEMA 1',
          components: [
            { label: 'OF Element', subtitle: 'OF des elements', value: '--' },
            { label: 'OF Batterie', subtitle: 'OF des batteries', value: '--' }
          ]
        },
      ],
      quantities: [
        { label: 'Qté Conf', subtitle: 'Quantité totale produite conformes', value: '--' },
        { label: 'Qté NC', subtitle: 'Quantité totale non conforme', value: '--' },
        { label: 'Qté Ret', subtitle: 'Quantité totale retouchée', value: '--' },
      ],
      energy: [
        { label: 'Energie [KWH]', subtitle: 'Consommation d\'énergie active', value: '--' },
        { label: 'P [KW]', subtitle: 'Total Puissance active', value: '--' },
        { label: 'Q [KVAR]', subtitle: 'Total puissance réactive', value: '--' },
        { label: 'cos  [ ]', subtitle: 'Facteur de puissance', value: '--' },
        { label: 'CO2 [Kg]', subtitle: 'Total Empreinte carbone', value: '--' },
      ],
      worker: [
        {
          label: 'Chef d equipe',
          value: 'Nom & Prenom',
          time: [{ label: 'poste :', value: 'nuit' }]
        }
      ]
    },
    {id:2,
     image: im2,
      tempsMarche: "5h 45min",

      titre:'UAP ',
      soustitre:'PLAQUE',
      status: 'Offline',
      runtime: '3h',
      downtime: '2h',
      kpis: [
        { label: 'TRS', subtitle: 'Taux de Rendement Synthétique', value: '--' },
        { label: 'TP', subtitle: 'Taux de performance', value: '--' },
        { label: 'TD', subtitle: 'Taux de disponibilité', value: '--' },
        { label: 'TQ', subtitle: 'Taux de qualité', value: '--' },
      ],
      worker: [
        {
          label: 'chef d equipe : ',
          value: 'Nom & Prenom',
          time: [{ label: 'poste', value: 'matin' }]
        }
      ],
      ofs: [
        { 
          
        },
      ],
      quantities: [
        { label: 'Qté Conf', subtitle: 'Quantité totale produite conformes', value: '--' },
        { label: 'Qté NC', subtitle: 'Quantité totale non conforme', value: '--' },
        { label: 'Qté Ret', subtitle: 'Quantité totale retouchée', value: '--' },
      ],
      energy: [
        { label: 'Energie [KWH]', subtitle: 'Consommation d\'énergie active', value: '--' },
        { label: 'P [KW]', subtitle: 'Puissance active', value: '--' },
      ],
    },
    {id:3,
      image:im3,
      titre:'UAP CHARGE FINITION',
      status: 'Offline',
      runtime: '3h',
      downtime: '2h',
      kpis: [
        { label: 'TRS', subtitle: 'Taux de Rendement Synthétique', value: '--' },
        { label: 'TP', subtitle: 'Taux de performance', value: '--' },
        { label: 'TD', subtitle: 'Taux de disponibilité', value: '--' },
        { label: 'TQ', subtitle: 'Taux de qualité', value: '--' },
      ],
      ofs: [
       
      ],
      quantities: [
        { label: 'Qté Conf', subtitle: 'Quantité totale produite conformes', value: '--' },
        { label: 'Qté NC', subtitle: 'Quantité totale non conforme', value: '--' },
        { label: 'Qté Ret', subtitle: 'Quantité totale retouchée', value: '--' },
      ],
      energy: [
        { label: 'Energie [KWH]', subtitle: 'Consommation d\'énergie active', value: '--' },
        { label: 'P [KW]', subtitle: 'Puissance active', value: '--' },
      ],
    },
  ]);

  return (
    <>

      <div>
        <div>
        {showAlert && (
            <div className="alert-container">
              <div className="alert-box" onClick={handleAlertClick}>
                <span className="alert-icon">⚠️</span>
                <span className="alert-text">There is an offline machine! Click to view details.</span>
              </div>
            </div>
          )}

          <div className="machine-container">
          <div className="machine-cards-wrapper">
            
          {machines.map((machine, index) => (
            
  <div

  key={machine.id}
  ref={(el) => (machineRefs.current[index] = el)}
  className={`machine-card  ${
    machine.status === 'Offline' || machine.uap === 'PLAQUE' || machine.uap === 'CHARGE FINITION'
      ? 'deactivated'
      : ''
  }`}
  onClick={() => handleCardClick(machine.id)}
>           

<div className="card-head">

  <div className="header-left">
    <div className="placeholder-text">
      <img 
alt="Logo" className="w-full p-2" style={{marginLeft:'45em',marginTop:'5rem'}} 
      src={machine.image} 
    />    
    </div>
    <span style={{ 
  display: 'inline-block', 
  padding: '0.5rem 1rem', 
  marginTop: '18rem', 
  marginLeft: '-27rem', 
  backgroundColor: '#f0f0f0', 
  borderRadius: '8px', 
  fontWeight: 'bold' 
}}>
  {machine.tempsMarche}
</span>
  </div>
  <div className="header-right">

  <div className="machine-info">
 <span 
   style={{
     display: 'flex',
     flexDirection: 'column',
     marginLeft: '5rem',
     fontFamily: 'Montserrat, sans-serif',
     fontWeight: 'bold',
     fontSize: '2.5rem',
     lineHeight: '1.2',
   }}
 >
   <span 
     style={{ 
       color: '#666', 
       fontSize: '1.8rem',
       marginTop: '-22rem',
       alignSelf: 'flex-start',
       textIndent: '-3rem',
       marginLeft:'1rem',
     }}
   >
     {machine.titre}
   </span>
   <span
      style={{
        fontSize: '1.8rem',
        color: '#666',
        marginTop: '0.5rem',
        marginLeft:'-2rem',
      }}
    >
      {machine.soustitre}
    </span>   
  

   {machine.worker && machine.worker.length > 0 && (
    
     <div 
       style={{ 
         display: 'flex', 
         flexDirection: 'column',
         marginLeft: '-2rem', 
         marginTop: '-35rem', 
         gap: '1rem' 
       }}
     >
       <span style={{ marginTop: '46rem',fontFamily:' Montserrat, sans-serif',color:'blue' }}>
         {machine.worker[0].label}: {machine.worker[0].value}
       </span>

    

       {machine.worker[0].time && (
         <div 
           className="poste" 
           style={{ 
             display: 'flex', 
             alignItems: 'center', 
             gap: '1.25rem' 
           }}
         >
           <span>Poste:</span>
           {machine.worker[0].time[0].value === "matin" ? (
             <Sun className="text-yellow-500" size={20} />
           ) : (
             <Moon className="text-blue-500" size={20} />
           )}
           <span>{machine.worker[0].time[0].value}</span>
         </div>
       )}
     </div>
   )}
 </span>
</div>
</div>

</div>

          

              <div className="metrics-grid" style={{padding:'5vh'}}>
                <div className="metric-card">
                  <div className="metric-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M6 16h12M6 12h12M6 8h12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>KPI | Performance de l'UAP</span>
                  </div>
                  <div className="metric-items">
                    {machine.kpis.map((kpi, kpiIndex) => (
                      <div key={kpiIndex} className="metric-item">
                        <div className="metric-label">
                          <span className="value">{kpi.label}</span>
                          <span className="subtitle">{kpi.subtitle}</span>
                          <span className="value">{kpi.value}%</span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress green" style={{ width: `${kpi.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span>OF | Running OFs</span>
                  </div>
                  <div className="metric-items">
                    {machine.ofs.map((of, ofIndex) => (
                      <div key={ofIndex} className="metric-item">
                        <div className="metric-label">
                          <span className="value">{of.label}</span>
                          <span className="subtitle">{of.subtitle}</span>
                          <span className="value">{of.value}</span>
                        </div>
                        {of.components && of.components.length > 0 && (
                          <div className="metric-item">
                            {of.components.map((component, compIndex) => (
                              <div key={compIndex} className="metric-label">
                                <span className="value">{component.label}</span>
                                <span className="subtitle">{component.subtitle}</span>
                                <span className="value">{component.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    </div>
        

                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  <line x1="9" y1="21" x2="9" y2="9"></line>
  <line x1="15" y1="21" x2="15" y2="14"></line>
</svg>
                      <span>Qté | Détail des quantités produites</span>
                    </div>
                    <div className="metric-items">
                      {machine.quantities.map((qty, qtyIndex) => (
                        <div key={qtyIndex} className="metric-item">
                          <div className="metric-label">
                            <span className="value">{qty.label}</span>
                            <span className="subtitle">{qty.subtitle}</span>
                            <span className="value">{qty.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="metric-card">
                    <div className="metric-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
</svg>
                      <span>Eng | Performance énergétique</span>
                    </div>
                    <div className="metric-items">
                      {machine.energy.map((eng, engIndex) => (
                        <div key={engIndex} className="metric-item">
                          <div className="metric-label">
                            <span className="value">{eng.label}</span>
                            <span className="subtitle">{eng.subtitle}</span>
                            <span className="value">{eng.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
     
    </>
  );
};

export default Usine;
