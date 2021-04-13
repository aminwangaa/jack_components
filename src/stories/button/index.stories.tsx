import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ButtonConcat, ButtonConcatProps } from '../../components/button/index';

export default {
  title: 'Example/Button',
  component: ButtonConcat,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonConcatProps> = (args) => <ButtonConcat {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

