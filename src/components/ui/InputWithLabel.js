import React from 'react';
import { Label, SingleLineTextInput } from '../';

export const InputWithLabel = ({ labelProps, inputProps }) => {
  return (
    <div>
      <Label {...labelProps} />
      <SingleLineTextInput {...inputProps} />
    </div>
  );
};
