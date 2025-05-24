import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = () => {
    // Generate dummy data
    const generateDummyData = () => {
        const labels = [];
        const temperatureData = [];
        const humidityData = [];
        
        let currentTime = new Date();
        for (let i = 10; i >= 0; i--) {
            const timeLabel = new Date(currentTime.getTime() - i * 10 * 60 * 1000).toLocaleTimeString();
            labels.push(timeLabel);
            temperatureData.push(Math.floor(Math.random() * 100));
            humidityData.push(Math.floor(Math.random() * 100));
        }
        return { labels, temperatureData, humidityData };
    };

    const { labels, temperatureData, humidityData } = generateDummyData();

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: temperatureData,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                tension: 0.3,
            },
            {
                label: 'Humidity (%)',
                data: humidityData,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            },
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default WeatherChart;
