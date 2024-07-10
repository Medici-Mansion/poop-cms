import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-player';

interface LottieAnimationProps {
  url?: string;
  data?: unknown;
}

const LottieAnimation = ({ url, data }: LottieAnimationProps) => {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (url) {
      const fetchAnimationData = async () => {
        try {
          const response = await axios.get(url);
          setAnimationData(response.data);
          // 데이터가 변경될 때마다 animationKey를 변경하여 애니메이션이 재생되도록 함
        } catch (error) {
          console.error('Error fetching Lottie animation data:', error);
        }
      };

      fetchAnimationData().catch((error) => {
        console.error('Error in fetchAnimationData:', error);
      });
    } else if (data) {
      setAnimationData(data);
    }
    setAnimationKey((prevKey) => prevKey + 1);
  }, [url, data]);

  if (!animationData) {
    return <div>Loading...</div>;
  }

  const defaultOptions = {
    loop: true,
    animationData: animationData,
    style: { width: 36, height: 36 },
    autoPlay: true,
    play: true,
  };

  return <Lottie key={animationKey} {...defaultOptions} />;
};

export default LottieAnimation;
