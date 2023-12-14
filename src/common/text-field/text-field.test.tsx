import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextField } from "./text-field";
import MailIcon from "@/common/icons/MailIcon";
import CloseIcon from "@/common/icons/CloseIcon";

describe("TextField", () => {
  it("should render successfully", async () => {
    const el = render(<TextField name="email" onChange={() => null} />);
    expect(el.findByTestId("input")).toBeTruthy();
  });

  it("should render with Icons", async () => {
    const el = render(
      <TextField
        name="email"
        placeholder="Email"
        onChange={() => null}
        leftIcon={MailIcon}
        rightIcon={CloseIcon}
      />,
    );
    expect(el.findByTestId("left-icon")).toBeTruthy();
    expect(el.findByTestId("right-icon")).toBeTruthy();
  });

  it("should render with Label", async () => {
    const el = render(
      <TextField name="email" label="Label" onChange={() => null} />,
    );
    expect(el.findByText("Label")).toBeTruthy();
  });

  it("should render with Helper Text", async () => {
    const el = render(
      <TextField
        name="email"
        helperText="Helper"
        onChange={() => null}
        helperIcon={CloseIcon}
      />,
    );

    expect(el.findByText("Helper")).toBeTruthy();
    expect(el.findByTestId("helper-icon")).toBeTruthy();
  });
});
