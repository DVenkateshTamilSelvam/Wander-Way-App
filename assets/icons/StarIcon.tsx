import React from 'react';
import Svg, { Path } from 'react-native-svg';

const StarIcon = (props) => {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M6 8.635L9.09 10.5L8.27 6.985L11 4.62L7.405 4.315L6 1L4.595 4.315L1 4.62L3.73 6.985L2.91 10.5L6 8.635Z"
        fill="#FFD700"
      />
    </Svg>
  );
};

export default StarIcon;
