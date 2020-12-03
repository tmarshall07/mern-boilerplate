import React from 'react';
import { Button as RebassButton, ButtonProps, SxProps } from 'rebass/styled-components';

type Props = ButtonProps;

export default function Button(props: Props) {
  const { sx = {}, ...rest } = props;
  return (
    <RebassButton
      sx={{
        cursor: 'pointer',
        ...sx,
      }}
      {...rest}
    />
  );
}
