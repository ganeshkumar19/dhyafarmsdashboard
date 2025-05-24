import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, styled } from "@mui/material";
import '../../assets/styles/pondsdatastyles.css';
import axios from 'axios';
import PondCard from '../../components/PondCard';
import { useQuery } from '@tanstack/react-query';

interface Pond {
  id: number;
  status: string;
  tds: number;
  ph: number;
  oxygen: number;
  score: string;
  weatherstation: { [key: string]: number | string };
}

const MarqueBox = styled(Box)({ 
   overflow: "hidden", whiteSpace: "nowrap", width: "100%", position: "relative", py: 1, borderRadius: "5px"
})

const fetchWeatherData = async () => {
  const response = await axios.get('http://localhost:4000/posts');
  const weatherData = response.data;


  if (weatherData && Array.isArray(weatherData)) {
    const latestWeather = weatherData.reduce((latest, current) => {
      const latestTime = new Date(latest.timestamp || 0).getTime();
      const currentTime = new Date(current.timestamp || 0).getTime();
      return currentTime > latestTime ? current : latest;
    }, weatherData[0]);

    const weatherstation = {
      winddir: latestWeather.wind_direction || 0,
      rainfall: latestWeather.rainfall || 0,
      light: parseFloat(latestWeather.light || 0).toFixed(3),
      temperature: latestWeather.temperature || 0,
      windspeed: latestWeather.wind_speed || 0,
      humidity: latestWeather.humidity || 0,
    };

    return weatherstation;
  }
  return {};
};

const PondsData: React.FC = () => {
  const [pondData, setPondData] = useState<Pond[]>([
    {
      id: 1,
      status: 'online',
      tds: 300,
      ph: 6.6,
      oxygen: 90,
      score: 'Good',
      weatherstation: {},
    },
    {
      id: 2,
      status: 'online',
      tds: 300,
      ph: 6.6,
      oxygen: 90,
      score: 'Good',
      weatherstation: {},
    },
    {
      id: 3,
      status: 'online',
      tds: 300,
      ph: 6.6,
      oxygen: 90,
      score: 'Good',
      weatherstation: {},
    },
    {
      id: 4,
      status: 'online',
      tds: 300,
      ph: 6.6,
      oxygen: 90,
      score: 'Good',
      weatherstation: {},
    },
    {
      id: 5,
      status: 'online',
      tds: 300,
      ph: 6.6,
      oxygen: 90,
      score: 'Good',
      weatherstation: {},
    },
  ]);

  const { data: weatherstation, isLoading, isFetching } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeatherData,
    refetchInterval: 15000, 
    refetchOnWindowFocus: false,// Refetch every 15 seconds
  });

  useEffect(() => {
    if (weatherstation) {
      setPondData((prevData) =>
        prevData.map((pond) => ({ ...pond, weatherstation }))
      );
    }
  }, [weatherstation]);

  const pondProperties = (pond: Pond) => {
    return (
      <span key={pond.id} className="marquee-item">
        Pond {pond.id}: TDS: <span className="pndValue">{pond.tds}</span>, pH:{' '}
        <span className="pndValue">{pond.ph}</span>, Oxygen:{' '}
        <span className="pndValue">{pond.oxygen}%</span>
      </span>
    );
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        backgroundColor: "var(--primary-color)",
        paddingRight: 5,
        minHeight: "1200px",
        overflow: "hidden",
        pt: "70px",
      }}
    >
      <Box
        sx={{
          py: 4,
          mt: 2,
          mb: 4,
          mx: 3,
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "rgba(241, 239, 239, 0.35) 0px 8px 15px",
        }}
      >
        <MarqueBox>
          <Box
            sx={{
              display: "inline-block",
              animation: "scroll-left 13s linear infinite",
              "@keyframes scroll-left": {
                "0%": { transform: "translateX(50%)" },
                "100%": { transform: "translateX(-100%)" },
              },
              "@media (min-width: 992px)": {
                animation: "scroll-left-lg 13s linear infinite",
                "@keyframes scroll-left-lg": {
                  "0%": { transform: "translateX(100%)" },
                  "100%": { transform: "translateX(-100%)" },
                },
              },
            }}
          >
            {pondData.map((pond) => pondProperties(pond))}
          </Box>
        </MarqueBox>
      </Box>
      <Grid container spacing={2} sx={{ mx: 1, mb: 3, paddingRight:4 }}>
        {pondData.map((pond) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pond.id}>
            <PondCard pond={pond} loading={isLoading || isFetching}
              firstTimeFetch={isLoading} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PondsData;
