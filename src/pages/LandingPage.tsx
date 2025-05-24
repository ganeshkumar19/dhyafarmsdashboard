import React, { useContext } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import ChatBox from '../components/ChatBox';
import CameraInput from '../components/CameraInput';
import GraphBox from '../components/GraphBox';
import { GlobalContext } from '../contexts/GlobalContext';
import ReportBox from '../components/ReportBox';

interface GraphData {
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

// Define the shape of GlobalContext
interface GlobalContextType {
  graphDataArray: GraphData[];
}

const LandingPage: React.FC = () => {
  const { graphDataArray } = useContext(GlobalContext) as GlobalContextType;

  return (
    <Box
      sx={{
        pt: "70px",
        width: "100%",
        backgroundColor: "var(--primary-color)",
        minHeight: "800px",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={4} lg={3}>
          <Box sx={{ m: 0, p: 0, ml: 2 }}>
            <Typography
              sx={{
                fontFamily: "var(--font-family)",
                fontWeight: 500,
                fontStyle: "normal",
                color: "black",
                fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" }, // Responsive Font Size
              }}
            >
              Welcome to your AquaMetrics Dashboard, where precise monitoring meets efficient fish farm management.
            </Typography>
          </Box>
          <ReportBox />

          {/* ChatBox visible only on small screens */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <ChatBox />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={8} lg={9}>
          <CameraInput />
          <Box sx={{ width: "100%", mt: 2, paddingRight:4 }}>
          <Grid container spacing={2} sx={{ my: 3, mx: 1 }} width="100%">
            {graphDataArray.map((graph, index) => (
              <GraphBox
                key={index}
                title={graph.title}
                data={graph.data}
                yMin={graph.yMin}
                yMax={graph.yMax}
                stepSize={graph.stepSize}
                average={graph.average}
                live={graph.live}
                status={graph.status}
                statusColor={graph.statusColor}
              />
            ))}
          </Grid>
          </Box>
        </Grid>

        {/* ChatBox visible only on medium and larger screens */}
        <Grid item xs={12} sx={{ display: { xs: "none", md: "block" }, my: 2 }}>
          <ChatBox />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
