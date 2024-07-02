import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-player';

interface LottieAnimationProps {
  url: string;
}

const LottieAnimation = ({ url }: LottieAnimationProps) => {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await axios.get(url);
        setAnimationData(response.data);
      } catch (error) {
        console.error('Error fetching Lottie animation data:', error);
      }
    };

    fetchAnimationData().catch((error) => {
      console.error('Error in fetchAnimationData:', error);
    });
  }, [url]);

  if (!animationData) {
    return <div>Loading...</div>;
  }

  const defaultOptions = {
    loop: true,
    animationData: animationData,
    style: { width: 36, height: 36 },
    play: true,
  };

  return <Lottie {...defaultOptions} />;
};

export default LottieAnimation;
