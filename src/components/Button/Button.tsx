import React from 'react';
import { BaseButton } from './Button.styled';
import { Props } from './Button.type';

export const Button = ({ text, onClick, color = 'primary' }: Props) => {
  return (
    <BaseButton data-testid="button" color={color} variant="contained" onClick={onClick}>
      {text}
    </BaseButton>
  );
};
