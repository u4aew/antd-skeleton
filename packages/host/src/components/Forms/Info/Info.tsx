import React from 'react';
import { Typography, Button } from 'antd';

const { Text, Paragraph } = Typography;

export type InfoProps = {
  text: string;
  buttonText: string;
  onButtonClick: () => void;
};

export const Info: React.FC<InfoProps> = ({
  text,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div>
      <Paragraph>
        <Text>{text}</Text>
      </Paragraph>
      <Paragraph>
        <Button type="primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Paragraph>
    </div>
  );
};
