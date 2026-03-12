import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div className="card">
      <Bar options={options} data={data} />
    </div>
  );
};

export const PieChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '300px', height: '300px' }}>
        <Pie options={options} data={data} />
      </div>
    </div>
  );
};

export const LineChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: !!title, text: title },
    },
  };

  return (
    <div className="card">
      <Line options={options} data={data} />
    </div>
  );
};

// Default export of some mock data for demo
export const chartMockData = {
  rolesDistribution: {
    labels: ['Admins', 'Teachers', 'Students', 'Pending Requests'],
    datasets: [
      {
        label: 'Platform Users',
        data: [5, 42, 350, 12],
        backgroundColor: [
          'rgba(239, 68, 68, 0.6)',   // danger
          'rgba(245, 158, 11, 0.6)',  // warning
          'rgba(37, 99, 235, 0.6)',   // primary
          'rgba(34, 197, 94, 0.6)',   // accent
        ],
        borderWidth: 1,
      },
    ],
  },
  growthData: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'User Growth',
        data: [100, 150, 180, 240, 310, 400],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
      },
    ],
  },
};
