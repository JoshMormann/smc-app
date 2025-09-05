"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Field — https://app.subframe.com/6b68d96d3e29/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 * WarningDialog — https://app.subframe.com/6b68d96d3e29/library?component=WarningDialog_048922b0-919f-4630-b0ce-70d4c7551ffb
 */

import React from "react";
import { FeatherX } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { TextField } from "./TextField";

interface WarningDialogRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}

const WarningDialogRoot = React.forwardRef<
  HTMLDivElement,
  WarningDialogRootProps
>(function WarningDialogRoot(
  { title, subtitle, className, ...otherProps }: WarningDialogRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "flex h-full w-full flex-col items-start gap-4 bg-default-background px-6 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between">
        {title ? (
          <span className="text-heading-2 font-heading-2 text-default-font">
            {title}
          </span>
        ) : null}
        <IconButton size="large" icon={<FeatherX />} />
      </div>
      {subtitle ? (
        <span className="text-heading-3 font-heading-3 text-error-600">
          {subtitle}
        </span>
      ) : null}
      <TextField
        className="h-auto w-full flex-none"
        variant="filled"
        label="Type DELETE to confirm"
        helpText="You don't have to do this..."
      >
        <TextField.Input placeholder="Are you sure?" />
      </TextField>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <div className="flex w-full items-center justify-between">
        <Button variant="neutral-primary">Cancel</Button>
        <Button variant="destructive-secondary">Delete Account</Button>
      </div>
    </div>
  );
});

export const WarningDialog = WarningDialogRoot;
