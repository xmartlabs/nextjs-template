import { StoryFn, Meta } from "@storybook/react";
import { useState } from "react";
import { TextField, TextFieldStatus } from "./text-field";
import MailIcon from "@/common/Icons/MailIcon";
import CloseIcon from "@/common/Icons/CloseIcon";

const ICONS = {
  MailIcon,
  CloseIcon,
  undefined,
};

export default {
  title: "Common/Text Field",
  component: TextField,
  argTypes: {
    status: {
      control: {
        type: "select",
      },
    },
    leftIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
        labels: {
          undefined: "None",
          MailSVG: "Mail",
          CloseSVG: "Close",
        },
      },
    },
    rightIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
        labels: {
          undefined: "None",
          MailSVG: "Mail",
          CloseSVG: "Close",
        },
      },
    },
    helperIcon: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
        labels: {
          undefined: "None",
          MailSVG: "Mail",
          CloseSVG: "Close",
        },
      },
    },
  },
  args: {
    name: "example",
  } as unknown as Meta<typeof TextField>,
};

const Template: StoryFn<typeof TextField> = (args) => {
  const [inputState, setInputState] = useState("");
  const handleIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  return <TextField {...args} onChange={handleIChange} value={inputState} />;
};

export const Default = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperIcon: MailIcon,
  helperText: "This is just a recommendation",
};

export const WithStatusSuccess = Template.bind({});
WithStatusSuccess.args = {
  helperIcon: MailIcon,
  helperText: "This is just a recommendation",
  status: TextFieldStatus.success,
};

export const WithStatusError = Template.bind({});
WithStatusError.args = {
  helperIcon: MailIcon,
  helperText: "This is just a recommendation",
  status: TextFieldStatus.error,
};

export const WithPlaceHolder = Template.bind({});
WithPlaceHolder.args = {
  placeholder: "Enter a nice messaje",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Label",
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  leftIcon: MailIcon,
  rightIcon: CloseIcon,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperIcon: CloseIcon,
  helperText: "Input disabled",
};
