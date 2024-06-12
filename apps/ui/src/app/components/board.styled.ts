import styled from "styled-components";
import { GRID_SIZE, GRID_SIZE_MULTIPLIER } from "../constants";

export const BoardContainer = styled.div`
  margin: 0 auto 20px;
  position: relative;
  width: ${({ theme }) =>
    `calc(${theme.pixelSize} * 7.8 * ${GRID_SIZE} + ${theme.pixelSize} * 5)`};

  @media (min-width: 512px) {
    width: ${({ theme }) =>
      `calc(${theme.pixelSize} * ${GRID_SIZE_MULTIPLIER[GRID_SIZE]} * ${GRID_SIZE} + ${theme.pixelSize} * 13)`};
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.backgrounds.secondary};
  border: ${({ theme }) =>
    `calc(${theme.pixelSize} * 0.5) solid ${theme.backgrounds.secondary}`};
  border-radius: ${({ theme }) => `calc(${theme.pixelSize} * 0.75)`};

  @media (min-width: 512px) {
    border: ${({ theme }) =>
      `calc(${theme.pixelSize} * 0.5) solid ${theme.backgrounds.secondary}`};
  }
`;

export const Cell = styled.div`
  width: ${({ theme }) => `calc(${theme.pixelSize} * 8)`};
  height: ${({ theme }) => `calc(${theme.pixelSize} * 8)`};
  margin: ${({ theme }) => `calc(${theme.pixelSize} * 0.22)`};
  border-radius: ${({ theme }) => `calc(${theme.pixelSize} * 0.5)`};
  background: ${({ theme }) => theme.backgrounds.cell};

  @media (min-width: 512px) {
    width: ${({ theme }) => `calc(${theme.pixelSize} * 12.5)`};
    height: ${({ theme }) => `calc(${theme.pixelSize} * 12.5)`};
    margin: ${({ theme }) => `calc(${theme.pixelSize} * 1)`};
  }
`;

export const TilesContainer = styled.div`
  position: absolute;
  z-index: 2;
  margin: ${({ theme }) => `calc(${theme.pixelSize} * 0.5)`};
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  @media (min-width: 512px) {
    margin: ${({ theme }) => `calc(${theme.pixelSize} / 2)`};
  }
`;
