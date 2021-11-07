import { useState } from 'react';
import mockApi from '../api/mockApi';

export default function useProgress() {
    const [progress, setProgress] = useState(0);

    const getProgress = async () => {
      const response = await mockApi.get('/progress');
      setProgress(response.data.progress);
    };

    return {progress: progress, getProgress: getProgress};
};

