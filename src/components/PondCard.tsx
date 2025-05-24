import React, { useEffect, useState } from 'react';
import '../assets/styles/pondcardstyles.css';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from "@mui/material";

// Define the prop types for PondCard
interface Pond {
  id: number;
  status: string;
  tds: number;
  ph: number;
  oxygen: number;
  score: string;
  weatherstation: { [key: string]: number | string };
}

interface PondCardProps {
  pond: Pond;
  loading: boolean;
  firstTimeFetch: boolean;
}

const PondCard: React.FC<PondCardProps> = ({ pond, loading, firstTimeFetch }) => {
  const navigate = useNavigate();

  const pondProperties = [
    { label: 'tds', value: `${pond.tds} ppm` },
    { label: 'ph', value: pond.ph },
    { label: 'oxygen', value: `${pond.oxygen}%` },
    { label: 'score', value: pond.score },
  ];

  const weatherStationMapping: Record<
    string,
    { label: string; suffix: string }
  > = {
    winddir: { label: 'Wind Direction', suffix: '°' },
    rainfall: { label: 'Rainfall', suffix: ' mm' },
    light: { label: 'Light Intensity', suffix: ' lux' },
    temperature: { label: 'Temperature', suffix: ' °C' },
    windspeed: { label: 'Wind Speed', suffix: ' m/s' },
    humidity: { label: 'Humidity', suffix: '%' },
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const weatherKeys = Object.keys(pond.weatherstation);
  const weatherValues = Object.values(pond.weatherstation);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weatherKeys.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [weatherKeys.length]);

  const handleLogin = () => {
    navigate('/landing');
  };

  const currentWeatherKey = weatherKeys[currentIndex];
  const currentWeatherValue = weatherValues[currentIndex];
  const weatherLabel =
    weatherStationMapping[currentWeatherKey]?.label || currentWeatherKey;
  const weatherSuffix =
    weatherStationMapping[currentWeatherKey]?.suffix || '';

  return (
    <Box 
      className="pondContainer"
      sx={{
        p: 2,
        borderRadius: 5,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      {/* Pond Status Section */}
      <Box 
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 2, py: 1, backgroundColor: "var(--secondary-color)", borderRadius: 1 , color: 'white'}}
      >
        <Typography variant="body1" fontWeight="bold" fontFamily="var(--font-family)">{`Pond ${pond.id}`}</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: pond.status === "online" ? "#0AC50A" : "red",
              boxShadow: pond.status === "online" 
                ? "rgba(41, 235, 3, 0.577) 0px 5px 15px" 
                : "rgba(235, 3, 3, 0.577) 0px 5px 15px",
            }}
          />
          <Typography variant="body2">{pond.status}</Typography>
        </Box>
      </Box>

      {/* Pond Properties Section */}
      <Box sx={{ px: 3, py: 3, mt: 2, backgroundColor: "var(--primary-color)", borderRadius: 3 }}>
        {pondProperties.map((property, index) => (
          <Box 
            key={index} 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            py={1}
          >
            <Typography variant="body2" fontWeight="bold" sx={{fontFamily: "var(--font-family)"}}>{property.label}</Typography>
            <Typography variant="body2">{property.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* Weather Station Section */}
      <Box sx={{ px: 1, py: 1, mt: 1, borderRadius: 1 }}>
        <Typography variant="h6" fontWeight="bold" sx={{fontSize: '16px', fontFamily: "var(--font-family)"}}>Weather Station</Typography>
        {loading && firstTimeFetch ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <CircularProgress size={10} sx={{ color: "var(--secondary-color)" }} />
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
            <Typography variant="body2" fontWeight="bold" fontFamily="var(--font-poppins)" fontSize="18px">{weatherLabel}</Typography>
            <Typography variant='body2' fontFamily="var(--font-poppins)" fontWeight="medium" fontSize="16px">{currentWeatherValue}{weatherSuffix}</Typography>
          </Box>
        )}
      </Box>

      {/* See More Button */}
      <Box display="flex" justifyContent="center" alignItems="center" my={1}>
        <Button 
          variant="contained" 
          sx={{ px: 4, py: 1, backgroundColor: "#0B7ABF", "&:hover": { backgroundColor: "#086699" } }} 
          onClick={handleLogin}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default PondCard;
