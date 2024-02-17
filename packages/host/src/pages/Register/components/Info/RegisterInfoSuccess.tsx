import React from 'react';
import { Info, InfoProps } from '@host/components/Forms/Info';

type Props = Pick<InfoProps, 'onButtonClick'> & {
  email: string;
};

export const RegisterInfoSuccess = ({ onButtonClick }: Props) => {
  return (
    <Info
      buttonText={'tets 1'}
      text={'tes2'}
      onButtonClick={onButtonClick}
    />
  );
};
