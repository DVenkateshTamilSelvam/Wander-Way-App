import React from 'react';
import Svg, { Path, ClipPath, Defs, Rect, G } from 'react-native-svg';

const MyBookingIcon = (props) => {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <Defs>
        <ClipPath id="clip0">
          <Rect width={15} height={15} fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip0)">
        <Path
          d="M6.5625 3.75V4.6875H3.75V3.75H6.5625ZM3.75 6.5625V5.625H6.5625V6.5625H3.75ZM3.75 8.4375V7.5H5.625V8.4375H3.75ZM2.8125 3.75V4.6875H1.875V3.75H2.8125ZM2.8125 5.625V6.5625H1.875V5.625H2.8125ZM1.875 8.4375V7.5H2.8125V8.4375H1.875ZM0.9375 0.9375V14.0625H5.625V15H0V0H8.1665L12.1875 4.021V5.625H11.25V4.6875H7.5V0.9375H0.9375ZM8.4375 1.604V3.75H10.5835L8.4375 1.604ZM13.125 7.5H15V15H6.5625V7.5H8.4375V6.5625H9.375V7.5H12.1875V6.5625H13.125V7.5ZM14.0625 14.0625V10.3125H7.5V14.0625H14.0625ZM14.0625 9.375V8.4375H7.5V9.375H14.0625Z"
          fill="#7F7F7F"
        />
      </G>
    </Svg>
  );
};

export default MyBookingIcon;
