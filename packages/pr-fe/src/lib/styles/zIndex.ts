const custom = (z: number) => `
  z-index: ${z}
`;

const zIndex = {
  fullScreenLoader: custom(900),
  alert: custom(600),
  modal: custom(500),
  fixedHeader: custom(300),
  fixedFooter: custom(300),
  fixedTOC: custom(200),
  absoluteImg: custom(100),
  custom,
};

export default zIndex;
