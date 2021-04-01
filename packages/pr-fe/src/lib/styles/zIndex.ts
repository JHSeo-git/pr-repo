const custom = (z: number) => `
  z-index: ${z}
`;

const zIndex = {
  fullScreenLoader: 900,
  alert: 600,
  modal: 500,
  fixedHeader: 300,
  fixedFooter: 300,
  custom,
};

export default zIndex;
