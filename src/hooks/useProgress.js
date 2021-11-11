import { useState } from 'react';
import mockApi from '../api/mockApi';

export default function useProgress() {
    const [progress, setProgress] = useState(0);

    const getProgress = async () => {
        try {
            const response = await mockApi.get('/progress');
            setProgress(response.data.progress);
        } catch (error) {
            console.log(error)
        }
    };

    return {progress: progress, getProgress: getProgress};
};

