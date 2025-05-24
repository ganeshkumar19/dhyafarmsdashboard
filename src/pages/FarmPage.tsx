import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ConfigureButton from '../components/ConfigureButton';


interface WeatherStation {
    id: number;
    wind_direction: number;
    rainfall: number;
    light: string;  // Corrected to string
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

  
  

const FarmPage = () => {
  const navigate = useNavigate();
    const fetchFarmData = async (): Promise<Farm[]> => {
        try{
            const response = await axios.get('http://localhost:4000/farms')
            return response.data
        } catch(err){
            console.error('Error fetching farm data:', err)
            throw new Error('Error occurred, please try again')
        }
    }

    const { data, isLoading, isError } = useQuery<Farm[]>({
        queryKey: ['fetchfarmdata'],
        queryFn: fetchFarmData,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <Typography>Loading...</Typography>
    if (isError) return <Typography>Error occurred, please try again.</Typography>
    if (!data) return <Typography>No data available.</Typography>

    const handleFarmClick = (farmId: string) => {
      navigate(`/farmpage/${farmId}`);  // ✅ Matches :farmId in route
    };





    return (
      <Box bgcolor="#f4f6f8" minHeight="100vh" sx={{px: {xs: 2, md: 8 }}} py={0}>
          <Box sx={{ width: '100%', margin: '0 auto', pt: '45px' }}>
                <Box display="flex" justifyContent="flex-end" pr={2} pt={2} >
                 <ConfigureButton />
                </Box>
              <Typography variant="h5" fontFamily={'var(--font-family)'} my={2}>
                  Farms Data
              </Typography>
              <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={3}
                  navigation={{
                  prevEl: '.custom-prev',
                  nextEl: '.custom-next',
                  }}
                  style={{ paddingBottom: '20px', position: 'relative', width: '100%', }}
                  breakpoints={{
                  320: {
                  slidesPerView: 1, // Mobile devices
                  },
                  640: {
                  slidesPerView: 2, // Tablets
                  },
                  1024: {
                  slidesPerView: 3, // Desktop
                  },
                  }}
                >
                  {data.map((farm) => {
                      const totalPonds = farm.ponds.length;
                      const onlinePonds = farm.ponds.filter((pond) => pond.status === 'online').length;
                      const offlinePonds = totalPonds - onlinePonds;

                      return (
                          <SwiperSlide key={farm.farmId}>
                              <Box mb={4} component={Paper} borderRadius={5} bgcolor={'white'} p={3}>
                                  <Box
                                      p={2}
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="space-between"
                                      bgcolor={'var(--secondary-color)'}
                                      borderRadius={2}
                                      mb={2}
                                      color={'white'}
                                  >
                                      <Typography variant="h6">{farm.farmName}</Typography>
                                  </Box>
                                  <Box bgcolor={'var(--primary-color)'} borderRadius={2} p={3} gap={3}>
                                      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} py={1}>
                                      <Typography variant="body2" fontWeight={'bold'} >
                                      Total Ponds
                                      </Typography>
                                      <Typography variant="body2">{totalPonds}</Typography>
                                      </Box>
                                      
                                      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} py={1}>
                                      <Typography variant="body2" fontWeight={'bold'} textAlign={"right"}>
                                      Crop type
                                      </Typography>
                                      <Typography variant="body2">{farm.cropType}</Typography>
                                      </Box>
                                      <Typography variant='body2' component={"p"} fontWeight={"bold"} my={1}>Status</Typography>
                                      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                      <Box display={'flex'} alignItems={'center'} gap={1}>
                                      <Typography variant="body2" fontWeight={'bold'} textAlign={"right"}>
                                      Online:
                                      </Typography>
                                      <Typography variant="body2">{onlinePonds}</Typography>
                                      </Box>
                                      <Box display={'flex'} alignItems={'center'} gap={1}>
                                      <Typography variant="body2" fontWeight={'bold'} textAlign={"right"}>
                                      Offline:
                                      </Typography>
                                      <Typography variant="body2">{offlinePonds}</Typography>
                                      </Box>
                                      </Box>
                                      </Box>
                                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} my={2}>
                                      <Button sx={{ backgroundColor: 'var(--secondary-color)', color: 'white' }} onClick={() => handleFarmClick(farm.id)}>
                                          See More
                                      </Button>
                                  </Box>
                              </Box>
                          </SwiperSlide>
                      );
                  })}
              </Swiper>
              <IconButton className="custom-prev" sx={{ position: 'absolute', left: {xs: 0, sm: 2, md: 180, lg:190, xl: 230}, top: '50%', transform: {xs: 'translateY(-5%)', sm: 'translateY(-80%)', md: 'translateY(-50%)'}, zIndex: 10, color: 'var(--secondary-color)', fontSize: '30px' }}>
              <ArrowBackIos fontSize="inherit" />
              </IconButton>

              <IconButton className="custom-next" sx={{ position: 'absolute', right: {xs: 0, sm: 2, md: 5}, top: '50%', transform: {xs: 'translateY(-5%)', sm: 'translateY(-80%)', md: 'translateY(-50%)'}, zIndex: 10, color: 'var(--secondary-color)', fontSize: '30px' }}>
              <ArrowForwardIos fontSize="inherit" />
              </IconButton>
          </Box>
      </Box>
  );
}

export default FarmPage