"use client";
/*
 * Documentation:
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * LoginDialog — https://app.subframe.com/6b68d96d3e29/library?component=LoginDialog_d76ea19d-994c-4a8e-8a2f-73a0883485eb
 */

import React from "react";
import { FeatherX } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";

interface LoginDialogRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const LoginDialogRoot = React.forwardRef<HTMLDivElement, LoginDialogRootProps>(
  function LoginDialogRoot(
    {
      title,
      description,
      actions,
      className,
      ...otherProps
    }: LoginDialogRootProps,
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
        {description ? (
          <span className="text-body-bold font-body-bold text-subtext-color">
            {description}
          </span>
        ) : null}
        <div className="flex w-full items-center justify-end gap-2">
          {actions ? (
            <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

export const LoginDialog = LoginDialogRoot;
