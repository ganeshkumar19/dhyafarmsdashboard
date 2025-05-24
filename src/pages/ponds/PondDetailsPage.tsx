
import { Box, Button, FormControl, Grid, Grid2, IconButton, InputLabel, MenuItem, Paper, Select, styled, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import WeatherChart from '../../components/WeatherChart'

interface WeatherStation {
    id: number;
    wind_direction: number;
    rainfall: number;
    light: string; 
    temperature: number;
    wind_speed: number;
    humidity: number;
    timestamp: string;
  }
  
  interface Pond {
    pondId: string;
    status: string;
    tds: number;
    ph: number;
    oxygen: number;
    score: number;
   
  }
  
  interface Farm {
    farmId: string;
    farmName: string;
    cropType: string,
    ponds: Pond[];
    weatherStation: WeatherStation;
    id: string;  
  }

  const weatherLabels = {
    wind_direction: 'Wind Direction',
    rainfall: 'Rainfall',
    light: 'Light Intensity',
    temperature: 'Temperature',
    wind_speed: 'Wind Speed',
    humidity: 'Humidity',
  };
  
  const weatherUnits = {
    wind_direction: '°',
    rainfall: ' mm',
    light: ' lx',
    temperature: '°C',
    wind_speed: ' m/s',
    humidity: ' %',
  };

const PondDetailsPage = () => {
    const { id } = useParams();

    const fetchFarmById = async (farmId: string): Promise<Farm> => {
        try {
            const response = await axios.get(`http://localhost:4000/farms/${farmId}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching farm details:', err);
            throw new Error('Error occurred, please try again');
        }
    };
    
    const { data: farm, isLoading, isError } = useQuery({
        queryKey: ['fetchFarmById', id],
        queryFn: () => fetchFarmById(id!),
        enabled: !!id,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <Typography>Loading...</Typography>;
    if (isError) return <Typography>Error occurred, please try again.</Typography>;
    if (!farm) return <Typography>No data available.</Typography>;

    const PondDetailsBox = styled(Box)({
      backgroundColor: '#f4f6f8', minHeight: '100vh', paddingBottom:'40px'
    })
    return (
            <PondDetailsBox>
            <Box sx={{ width: '90%', margin: '0 auto', pt: '80px' }}>
            <Box key={farm.farmId} mb={4}>
            <Typography variant="h5" fontFamily={'var(--font-family)'} my={2}>
            {farm.farmName}
            </Typography>
            <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
            }}
            style={{ paddingBottom: '15px', position: 'relative', width: '100%', }}
            breakpoints={{
            
            0: {
            slidesPerView: 1, // Mobile devices
            },
            640: {
            slidesPerView: 2, // Tablets
            },
            1024: {
            slidesPerView: 4, // Desktop
            },
            }}
            >
            {farm.ponds.map((pond) => (
            <SwiperSlide key={pond.pondId}>
            <Box component={Paper} borderRadius={5} bgcolor={'white'} p={2}>
            <Box
            p={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor={'var(--secondary-color)'}
            borderRadius={2}
            color={"white"}
            mb={2}
            >
            <Typography>Pond {pond.pondId}</Typography>
            <Typography>{pond.status}</Typography>
            </Box>
            <Box bgcolor={'var(--primary-color)'} borderRadius={2} p={3} gap={2}>
            {['tds', 'ph', 'oxygen', 'score'].map((key) => (
                    <Box key={key} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                      <Typography variant="body2" fontWeight={'bold'}>{key.toUpperCase()}</Typography>
                      <Typography variant="body2">{pond[key as keyof Pond]}</Typography>
                    </Box>
                  ))}
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} my={2}>
            <Button sx={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}>
            See More
            </Button>
            </Box>
            </Box>
            </SwiperSlide>
            ))}
            </Swiper>
            <IconButton className="custom-prev" sx={{ position: 'absolute', left: {xs: 0, sm: 2, md: 5}, top: '50%', transform: {xs: 'translateY(-95%)', sm: 'translateY(-80%)', md: 'translateY(-150%)'}, zIndex: 10, color: 'var(--secondary-color)', fontSize: '30px' }}>
            <ArrowBackIos fontSize="inherit" />
            </IconButton>

            <IconButton className="custom-next" sx={{ position: 'absolute', right: {xs: 0, sm: 2, md: 5}, top: '50%', transform: {xs: 'translateY(-100%)', sm: 'translateY(-80%)', md: 'translateY(-150%)'}, zIndex: 10, color: 'var(--secondary-color)', fontSize: '30px' }}>
            <ArrowForwardIos fontSize="inherit" />
            </IconButton>
            </Box>
            <Box>
                <Typography variant='h6' fontFamily={'var(--font-family)'} my={1}>Weather Station</Typography>
            </Box>
           
          <Grid container spacing={3} my={2} mb={4}>
          {Object.entries(farm.weatherStation).map(([key, value]) =>
            key !== 'id' && key !== 'timestamp' ? (
              <Grid item xs={6} md={4} lg={3} key={key}>
                <Paper elevation={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: '20px', gap: '20px', flexDirection: 'column' , bgcolor: 'var(--primary-color)',  transition: 'transform 0.2s', "&:hover": { transform: 'scale(1.05)' } }} >
                  <Typography variant='h6' fontFamily={'var(--font-family)'} textAlign={"center"} sx={{fontSize: {xs: '13px', sm: '15px', md: '16px'}}}>
                    {weatherLabels[key as keyof typeof weatherLabels]}
                  </Typography>
                  <Typography variant='body1' fontFamily={'var(--font-family)'}>
                    {value}{weatherUnits[key as keyof typeof weatherUnits]}
                  </Typography>
                </Paper>
              </Grid>
            ) : null
          )}
           </Grid>
           <WeatherChart/>
            </Box>
            </PondDetailsBox>
          
    );
};

export default PondDetailsPage;
