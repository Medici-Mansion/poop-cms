'use client';

import { ClipLoader } from 'react-spinners';

interface LoadingProps {
  size?: number;
}
export const Loading = ({ size }: LoadingProps) => {
  return (
    <div className="flex h-7 w-7 items-center justify-center">
      <ClipLoader color="foreground" size={size || 24} />
    </div>

    //     <div className="flex h-full w-full items-center justify-center">
    //     <ClipLoader color="foreground" size={50} />
    //   </div>
  );
};
