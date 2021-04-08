import { keyframes } from '@emotion/react';
import palette from './palette';

export const flash = keyframes`
  0%{
    background: ${palette.grey[100]};
  },
  50%{
    background: ${palette.grey[200]};
  },
  100%{
    background: ${palette.grey[100]};
  },
`;
