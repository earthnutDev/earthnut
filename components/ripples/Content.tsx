import { styled } from 'styled-components';

/**  内容组件  */
export const Content = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-width: 1px;
  min-height: 1px;
  contain: layout paint style;
  will-change: transform, opacity;
`;
