"use client";
/*
 * Documentation:
 * EditProfileDialog — https://app.subframe.com/6b68d96d3e29/library?component=EditProfileDialog_c4194da6-9ef4-4a97-ac98-64da2f33136c
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Area — https://app.subframe.com/6b68d96d3e29/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 * Text Field — https://app.subframe.com/6b68d96d3e29/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 */

import React from "react";
import { FeatherUploadCloud } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";

interface EditProfileDialogRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  profileImage?: string;
  tags?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const EditProfileDialogRoot = React.forwardRef<
  HTMLDivElement,
  EditProfileDialogRootProps
>(function EditProfileDialogRoot(
  {
    title,
    profileImage,
    tags,
    actions,
    className,
    ...otherProps
  }: EditProfileDialogRootProps,
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
        Profile Picture
      </span>
      <div className="flex w-full items-start gap-4">
        {profileImage ? (
          <img
            className="h-32 w-32 flex-none rounded-md object-cover"
            src={profileImage}
          />
        ) : null}
        <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-2 self-stretch rounded-md border border-dashed border-brand-primary-600 px-6 py-6">
          <FeatherUploadCloud className="text-heading-2 font-heading-2 text-brand-primary-700" />
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-body font-body text-default-font text-center">
              Click to select files or drag to upload
            </span>
            <span className="text-caption font-caption text-subtext-color text-center">
              Up to 100 files, max file size 5MB
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <span className="text-heading-3 font-heading-3 text-default-font">
        Settings
      </span>
      <div className="flex w-full items-center gap-2">
        <TextField
          className="h-auto grow shrink-0 basis-0"
          variant="filled"
          label="Name"
          helpText=""
        >
          <TextField.Input placeholder="Alicia Monet" />
        </TextField>
      </div>
      <TextArea
        className="h-auto w-full flex-none"
        variant="filled"
        label="Bio"
        helpText=""
      >
        <TextArea.Input
          className="h-auto min-h-[96px] w-full flex-none"
          placeholder="Write something about yourself..."
        />
      </TextArea>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <span className="text-heading-3 font-heading-3 text-default-font">
        Tags
      </span>
      {tags ? (
        <div className="flex w-full flex-col items-start gap-4">{tags}</div>
      ) : null}
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      {actions ? (
        <div className="flex w-full flex-col items-start gap-4">{actions}</div>
      ) : null}
    </div>
  );
});

export const EditProfileDialog = EditProfileDialogRoot;
