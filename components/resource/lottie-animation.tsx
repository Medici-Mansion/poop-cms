import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-player';

interface LottieAnimationProps {
  url: string;
}

const LottieAnimation = ({ url }: LottieAnimationProps) => {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await axios.get(url);
        setAnimationData(response.data);
        // 데이터가 변경될 때마다 animationKey를 변경하여 애니메이션이 재생되도록 함
        setAnimationKey((prevKey) => prevKey + 1);
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
    autoplay: true,
    play: true,
    key: animationKey,
  };

  return <Lottie {...defaultOptions} />;
};

export default LottieAnimation;
