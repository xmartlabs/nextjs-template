import { StoryFn, Meta } from "@storybook/react";
import { useState } from "react";
import { TextArea, TextAreaStatus } from "./text-area";
import MailIcon from "@/common/server/MailIcon";
import CloseIcon from "@/common/server/CloseIcon";

const ICONS = {
  MailIcon,
  CloseIcon,
  undefined,
};

export default {
  title: "Common/Text Area",
  component: TextArea,
  argTypes: {
    status: {
      control: {
        type: "select",
      },
    },
    HelperIcon: {
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
    rows: 4,
    cols: 10,
  } as unknown as Meta<typeof TextArea>,
};

const Template: StoryFn<typeof TextArea> = (args) => {
  const [inputState, setInputState] = useState("");
  const handleIChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputState(e.target.value);
  };
  return (
    <TextArea
      {...args}
      onChange={handleIChange}
      length={inputState?.length}
      value={inputState}
    />
  );
};

export const Default = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperIcon: CloseIcon,
  helperText: "This is just a recommendation",
};

export const WithStatusSuccess = Template.bind({});
WithStatusSuccess.args = {
  helperIcon: CloseIcon,
  helperText: "This is just a recommendation",
  status: TextAreaStatus.success,
};

export const WithStatusError = Template.bind({});
WithStatusError.args = {
  helperIcon: CloseIcon,
  helperText: "This is just a recommendation",
  status: TextAreaStatus.error,
};

export const WithPlaceHolder = Template.bind({});
WithPlaceHolder.args = {
  placeholder: "Enter a nice messaje",
};

export const WithMaxLength = Template.bind({});
WithMaxLength.args = {
  maxLength: 20,
  helperText: "Helper Text",
  helperIcon: CloseIcon,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Label",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  helperIcon: CloseIcon,
  helperText: "Text Area disabled",
  maxLength: 100,
};
