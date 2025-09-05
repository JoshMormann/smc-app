"use client";

import React from "react";
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

function FavoritesAuthenticated() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start bg-default-background">
        <MainNavigation
          logo="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
          authenticated={true}
          breadcrumbs={
            <Breadcrumbs>
              <Breadcrumbs.Item main="top-nav">
                SREF Mining Company
              </Breadcrumbs.Item>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item main="top-nav-active-true">
                Favorites
              </Breadcrumbs.Item>
            </Breadcrumbs>
          }
        />
        <div className="flex w-full items-start gap-5 px-5 grow">
          <SideBarNavigation
            mainActions={
              <>
                <IconButton
                  size="large"
                  icon={<FeatherCompass />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <IconButton
                  variant="brand-primary"
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

export default FavoritesAuthenticated;