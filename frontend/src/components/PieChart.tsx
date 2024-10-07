import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ emissionsData }) => {
  // Prepare data for the pie chart
  const data = {
    labels: Object.keys(emissionsData),
    datasets: [
      {
        label: 'CO2 Emissions (kg)',
        data: Object.values(emissionsData),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="text-lg font-semibold mb-4">CO2 Emissions by Type</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
