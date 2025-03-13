import React from 'react';
import Svg, { Path, Circle, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const NotificationBellIcon = (props) => {
  return (
    <Svg width={24} height={27} viewBox="0 0 24 27" fill="none" {...props}>
      <Defs>
        <Filter id="shadow" x="-2" y="0" width="27" height="27" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <FeOffset dy="4" />
          <FeGaussianBlur stdDeviation="2" />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </Filter>
      </Defs>

      <G filter="url(#shadow)">
        <Path
          d="M18.625 15.0417V15.8333H4.375V15.0417L5.95833 13.4583V8.70833C5.95833 6.25417 7.56542 4.09292 9.91667 3.39625V3.16667C9.91667 2.74674 10.0835 2.34401 10.3804 2.04708C10.6773 1.75015 11.0801 1.58333 11.5 1.58333C11.9199 1.58333 12.3227 1.75015 12.6196 2.04708C12.9165 2.34401 13.0833 2.74674 13.0833 3.16667V3.39625C15.4346 4.09292 17.0417 6.25417 17.0417 8.70833V13.4583L18.625 15.0417ZM13.0833 16.625C13.0833 17.0449 12.9165 17.4477 12.6196 17.7446C12.3227 18.0415 11.9199 18.2083 11.5 18.2083C11.0801 18.2083 10.6773 18.0415 10.3804 17.7446C10.0835 17.4477 9.91667 17.0449 9.91667 16.625"
          fill="black"
          fillOpacity="0.81"
        />
        <Circle cx="17" cy="3" r="3" fill="#FFD700" />
      </G>
    </Svg>
  );
};

export default NotificationBellIcon;
