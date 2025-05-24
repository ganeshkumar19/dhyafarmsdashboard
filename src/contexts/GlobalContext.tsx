import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the structure of a single graph data item
interface GraphData {
  title: string;
  data: number[];
  yMin: number;
  yMax: number;
  stepSize: number;
  average: number;
  live: number | string;
  status: string;
  statusColor: string;
}

// Define the structure of the average values state
interface AverageValues {
  averageTDS: number;
  averagePH: number;
  averageTemperature: number;
}

// Define the context value type
interface GlobalContextType {
  graphDataArray: GraphData[];
  fetchLiveData: () => Promise<void>;
  averageValues: AverageValues;
}

// Create the context with a default value
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the props for the provider
interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [averageValues, setAverageValues] = useState<AverageValues>({
    averageTDS: 0,
    averagePH: 0,
    averageTemperature: 0,
  });

  const [graphDataArray, setGraphDataArray] = useState<GraphData[]>([
    {
      title: 'TDS',
      data: [],
      yMin: 100,
      yMax: 600,
      stepSize: 50,
      average: 0,
      live: 0,
      status: 'Average',
      statusColor: '#F2C94C',
    },
    {
      title: 'pH',
      data: [],
      yMin: 4,
      yMax: 11,
      stepSize: 1,
      average: 0,
      live: 0,
      status: 'Poor',
      statusColor: '#FF0000',
    },
    {
      title: 'Temperature',
      data: [],
      yMin: 24,
      yMax: 36,
      stepSize: 1,
      average: 0,
      live: 0,
      status: 'Good',
      statusColor: '#00FF00',
    },
  ]);

  const [isFirstFetch, setIsFirstFetch] = useState(true);

  // Helper function to validate values
  const validateValue = (value: any): number => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  // Helper function to determine status and color
  const getStatusAndColor = (
    latestValue: number,
    min: number,
    max: number
  ): { status: string; color: string } => {
    if (latestValue > max || latestValue < min) {
      return { status: 'Poor', color: '#FF0000' };
    }
    return { status: 'Normal', color: '#F7CF69' };
  };

  // Helper function to get the latest 8 data points
  const getLatest8Data = (data: any[]): any[] => {
    return data
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8)
      .reverse();
  };

  // Function to fetch live data
  const fetchLiveData = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://091eu2vuig.execute-api.us-east-1.amazonaws.com/timestreamtoapi'
      );
      const apiData = response.data;

      console.log('apidata', apiData)

      // Get the latest 8 data points
      const latest8Data = getLatest8Data(apiData);

      // Extract the latest record
      const latestRecord = latest8Data[latest8Data.length - 1];

      // Calculate averages
      const averageTDS = parseFloat(
        (
          latest8Data.reduce((sum, item) => sum + validateValue(item.tds), 0) /
          latest8Data.length
        ).toFixed(2)
      );
      const averagePH = parseFloat(
        (
          latest8Data.reduce((sum, item) => sum + validateValue(item.ph), 0) /
          latest8Data.length
        ).toFixed(2)
      );
      const averageTemperature = parseFloat(
        (
          latest8Data.reduce((sum, item) => sum + validateValue(item.temperature), 0) /
          latest8Data.length
        ).toFixed(2)
      );

      setAverageValues({ averageTDS, averagePH, averageTemperature });

      // Get status and color
      const tdsStatus = getStatusAndColor(validateValue(latestRecord.tds), 100, 150);
      const phStatus = getStatusAndColor(validateValue(latestRecord.ph), 6.5, 9.0);
      const temperatureStatus = getStatusAndColor(
        validateValue(latestRecord.temperature),
        22,
        29
      );

      // Update the graph data array
      setGraphDataArray((prevGraphDataArray) =>
        prevGraphDataArray.map((graph, index) => {
          let newData = [...graph.data];

          if (isFirstFetch) {
            // First fetch: Add all 8 data points
            if (index === 0) newData = latest8Data.map((item) => validateValue(item.tds));
            if (index === 1) newData = latest8Data.map((item) => validateValue(item.ph));
            if (index === 2)
              newData = latest8Data.map((item) => validateValue(item.temperature));
          } else {
            // Subsequent fetch: Add latest value and remove oldest if length exceeds 8
            if (newData.length >= 8) newData.shift();
            if (index === 0) newData.push(validateValue(latestRecord.tds));
            if (index === 1) newData.push(validateValue(latestRecord.ph));
            if (index === 2) newData.push(validateValue(latestRecord.temperature));
          }

          if (graph.title === 'TDS') {
            return {
              ...graph,
              data: newData,
              average: averageTDS,
              live: validateValue(latestRecord.tds),
              status: tdsStatus.status,
              statusColor: tdsStatus.color,
            };
          }
          if (graph.title === 'pH') {
            return {
              ...graph,
              data: newData,
              average: averagePH,
              live: validateValue(latestRecord.ph),
              status: phStatus.status,
              statusColor: phStatus.color,
            };
          }
          if (graph.title === 'Temperature') {
            return {
              ...graph,
              data: newData,
              average: averageTemperature,
              live: validateValue(latestRecord.temperature),
              status: temperatureStatus.status,
              statusColor: temperatureStatus.color,
            };
          }
          return graph;
        })
      );

      if (isFirstFetch) setIsFirstFetch(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data every 5 seconds
  useEffect(() => {
    fetchLiveData(); // Initial fetch
    const intervalId = setInterval(fetchLiveData, 5000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <GlobalContext.Provider value={{ graphDataArray, fetchLiveData, averageValues }}>
      {children}
    </GlobalContext.Provider>
  );
};
