import React from 'react';
import './index.css';
import styles from './index.module.css';
import { Button } from "antd"

export interface ButtonConcatProps {

}

/**
 * Primary UI component for user interaction
 */
export const ButtonConcat: React.FC<ButtonConcatProps> = ({
  ...props
}) => {
  return (
    <div className={`${styles.btnConcat} btnConcat`}>
      <Button>按钮左</Button>
      <Button>按钮右</Button>
    </div>
  );
};
