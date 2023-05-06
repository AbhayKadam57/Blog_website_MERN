import { css } from "styled-components";

export const tablet = (props) => {
  return css`
    @media screen and (max-width: 768px) {
      ${props}
    }
  `;
};

export const mobile = (props) => {
  return css`
    @media screen and (max-width: 468px) {
      ${props}
    }
  `;
};
