"use client";
/*
 * Documentation:
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * MainSearch — https://app.subframe.com/6b68d96d3e29/library?component=MainSearch_c11e91ce-745d-48ea-8823-03d553dc4c28
 */

import React from "react";
import { FeatherListFilter } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { placeholder, className, ...otherProps }: InputProps,
  ref
) {
  return (
    <input
      className={SubframeUtils.twClassNames(
        "h-full w-full border-none bg-transparent py-0.5 text-heading-2---light font-heading-2---light text-subtext-color outline-none placeholder:text-neutral-400",
        className
      )}
      placeholder={placeholder as string}
      ref={ref}
      {...otherProps}
    />
  );
});

interface MainSearchRootProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
  error?: boolean;
  variant?: "outline" | "filled";
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  filter?: boolean;
  className?: string;
}

const MainSearchRoot = React.forwardRef<HTMLLabelElement, MainSearchRootProps>(
  function MainSearchRoot(
    {
      disabled = false,
      error = false,
      variant = "outline",
      label,
      helpText,
      icon = null,
      children,
      filter = false,
      className,
      ...otherProps
    }: MainSearchRootProps,
    ref
  ) {
    return (
      <label
        className={SubframeUtils.twClassNames(
          "group/c11e91ce flex flex-col items-start gap-1",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {label ? (
          <span className="text-caption-bold font-caption-bold text-default-font">
            {label}
          </span>
        ) : null}
        <div
          className={SubframeUtils.twClassNames(
            "flex w-full items-center gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-2 py-1.5 group-focus-within/c11e91ce:border group-focus-within/c11e91ce:border-solid group-focus-within/c11e91ce:border-brand",
            {
              "border border-solid border-neutral-100 bg-neutral-border group-hover/c11e91ce:border group-hover/c11e91ce:border-solid group-hover/c11e91ce:border-neutral-border group-focus-within/c11e91ce:bg-default-background":
                variant === "filled",
              "border border-solid border-error-600": error,
              "border border-solid border-neutral-200 bg-neutral-200": disabled,
            }
          )}
        >
          {icon ? (
            <SubframeCore.IconWrapper className="text-large-button font-large-button text-subtext-color">
              {icon}
            </SubframeCore.IconWrapper>
          ) : null}
          {children ? (
            <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch px-1">
              {children}
            </div>
          ) : null}
          <IconButton
            className={SubframeUtils.twClassNames({ flex: filter })}
            disabled={false}
            variant="neutral-tertiary"
            size="medium"
            icon={<FeatherListFilter />}
            loading={false}
          />
        </div>
        {helpText ? (
          <span
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-subtext-color",
              { "text-error-700": error }
            )}
          >
            {helpText}
          </span>
        ) : null}
      </label>
    );
  }
);

export const MainSearch = Object.assign(MainSearchRoot, {
  Input,
});
