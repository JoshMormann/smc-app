"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";
import { IconButton } from "@/ui/components/IconButton";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { SideBarNavigation } from "@/ui/components/SideBarNavigation";
import { StylereferenceCard } from "@/ui/components/StylereferenceCard";
import { StyleReferenceGallery } from "@/ui/components/StyleReferenceGallery";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherCompass } from "@subframe/core";
import { FeatherHeart } from "@subframe/core";
import { FeatherLibraryBig } from "@subframe/core";
import { FeatherMenu } from "@subframe/core";

function PublicUserProfile() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <MainNavigation
          logo="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
          breadcrumbs={
            <Breadcrumbs>
              <Breadcrumbs.Item main="top-nav">
                SREF Mining Company
              </Breadcrumbs.Item>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item main="top-nav-active-true">
                Profile: Alicia Monet
              </Breadcrumbs.Item>
            </Breadcrumbs>
          }
        />
        <div className="flex w-full items-start gap-5 px-5 grow">
          <SideBarNavigation
            mainActions={
              <>
                <IconButton
                  variant="brand-primary"
                  size="large"
                  icon={<FeatherCompass />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <IconButton
                  size="large"
                  icon={<FeatherHeart />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <IconButton
                  size="large"
                  icon={<FeatherLibraryBig />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </>
            }
            bottomAction={
              <IconButton
                size="large"
                icon={<FeatherMenu />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            }
          />
          <StyleReferenceGallery
            cards={
              <>
                <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 rounded-md bg-default-background px-4 py-4">
                  <div className="flex w-full flex-wrap items-start gap-4">
                    <Avatar
                      size="x-large"
                      image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                      square={true}
                    >
                      A
                    </Avatar>
                    <div className="flex min-w-[160px] max-w-[288px] grow shrink-0 basis-0 flex-col items-start gap-1">
                      <span className="line-clamp-2 w-full text-heading-2 font-heading-2 text-default-font">
                        Alicia Monet
                      </span>
                      <span className="line-clamp-2 w-full text-body-bold font-body-bold text-default-font">
                        Creative Director - SMC Prospector
                      </span>
                      <span className="line-clamp-2 w-full break-words text-body font-body text-subtext-color">
                        Creative director from NYC, innovating at the
                        intersection of art and technology.
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-start gap-2">
                    <Button
                      variant="neutral-primary"
                      size="small"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      baroque
                    </Button>
                    <Button
                      variant="neutral-primary"
                      size="small"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      photorealistic
                    </Button>
                    <Button
                      variant="neutral-primary"
                      size="small"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      lomography
                    </Button>
                    <Button
                      variant="neutral-primary"
                      size="small"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      cyberpunk
                    </Button>
                    <Button
                      variant="neutral-primary"
                      size="small"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      vapor-mist
                    </Button>
                  </div>
                  <div className="flex w-full items-center justify-end gap-2">
                    <Button
                      className="h-11 grow shrink-0 basis-0"
                      size="large"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => {}}
                    >
                      Follow
                    </Button>
                  </div>
                </div>
                <StylereferenceCard
                  srefValue="12345678"
                  svValue="6"
                  tags={
                    <>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                    </>
                  }
                  images={
                    <>
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-1"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                    </>
                  }
                />
                <StylereferenceCard
                  srefValue="12345678"
                  svValue="6"
                  tags={
                    <>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                    </>
                  }
                  images={
                    <>
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-1"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                    </>
                  }
                  variant="preview-3"
                />
                <StylereferenceCard
                  srefValue="12345678"
                  svValue="6"
                  tags={
                    <>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                    </>
                  }
                  images={
                    <>
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-1"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                    </>
                  }
                  variant="preview-2"
                />
                <StylereferenceCard
                  srefValue="12345678"
                  svValue="6"
                  tags={
                    <>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                      <Button
                        variant="neutral-secondary"
                        size="small"
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      >
                        tag
                      </Button>
                    </>
                  }
                  images={
                    <>
                      <img
                        className="w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-1"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-4 col-span-4 row-start-5"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                      <img
                        className="hidden w-full grow shrink-0 basis-0 object-contain row-span-2 col-span-2 row-start-9"
                        src="https://res.cloudinary.com/subframe/image/upload/v1723780941/uploads/302/qgj6kevv14gw6i48bllb.png"
                      />
                    </>
                  }
                  variant="preview-1"
                />
              </>
            }
          />
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default PublicUserProfile;