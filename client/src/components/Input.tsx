import { InputProps, Input as RebassInput } from '@rebass/forms';
import { transparentize } from 'polished';
import React from 'react';

type Props = InputProps;

export default function Input(props: Props) {
  return (
    <RebassInput
      {...props}
      sx={{
        bg: transparentize('0.8', 'white'),
        borderRadius: 4,
      }}
    />
  );
}
