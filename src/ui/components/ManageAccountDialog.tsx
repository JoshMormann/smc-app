"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * ManageAccountDialog — https://app.subframe.com/6b68d96d3e29/library?component=ManageAccountDialog_9e0dcf17-129f-449a-a6fe-510927cdc12c
 */

import React from "react";
import { FeatherX } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

interface ManageAccountDialogRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subscriptionPlans?: React.ReactNode;
  className?: string;
}

const ManageAccountDialogRoot = React.forwardRef<
  HTMLDivElement,
  ManageAccountDialogRootProps
>(function ManageAccountDialogRoot(
  {
    title,
    subscriptionPlans,
    className,
    ...otherProps
  }: ManageAccountDialogRootProps,
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
      <span className="text-heading-3 font-heading-3 text-default-font">
        Subscription
      </span>
      {subscriptionPlans ? (
        <div className="flex w-full flex-col items-start gap-4">
          {subscriptionPlans}
        </div>
      ) : null}
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <span className="text-heading-3 font-heading-3 text-default-font">
        Account
      </span>
      <div className="flex w-full items-center justify-between px-2 py-2">
        <span className="text-body font-body text-default-font">
          DANGER: Delete Account
        </span>
        <Button variant="brand-secondary">Delete Account</Button>
      </div>
    </div>
  );
});

export const ManageAccountDialog = ManageAccountDialogRoot;
