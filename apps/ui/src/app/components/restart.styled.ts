import styled from "styled-components";

export const Button = styled.div`
  -webkit-user-select: none;
  background: ${({ theme }) => theme.backgrounds.button};
  border-radius: 3px;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.backgrounds.glare};
  color: ${({ theme }) => theme.colors.button};
  cursor: pointer;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.15385;
  margin: 10px auto 20px;
  outline: none;
  padding: 8px 0.8em;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  touch-action: manipulation;
  user-select: none;
  vertical-align: baseline;
  white-space: nowrap;
  width: 150px;

  @media (min-width: 512px) {
    font-size: 16px;
    line-height: 28px;
    padding: 8px;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.backgrounds.buttonHover};
  }

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 149, 255, 0.15);
  }

  &:active {
    background-color: ${({ theme }) => theme.backgrounds.buttonActive};
    box-shadow: none;
  }
`;
