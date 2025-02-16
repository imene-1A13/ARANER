import React from 'react';
import '../assets/Styles/dashboard.css'
const MachineCard = ({ machine }) => {
    if (!machine) {
      return <div className="text-gray-500">No machine data available</div>;
    }
  
    const getStatusColor = (status) => {
      return status === 'Active' ? 'bg-green-500' : 'bg-red-500';
    };
  
    const getProgressColor = (name, value) => {
      if (name === 'Temperature' && value < 70) return 'bg-orange-500';
      if (value >= 90) return 'bg-green-500';
      if (value >= 80) return 'bg-green-500';
      return 'bg-blue-500';
    };
  
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex gap-6">
          {/* Left side with image placeholder */}
          <div className="bg-gray-100 w-[400px] h-[300px] rounded-lg flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div>400</div>
              <div>×</div>
              <div>300</div>
            </div>
          </div>
  
          {/* Right side with machine info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(machine.status)}`}></div>
              <span className="text-sm text-gray-600">{machine.status}</span>
            </div>
  
            <h2 className="text-xl font-semibold mb-2">{machine.name || 'Unnamed Machine'}</h2>
  
            <div className="flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>Runtime: {machine.runtime || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1 text-red-600">
                <span>Downtime: {machine.downtime || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Rest of the component remains unchanged */}
      </div>
    );
  };
  
  export default MachineCard;