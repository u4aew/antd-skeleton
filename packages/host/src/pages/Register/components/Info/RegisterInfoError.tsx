import React from 'react';
import { Info, InfoProps } from '@host/components/Forms/Info';

type Props = Pick<InfoProps, 'onButtonClick'>;

export const RegisterInfoError = ({ onButtonClick }: Props) => {
  return (
    <Info buttonText={'tets 1'} text={'tes2'} onButtonClick={onButtonClick} />
  );
};
