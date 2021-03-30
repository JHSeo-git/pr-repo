const custom = (size: number) => `
  @media (max-width: ${size}px)
`;

const media = {
  xxxlarge: custom(2200),
  xxlarge: custom(1920),
  xlarge: custom(1440),
  large: custom(1280),
  medium: custom(1024),
  small: custom(768),
  xsmall: custom(480),
  custom,
};

export default media;
