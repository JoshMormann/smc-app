"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/6b68d96d3e29/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 * StyleReferenceGallery — https://app.subframe.com/6b68d96d3e29/library?component=StyleReferenceGallery_777d7078-611c-44bb-9b2a-c311d2abac05
 * TagContainer — https://app.subframe.com/6b68d96d3e29/library?component=TagContainer_8c5a1990-a565-4ff7-94eb-0343bc6ab75a
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Button } from "./Button";
import { TagContainer } from "./TagContainer";

interface StyleReferenceGalleryRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  cards?: React.ReactNode;
  tagsVisible?: boolean;
  className?: string;
}

const StyleReferenceGalleryRoot = React.forwardRef<
  HTMLDivElement,
  StyleReferenceGalleryRootProps
>(function StyleReferenceGalleryRoot(
  {
    cards,
    tagsVisible = false,
    className,
    ...otherProps
  }: StyleReferenceGalleryRootProps,
  ref
) {
  return (
    <div
      className={SubframeUtils.twClassNames(
        "group/777d7078 flex h-full w-full items-start gap-5 transition ease-in-out duration-700",
        className
      )}
      ref={ref}
      {...otherProps}
    >
      {cards ? (
        <div className="grow shrink-0 basis-0 items-start gap-4 self-stretch rounded-t-lg bg-neutral-border px-3 pt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {cards}
        </div>
      ) : null}
      <TagContainer
        className={SubframeUtils.twClassNames("hidden", { flex: tagsVisible })}
        tags={
          <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-2">
            <Button variant="neutral-secondary" size="small">
              cyberpunk
            </Button>
            <Button variant="neutral-secondary" size="small">
              vaporwave
            </Button>
            <Button variant="neutral-secondary" size="small">
              brutalist
            </Button>
            <Button variant="neutral-secondary" size="small">
              synthwave
            </Button>
            <Button variant="neutral-secondary" size="small">
              minimalist
            </Button>
            <Button variant="neutral-secondary" size="small">
              maximalist
            </Button>
            <Button variant="neutral-secondary" size="small">
              baroque
            </Button>
            <Button variant="neutral-secondary" size="small">
              bauhaus
            </Button>
            <Button variant="neutral-secondary" size="small">
              rococo
            </Button>
            <Button variant="neutral-secondary" size="small">
              art-nouveau
            </Button>
            <Button variant="neutral-secondary" size="small">
              retro-futurism
            </Button>
            <Button variant="neutral-secondary" size="small">
              surrealist
            </Button>
            <Button variant="neutral-secondary" size="small">
              cubist
            </Button>
            <Button variant="neutral-secondary" size="small">
              impressionist
            </Button>
            <Button variant="neutral-secondary" size="small">
              expressionist
            </Button>
            <Button variant="neutral-secondary" size="small">
              ukiyo-e
            </Button>
            <Button variant="neutral-secondary" size="small">
              ink-wash
            </Button>
            <Button variant="neutral-secondary" size="small">
              pixel-art
            </Button>
            <Button variant="neutral-secondary" size="small">
              low-poly
            </Button>
            <Button variant="neutral-secondary" size="small">
              cel-shaded
            </Button>
            <Button variant="neutral-secondary" size="small">
              comic-book
            </Button>
            <Button variant="neutral-secondary" size="small">
              storyboard-style
            </Button>
            <Button variant="neutral-secondary" size="small">
              photorealistic
            </Button>
            <Button variant="neutral-secondary" size="small">
              hyperrealism
            </Button>
            <Button variant="neutral-secondary" size="small">
              painterly
            </Button>
            <Button variant="neutral-secondary" size="small">
              oil-painting
            </Button>
            <Button variant="neutral-secondary" size="small">
              watercolor
            </Button>
            <Button variant="neutral-secondary" size="small">
              gouache
            </Button>
            <Button variant="neutral-secondary" size="small">
              pastel-dream
            </Button>
            <Button variant="neutral-secondary" size="small">
              neon-noir
            </Button>
            <Button variant="neutral-secondary" size="small">
              moody-lighting
            </Button>
            <Button variant="neutral-secondary" size="small">
              chiaroscuro
            </Button>
            <Button variant="neutral-secondary" size="small">
              film-grain
            </Button>
            <Button variant="neutral-secondary" size="small">
              lomography
            </Button>
            <Button variant="neutral-secondary" size="small">
              glitch-art
            </Button>
            <Button variant="neutral-secondary" size="small">
              datamosh
            </Button>
            <Button variant="neutral-secondary" size="small">
              holographic
            </Button>
            <Button variant="neutral-secondary" size="small">
              iridescent
            </Button>
            <Button variant="neutral-secondary" size="small">
              metallic-sheen
            </Button>
            <Button variant="neutral-secondary" size="small">
              vapor-mist
            </Button>
            <Button variant="neutral-secondary" size="small">
              sepia-tone
            </Button>
            <Button variant="neutral-secondary" size="small">
              duotone
            </Button>
            <Button variant="neutral-secondary" size="small">
              monochrome
            </Button>
            <Button variant="neutral-secondary" size="small">
              black-and-white
            </Button>
            <Button variant="neutral-secondary" size="small">
              technicolor
            </Button>
            <Button variant="neutral-secondary" size="small">
              isometric
            </Button>
          </div>
        }
      />
    </div>
  );
});

export const StyleReferenceGallery = StyleReferenceGalleryRoot;
