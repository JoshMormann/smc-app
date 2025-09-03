"use client";
/*
 * Documentation:
 * Icon Button — https://app.subframe.com/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * StylereferenceCard — https://app.subframe.com/library?component=StylereferenceCard_f31138e0-d9cd-4cc5-be83-0da45eb9e482
 */

import React from "react";
import { FeatherCopy } from "@subframe/core";
import { FeatherEdit } from "@subframe/core";
import { FeatherHeartPlus } from "@subframe/core";
import { FeatherPlusCircle } from "@subframe/core";
import { FeatherRedo } from "@subframe/core";
import * as SubframeUtils from "../utils";
import { IconButton } from "./IconButton";

interface StylereferenceCardRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  srefValue?: React.ReactNode;
  svValue?: React.ReactNode;
  tags?: React.ReactNode;
  images?: React.ReactNode;
  variant?:
    | "preview-4"
    | "preview-3"
    | "preview-2"
    | "preview-1"
    | "favorites-empty"
    | "library-save";
  edit?: boolean;
  className?: string;
}

const StylereferenceCardRoot = React.forwardRef<
  HTMLDivElement,
  StylereferenceCardRootProps
>(function StylereferenceCardRoot(
  {
    srefValue,
    svValue,
    tags,
    images,
    variant = "preview-4",
    edit = false,
    className,
    ...otherProps
  }: StylereferenceCardRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/f31138e0 flex w-full cursor-pointer flex-col items-start justify-end gap-2 overflow-hidden rounded-md bg-default-background relative hover:flex",
        {
          "border border-neutral-border relative border-dotted":
            variant === "library-save",
          "h-auto w-full min-w-[176px] border border-neutral-border relative border-dotted":
            variant === "favorites-empty",
        },
        className
      )}
      ref={ref}
      {...otherProps}
    >
      <div className="hidden w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-6 bg-card-overlay px-4 py-4 absolute top-0 left-0 bottom-0 right-0 group-hover/f31138e0:flex">
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-heading-4 font-heading-4 text-default-font">
            Click to Copy!
          </span>
          <div className="flex items-center justify-center gap-1">
            <span className="text-body font-body text-subtext-color">
              --sref
            </span>
            {srefValue ? (
              <span className="text-body font-body text-subtext-color">
                {srefValue}
              </span>
            ) : null}
            <span className="text-body font-body text-subtext-color">--sv</span>
            {svValue ? (
              <span className="text-body font-body text-subtext-color">
                {svValue}
              </span>
            ) : null}
          </div>
        </div>
        {tags ? (
          <div className="flex flex-wrap items-center justify-center gap-1">
            {tags}
          </div>
        ) : null}
        <IconButton
          className={SubframeUtils.twClassNames("absolute top-2 left-2", {
            hidden: edit,
          })}
          disabled={false}
          variant="neutral-tertiary"
          size="large"
          icon={<FeatherHeartPlus />}
          loading={false}
        />
        <IconButton
          className={SubframeUtils.twClassNames(
            "hidden absolute top-2 left-2",
            { flex: edit }
          )}
          disabled={false}
          variant="neutral-tertiary"
          size="large"
          icon={<FeatherEdit />}
          loading={false}
        />
        <IconButton
          className="absolute top-2 right-2"
          disabled={false}
          variant="neutral-tertiary"
          size="large"
          icon={<FeatherCopy />}
          loading={false}
        />
      </div>
      <div
        className={SubframeUtils.twClassNames(
          "hidden w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-6 bg-card-overlay px-4 py-4",
          {
            hidden: variant === "library-save",
            flex: variant === "favorites-empty",
          }
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-heading-4 font-heading-4 text-default-font">
            {variant === "favorites-empty"
              ? "You Don&#39;t Have Favorites!"
              : "Save an SREF Code!"}
          </span>
          <span className="text-body font-body text-subtext-color">
            {variant === "favorites-empty"
              ? "This is where all the favorites you make on the community Discover page can be found and reused."
              : "Click here, the add button in the main menu, or simply drag an image onto the app to start saving an SREF code."}
          </span>
        </div>
      </div>
      <div
        className={SubframeUtils.twClassNames(
          "hidden w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-6 bg-card-overlay px-4 py-4",
          { flex: variant === "library-save" }
        )}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-heading-4 font-heading-4 text-default-font">
            Save an SREF Code!
          </span>
          {variant === "library-save" ? (
            <FeatherPlusCircle className="text-heading-4 font-heading-4 text-subtext-color" />
          ) : (
            <FeatherRedo className="text-heading-4 font-heading-4 text-subtext-color" />
          )}
          <span className="text-body font-body text-subtext-color">
            Click here, the add button in the main menu, or simply drag an image
            onto the app to start saving an SREF code.
          </span>
        </div>
      </div>
      {images ? (
        <div
          className={SubframeUtils.twClassNames(
            "w-full grow shrink-0 basis-0 flex-col items-start grid grid-cols-4 grid-rows-10 gap-0",
            {
              hidden: variant === "library-save",
              "grid grid-cols-4 grid-rows-4 gap-0": variant === "preview-1",
              "grid grid-cols-4 grid-rows-8 gap-0": variant === "preview-2",
              "grid grid-cols-4 grid-rows-6 gap-0": variant === "preview-3",
            }
          )}
        >
          {images}
        </div>
      ) : null}
    </div>
  );
});

export const StylereferenceCard = StylereferenceCardRoot;
