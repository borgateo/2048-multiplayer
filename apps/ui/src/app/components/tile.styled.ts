import styled, { css } from "styled-components";

export const TileStyled = styled.div<{ value: number }>`
  position: absolute;
  width: ${({ theme }) => `calc(${theme.pixelSize} * 8)`};
  height: ${({ theme }) => `calc(${theme.pixelSize} * 8)`};
  margin: ${({ theme }) => `calc(${theme.pixelSize} * 0.5)`};
  border-radius: ${({ theme }) => `calc(${theme.pixelSize} * 0.5)`};
  background: ${({ theme }) => theme.tileBackground};
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: ${({ theme }) => `calc(${theme.pixelSize} * 4)`};
  line-height: ${({ theme }) => `calc(${theme.pixelSize} * 8)`};
  font-weight: bold;
  text-align: center;
  transition-property: left, top, transform;
  transition-duration: 200ms, 200ms, 100ms;

  ${({ value, theme }) =>
    value >= 8 &&
    css`
      color: ${theme.secondaryTextColor};
    `}

  ${({ value, theme }) =>
    value >= 128 &&
    css`
      font-size: calc(${theme.pixelSize} * 3.25);
    `}

  ${({ value, theme }) =>
    value >= 1024 &&
    css`
      font-size: calc(${theme.pixelSize} * 2.75);
    `}

  ${({ value }) =>
    value === 2 &&
    css`
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
        inset 0 0 0 1px rgba(255, 255, 255, 0);
    `}

  ${({ value }) =>
    value === 4 &&
    css`
      background: #ede0c8;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0),
        inset 0 0 0 1px rgba(255, 255, 255, 0);
    `}

  ${({ value }) =>
    value === 8 &&
    css`
      background: #f2b179;
    `}

  ${({ value }) =>
    value === 16 &&
    css`
      background: #f59563;
    `}

  ${({ value }) =>
    value === 32 &&
    css`
      background: #f67c5f;
    `}

  ${({ value }) =>
    value === 64 &&
    css`
      background: #f65e3b;
    `}

  ${({ value }) =>
    value === 128 &&
    css`
      background: #edcf72;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381),
        inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
    `}

  ${({ value }) =>
    value === 256 &&
    css`
      background: #edcc61;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746),
        inset 0 0 0 1px rgba(255, 255, 255, 0.19048);
    `}

  ${({ value }) =>
    value === 512 &&
    css`
      background: #edc850;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
    `}

  ${({ value }) =>
    value === 1024 &&
    css`
      background: #edc53f;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619),
        inset 0 0 0 1px rgba(255, 255, 255, 0.28571);
    `}

  ${({ value }) =>
    value >= 2048 &&
    css`
      background: #edc22e;
      box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556),
        inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    `}

  @media (min-width: 512px) {
    width: ${({ theme }) => `calc(${theme.pixelSize} * 12.5)`};
    height: ${({ theme }) => `calc(${theme.pixelSize} * 12.5)`};
    margin: ${({ theme }) => `calc(${theme.pixelSize} * 1)`};
    font-size: ${({ theme }) => `calc(${theme.pixelSize} * 6)`};
    line-height: ${({ theme }) => `calc(${theme.pixelSize} * 12.5)`};

    ${({ value, theme }) =>
      value >= 128 &&
      css`
        font-size: calc(${theme.pixelSize} * 5.5);
      `}

    ${({ value, theme }) =>
      value >= 1024 &&
      css`
        font-size: calc(${theme.pixelSize} * 4);
      `}
  }
`;
