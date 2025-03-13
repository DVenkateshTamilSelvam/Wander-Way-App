import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LocationIcon = (props) => {
  return (
    <Svg width={18} height={17} viewBox="0 0 18 17" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00004 15.0086L9.54089 14.433C10.1546 13.7692 10.7066 13.1394 11.1977 12.5403L11.6032 12.0352C13.296 9.88104 14.1429 8.17133 14.1429 6.90766C14.1429 4.21033 11.8406 2.0238 9.00004 2.0238C6.15946 2.0238 3.85718 4.21033 3.85718 6.90766C3.85718 8.17133 4.70403 9.88104 6.39689 12.0352L6.80232 12.5403C7.50298 13.3882 8.23604 14.211 9.00004 15.0086Z"
        stroke="#7F7F7F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.00003 8.90477C10.1835 8.90477 11.1429 7.99868 11.1429 6.88096C11.1429 5.76324 10.1835 4.85715 9.00003 4.85715C7.81657 4.85715 6.85718 5.76324 6.85718 6.88096C6.85718 7.99868 7.81657 8.90477 9.00003 8.90477Z"
        stroke="#7F7F7F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LocationIcon;
