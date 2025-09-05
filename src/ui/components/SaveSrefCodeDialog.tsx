"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * Icon Button — https://app.subframe.com/6b68d96d3e29/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * NumberedExampleImageCard — https://app.subframe.com/6b68d96d3e29/library?component=NumberedExampleImageCard_d784f170-a3ac-4c53-a107-296bc4da0a79
 * SaveSrefCodeDialog — https://app.subframe.com/6b68d96d3e29/library?component=SaveSrefCodeDialog_c3493f53-7fa6-44fb-92f0-68fe552e6e2b
 * Select — https://app.subframe.com/6b68d96d3e29/library?component=Select_bb88f90b-8c43-4b73-9c2f-3558ce7838f3
 * Text Area — https://app.subframe.com/6b68d96d3e29/library?component=Text+Area_4ec05ee8-8f1c-46b2-b863-5419aa7f5cce
 * Text Field — https://app.subframe.com/6b68d96d3e29/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
 */

import React from "react";
import { FeatherPlus } from "@subframe/core";
import { FeatherUploadCloud } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { NumberedExampleImageCard } from "./NumberedExampleImageCard";
import { Select } from "./Select";
import { TextArea } from "./TextArea";
import { TextField } from "./TextField";

interface SaveSrefCodeDialogRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  tags?: React.ReactNode;
  editExisting?: boolean;
  className?: string;
}

const SaveSrefCodeDialogRoot = React.forwardRef<
  HTMLDivElement,
  SaveSrefCodeDialogRootProps
>(function SaveSrefCodeDialogRoot(
  {
    tags,
    editExisting = false,
    className,
    ...otherProps
  }: SaveSrefCodeDialogRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/c3493f53 flex h-full w-full flex-col items-start gap-4 bg-default-background px-6 py-4",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-heading-2 font-heading-2 text-default-font">
          {editExisting ? "Edit SREF Code" : "Save SREF Code"}
        </span>
        <IconButton size="large" icon={<FeatherX />} />
      </div>
      <span className="text-heading-3 font-heading-3 text-default-font">
        Settings
      </span>
      <div className="flex w-full items-center gap-2">
        <TextField
          className="h-auto grow shrink-0 basis-0"
          variant="filled"
          label="Title"
          helpText=""
        >
          <TextField.Input placeholder="e.g., Comic Book Style" />
        </TextField>
        <Select variant="filled" label="Version" placeholder="SV 6" helpText="">
          <Select.Item value="Item 1">Item 1</Select.Item>
          <Select.Item value="Item 2">Item 2</Select.Item>
          <Select.Item value="Item 3">Item 3</Select.Item>
        </Select>
      </div>
      <TextArea
        className="h-auto w-full flex-none"
        variant="filled"
        label="SREF Code(s)"
        helpText="Enter your SREF code(s) as you plan to use them in your prompt"
      >
        <TextArea.Input
          className="h-auto min-h-[96px] w-full flex-none"
          placeholder="--sref 1234567890 0987654321"
        />
      </TextArea>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <span className="text-heading-3 font-heading-3 text-default-font">
        Tags
      </span>
      <TextField
        className="h-auto w-full flex-none"
        variant="filled"
        label="Add Tags"
        helpText=""
        iconRight={<FeatherPlus />}
      >
        <TextField.Input placeholder="e.g., oil painting" />
      </TextField>
      {tags ? (
        <div className="flex w-full flex-col items-start gap-4">{tags}</div>
      ) : null}
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
      <span className="text-heading-3 font-heading-3 text-default-font">
        Example Images
      </span>
      <div className="flex w-full items-start gap-2">
        <NumberedExampleImageCard number="1" />
        <NumberedExampleImageCard number="2" />
        <NumberedExampleImageCard number="3" />
        <NumberedExampleImageCard number="4" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-brand-primary-600 px-6 py-6">
        <FeatherUploadCloud className="text-heading-2 font-heading-2 text-brand-primary-700" />
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-body font-body text-default-font text-center">
            Click to select files or drag to upload
          </span>
          <span className="text-caption font-caption text-subtext-color text-center">
            Up to 5 files, max file size 5MB
          </span>
        </div>
      </div>
      <span className="text-caption font-caption text-subtext-color">
        Drag and drop to reorder images. The first 3 images will be shown in the
        card preview.
      </span>
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          className="h-11 grow shrink-0 basis-0"
          variant="neutral-primary"
          size="large"
        >
          Cancel
        </Button>
        <Button className="h-11 grow shrink-0 basis-0" size="large">
          {editExisting ? "Update SREF Code" : "Save SREF Code"}
        </Button>
      </div>
    </div>
  );
});

export const SaveSrefCodeDialog = SaveSrefCodeDialogRoot;
