import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  ScaleOptionsByType,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define prop types for GraphBox
interface GraphBoxProps {
  title: string;
  data: number[];
  yMin: number;
  yMax: number;
  stepSize: number;
  average: number;
  live: string | number;
  status: string;
  statusColor: string;
}

const GraphBox: React.FC<GraphBoxProps> = ({
  title,
  data,
  yMin,
  yMax,
  stepSize,
  average,
  live,
  status,
  statusColor,
}) => {
  const chartData = {
    labels: ['13/6', '14/6', '15/6', '16/6', '17/6', '18/6', '19/6', '20/6'],
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: '#9DCEFF',
        borderRadius: 0,
        barThickness: 10,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: title, // Title of the chart
        align: 'start', // Must be 'start' | 'center' | 'end'
        font: {
          size: 18,
          weight: 500, // Use a number for font weight
        },
      },
    },
    scales: {
      x: {
        type: 'category', // Explicitly set the type
        ticks: {
          color: '#000000',
          font: {
            family: 'Poppins',
            weight: 500, // Use a number for font weight
            style: 'normal',
            size: 8,
          },
        },
        grid: {
          display: false, // Remove grid lines from the x-axis
        },
      },
      y: {
        type: 'linear', // Explicitly set the type
        beginAtZero: false,
        min: yMin,
        max: yMax,
        ticks: {
          stepSize: stepSize,
          color: '#000000',
          font: {
            family: 'Poppins',
            weight: 500, // Use a number for font weight
            style: 'normal',
            size: 8,
          },
        },
        grid: {
          drawTicks: true, // Ensure tick marks are drawn
          drawOnChartArea: true, // Draw the grid lines on the chart area
          color: (context: any) => {
            if (context.tick.value === average) {
              return '#ffffff'; // Green color for grid line at the average
            }
            return 'transparent'; // Transparent grid lines for other values
          },
        },
      },
    },
  };
  
  
  

  return (
    <Grid item xs={12} md={6} lg={6} xl={4}>
      <Box
        sx={{
          backgroundColor: "white",
          minHeight: "250px",
          borderRadius: "20px",
          boxShadow: "rgba(241, 239, 239, 0.35) 0px 8px 15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Chart Section */}
        <Box sx={{ height: "250px", p: "10px" }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>

        {/* Graph Data Section */}
        <Box
          sx={{
            backgroundColor: "#0B7ABF",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            p: "10px",
            color: "white",
            textAlign: "center",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "10px" }}>
              Live
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "14px", mt: 1 }}>
              {live}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "10px" }}>
              Average
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "14px", mt: 1 }}>
              {average}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "10px" }}>
              Status
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "14px", mt: 1, color: statusColor }}>
              {status}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default GraphBox;

