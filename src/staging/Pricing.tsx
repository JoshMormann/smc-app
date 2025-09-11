"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { AuthAwareSideBarNavigation } from "@/components/navigation/AuthAwareSideBarNavigation";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherFlame } from "@subframe/core";

function Pricing() {
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
                Pricing
              </Breadcrumbs.Item>
            </Breadcrumbs>
          }
        />
        <div className="flex w-full items-start gap-5 px-5 grow">
          <AuthAwareSideBarNavigation />
          <div className="flex grow shrink-0 basis-0 items-start justify-center gap-5 self-stretch rounded-t-2xl bg-neutral-border px-4 pt-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-8 self-stretch rounded-t-md bg-default-background px-12 pt-32">
              <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-4">
                <span className="font-['Inter'] text-[17px] font-[500] leading-[24px] text-brand-primary-700 text-center -tracking-[0.01em]">
                  SREF Mining Company
                </span>
                <span className="font-['National_Park'] text-[48px] font-[600] leading-[52px] text-default-font text-center -tracking-[0.04em]">
                  Pricing
                </span>
                <span className="w-full whitespace-pre-wrap font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color text-center -tracking-[0.01em]">
                  {
                    "Save your most precious SREF codes for rapid visual retrieval and reuse.\nFlexible pricing for every creator, from hobbyists to\nprofessional agencies"
                  }
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-wrap items-center justify-center gap-2">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch overflow-hidden rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
                  <div className="flex w-full flex-col items-start gap-6">
                    <span className="text-heading-4 font-heading-4 text-default-font">
                      Prospector
                    </span>
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Free
                    </span>
                  </div>
                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4">
                    <span className="text-body font-body text-subtext-color">
                      For your hobby projects
                    </span>
                    <div className="flex items-center gap-2">
                      <IconWithBackground variant="neutral" size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Store an unlimited number SREF codes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground variant="neutral" size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Image tagging, and search
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground variant="neutral" size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Full access to community codes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground variant="neutral" size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Save up to 3 preview images per code
                      </span>
                    </div>
                  </div>
                  <Button
                    className="h-11 w-full flex-none"
                    variant="brand-secondary"
                    size="large"
                    iconRight={<FeatherArrowRight />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Start Mining
                  </Button>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 overflow-hidden rounded-lg border-2 border-solid border-brand-primary-600 bg-default-background px-6 py-6">
                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
                    <div className="flex w-full flex-wrap items-center gap-4">
                      <span className="text-heading-4 font-heading-4 text-default-font">
                        Claimant
                      </span>
                      <Badge icon={<FeatherFlame />}>Private Storage</Badge>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-heading-2 font-heading-2 text-default-font">
                        $5
                      </span>
                      <span className="text-caption font-caption text-subtext-color">
                        Per month/user
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4">
                    <span className="text-body font-body text-subtext-color">
                      Great for design agencies and creative contractors
                    </span>
                    <div className="flex items-center gap-2">
                      <IconWithBackground size="small" />
                      <span className="text-body font-body text-subtext-color">
                        All Prospector features
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Save up to 5 preview images per code
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Store codes privately
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconWithBackground size="small" />
                      <span className="text-body font-body text-subtext-color">
                        Early access to new features*
                      </span>
                    </div>
                  </div>
                  <Button
                    className="h-11 w-full flex-none"
                    size="large"
                    iconRight={<FeatherArrowRight />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Stake Your Claim
                  </Button>
                </div>
              </div>
              <span className="max-w-[768px] text-body font-body text-subtext-color text-center">
                *New features are released to Pro Tier users before being made
                available to the Mining Tier if at all. As Pro features increase
                the subscription fee will also increase, however subscription
                fees will lock in for each pro user for as long as their account
                is in good standing. In other words, The sooner you upgrade the
                greater your savings over time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Pricing;