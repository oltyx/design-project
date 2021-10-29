import { useState } from 'react';
import mockApi from '../api/mockApi';

const useProgress = () => {
    const [progress, setProgress] = useState(0);

    const getProgress = async () => {
      const response = await mockApi.get('/progress');
      setProgress(response.data.progress);
    };

    return [progress, getProgress];
};

export default useProgress;
