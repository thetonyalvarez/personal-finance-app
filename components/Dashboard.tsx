'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { setProcessedData } from '../lib/slices/dataSlice';
import SummarySection from './SummarySection';
import ChartSection from './ChartSection';
import TableSection from './TableSection';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { processedData } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        dispatch(setProcessedData(data));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchData();
  }, [dispatch]);

  if (!processedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <SummarySection data={processedData.summary} />
      <ChartSection data={processedData.chartData} />
      <TableSection data={processedData.tableData} />
    </div>
  );
};

export default Dashboard;