"use client";
/*
 * Documentation:
 * ActionBar — https://app.subframe.com/library?component=ActionBar_42519152-fea5-4944-9ab1-0420c034e2cf
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface ActionBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
  authenticated?: boolean;
  className?: string;
}

const ActionBarRoot = React.forwardRef<HTMLDivElement, ActionBarRootProps>(
  function ActionBarRoot(
    {
      actions,
      authenticated = false,
      className,
      ...otherProps
    }: ActionBarRootProps,
    ref
  ) {
    return actions ? (
      <div
        className={SubframeUtils.twClassNames(
          "group/42519152 flex items-center gap-2 rounded-lg bg-neutral-border px-1 py-1",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {actions}
      </div>
    ) : null;
  }
);

export const ActionBar = ActionBarRoot;
