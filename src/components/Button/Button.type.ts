import React from 'react';

export type Props = {
  text: string;
  color?: 'primary' | 'error' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
