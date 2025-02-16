import React from 'react';
import { Activity, Package, Settings, AlertTriangle, Clock } from 'lucide-react';
import { Progress } from '../assets/uiprogress';
import '../assets/Styles/section.css';
import m from '../assets/image1.png'

const machines = [
  {
    id: 1,
    name: "Assemblage 1 -TBS",
    status: "EN-MARCHE",
    tempsArret: "2h 30min",
    tempsMarche: "5h 45min",
    ofs: [
      { label: 'Progression', subtitle: 'Progression de la production', progress: 70 },
      { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    kpi: [
      { label: 'TRS', subtitle: 'Taux de rendement synthétique', value: '--' },
      { label: 'TP', subtitle: 'Taux de performance', value: '--' },
      { label: 'TD', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'TQ', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' },
      { label: 'Tde', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    process: [
      { label: 'TC Env [sec]', subtitle: 'Cadence réelle de la phase enveloppeuse', value: '--' },
      { label: 'TC COS [sec]', subtitle: 'Temps de cycle réel de la phase COS', value: '--' },
      { label: 'TC SC [sec]', subtitle: 'Temps de cycle réel soudure des connexions', value: '--' },
      { label: 'TC BC [sec]', subtitle: 'Temps de cycle réel soudure Bac/Couvercle', value: '--' },
      { label: 'TC th [sec]', subtitle: 'Temps de cycle théorique de la ligne', value: '--' }
    ],
    alert: [
      { label: 'Déchet [kg]', subtitle: 'Dernier déchet enregistré par cause', value: '--' },
      { label: 'Arret [sec]', subtitle: 'Dernier arret enregistré par cause', value: '--' },
      { label: 'Qté NC [Kg]', subtitle: 'Dernier quantité NC déclarée par cause', value: '--' }
    ]
  },
  {
    id: 1,
    name: "Assemblage 1 -SOVEMA-2",
    status: "EN-ARRET",
    tempsArret: "2h 30min",
    tempsMarche: "5h 45min",
    ofseelement:[      
      { label: 'Progression', subtitle: 'Progression de la production', progress: 70 },

      {label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }],
    ofbatterie:[     
      { label: 'Progression', subtitle: 'Progression de la production', progress: 70 },
 
      { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }],
    ofs: [
      { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    kpi: [
      { label: 'TRS', subtitle: 'Taux de rendement synthétique', value: '--' },
      { label: 'TP', subtitle: 'Taux de performance', value: '--' },
      { label: 'TD', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'TQ', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' },
      { label: 'Tde', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    process: [
      { label: 'TC Env [sec]', subtitle: 'Cadence réelle de la phase enveloppeuse', value: '--' },
      { label: 'TC COS [sec]', subtitle: 'Temps de cycle réel de la phase COS', value: '--' },
      { label: 'TC SC [sec]', subtitle: 'Temps de cycle réel soudure des connexions', value: '--' },
      { label: 'TC BC [sec]', subtitle: 'Temps de cycle réel soudure Bac/Couvercle', value: '--' },
      { label: 'TC th [sec]', subtitle: 'Temps de cycle théorique de la ligne', value: '--' }
    ],
    alert: [
      { label: 'Déchet [kg]', subtitle: 'Dernier déchet enregistré par cause', value: '--' },
      { label: 'Arret [sec]', subtitle: 'Dernier arret enregistré par cause', value: '--' },
      { label: 'Qté NC [Kg]', subtitle: 'Dernier quantité NC déclarée par cause', value: '--' }
    ]
  },
  {
    id: 1,
    name: "Assemblage 1 -Sovema1",
    status: "EN-MARCHE",
    tempsArret: "2h 30min",
    tempsMarche: "5h 45min",
    ofseelement:[          { label: 'Progression', subtitle: 'Progression de la production', progress: 70 },

        { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }],
    ofbatterie:[         { label: 'Progression', subtitle: 'Progression de la production', progress: 70 },

         { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }],
    ofs: [,
      { label: 'N°OF', subtitle: 'Numéro de l ordre de fabrication', value: '--' },
      { label: 'Réf Art', subtitle: 'Référence de l article à réaliser', value: '--' },
      { label: 'Qté Obj', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'Production', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    kpi: [
      { label: 'TRS', subtitle: 'Taux de rendement synthétique', value: '--' },
      { label: 'TP', subtitle: 'Taux de performance', value: '--' },
      { label: 'TD', subtitle: 'Quantité objectif à réaliser', value: '--' },
      { label: 'TQ', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' },
      { label: 'Tde', subtitle: 'Quantité réalisée jusqu à l instant', value: '--' }
    ],
    process: [
      { label: 'TC Env [sec]', subtitle: 'Cadence réelle de la phase enveloppeuse', value: '--' },
      { label: 'TC COS [sec]', subtitle: 'Temps de cycle réel de la phase COS', value: '--' },
      { label: 'TC SC [sec]', subtitle: 'Temps de cycle réel soudure des connexions', value: '--' },
      { label: 'TC BC [sec]', subtitle: 'Temps de cycle réel soudure Bac/Couvercle', value: '--' },
      { label: 'TC th [sec]', subtitle: 'Temps de cycle théorique de la ligne', value: '--' }
    ],
    alert: [
      { label: 'Déchet [kg]', subtitle: 'Dernier déchet enregistré par cause', value: '--' },
      { label: 'Arret [sec]', subtitle: 'Dernier arret enregistré par cause', value: '--' },
      { label: 'Qté NC [Kg]', subtitle: 'Dernier quantité NC déclarée par cause', value: '--' }
    ]
  }
];


const MetricCard = ({ title, data, icon: Icon, type }) => (
  <div className={`metrics-card ${type}`}>
    <div className="metric-header">
      <Icon size={20} />
      <span>{title}</span>
    </div>
    <div className="metric-items">
      {data.map((item, index) => (
        <div key={index} className="metric-item">
          <div className="metric-label">
            <span className="metric-value">{item.label}</span>
            <span className="subtitle">{item.subtitle}</span>
          </div>
          {item.progress !== undefined ? (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
            </div>
          ) : (
            <span className="metric-value">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);


const Section = () => {
  return (
    <div className="body">
      <div className="flex-1">
        
        {machines.map((machine) => (
          <div key={machine.id} className="machines-card">
            <div className="card-head">
  <div className="header-left">
    <div className="placeholder-text">
      <img src={m} alt="Logo" className="w-full p-5" style={{marginLeft:'50rem'}} />
    </div>
    <div className="runtime-container">
      <div className="runtime">
        <Clock size={18} />
        <span>{machine.tempsMarche}</span>
      </div>
      <div className="downtime">
        <Clock size={18} />
        <span>{machine.tempsArret}</span>
      </div>
    </div>
  </div>

  <div className="header-right">
    <div className="machine-info">
    <div className="status-badge"style={{marginTop:'-46rem',marginLeft:'1rem' ,width:'8rem',height:'2rem',    backgroundColor: machine.status === "EN-MARCHE" ? "#dcfce7" : "#fde2e2",     color: machine.status === "EN-MARCHE" ? "#47c475" : "#d9534f" // Green text for running, Red text for stopped
// Green for running, Red for stopped
}}>
        <span className='status-dot' style={{      backgroundColor: machine.status === "EN-MARCHE" ? "green" : "red", 
}}></span>
        <span  >{machine.status}</span>
      </div>
      <p>
        Statut: 
        <span 
          style={{ 
            color: machine.status === "EN-ARRET" ? "green" : "red", 
            fontWeight: "bold", 
            marginLeft: "5px"
          }}
        >
        </span>
        </p>
      <h2 className="machin-title" style={{marginTop:'-39rem',marginLeft:'-8em'}}>{machine.name}</h2>
    </div>

 
  </div>
</div>

            <div className="metrics-container">
              {machine.name === "Assemblage 1 -Sovema1" || machine.name === "Assemblage 1 -SOVEMA-2" ? (
                <>
                  {machine.ofseelement && machine.ofseelement.length > 0 && (
                    <MetricCard
                      title="OF | Element OF"
                      data={machine.ofseelement}
                      icon={Package}
                      type="of"
                    />
                  )}
                  {machine.ofbatterie && machine.ofbatterie.length > 0 && (
                    <MetricCard
                      title="OF | Batterie OF"
                      data={machine.ofbatterie}
                      icon={Package}
                      type="of"
                    />
                  )}
                </>
              ) : (
                <MetricCard title="OF | Running OFs" data={machine.ofs} icon={Package} type="of" />
              )}

              <MetricCard title="KPI | Performance de l'UAP" data={machine.kpi} icon={Activity} type="kpi" />
              <MetricCard title="Process | Paramétres process" data={machine.process} icon={Settings} type="process" />
              <MetricCard title="Alerte | Flash incidents" data={machine.alert} icon={AlertTriangle} type="alert" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Section;
