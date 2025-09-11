"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { Button } from "@/ui/components/Button";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { AuthAwareSideBarNavigation } from "@/components/navigation/AuthAwareSideBarNavigation";
import { FeatherEye } from "@subframe/core";
import { FeatherFolderOpen } from "@subframe/core";
import { FeatherTarget } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherZap } from "@subframe/core";

function About() {
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
                About
              </Breadcrumbs.Item>
            </Breadcrumbs>
          }
        />
        <div className="flex w-full items-start gap-5 px-5 grow">
          <AuthAwareSideBarNavigation />
          <div className="flex grow shrink-0 basis-0 items-start justify-center gap-5 self-stretch rounded-t-2xl bg-neutral-border px-4 pt-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-5 self-stretch rounded-t-md bg-default-background px-12 pt-32">
              <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-4">
                <span className="font-['Inter'] text-[17px] font-[500] leading-[24px] text-brand-primary-700 text-center -tracking-[0.01em]">
                  SREF Mining Company
                </span>
                <span className="font-['National_Park'] text-[48px] font-[600] leading-[52px] text-default-font text-center -tracking-[0.04em]">
                  About Us
                </span>
                <span className="w-full whitespace-pre-wrap font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color text-center -tracking-[0.01em]">
                  {
                    "The premier platform for discovering and organizing\nMidJourney SREF codes. Transform your Al art workflow\nwith professional-grade mining tools."
                  }
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-col items-start gap-4 rounded-lg bg-default-background px-6 py-6 border border-neutral-border">
                <div className="flex items-center gap-3">
                  <FeatherTarget className="font-['Afacad_Flux'] text-[20px] font-[400] leading-[28px] text-default-font" />
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Our Mission
                  </span>
                </div>
                <span className="font-body text-default-font leading-relaxed">
                  We&#39;re revolutionizing how creators discover and manage
                  MidJourney SREF codes. With over 200 billion potential codes
                  across SV4 and SV6 versions, we provide the tools to uncover,
                  organize, and share the perfect style references for your
                  creative projects.
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-col items-center gap-6">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  What Makes Us Different
                </span>
                <div className="flex w-full items-start gap-6">
                  <div className="flex flex-col items-start gap-3 self-stretch rounded-lg bg-default-background px-4 py-4 border border-neutral-border">
                    <div className="flex items-center gap-2">
                      <FeatherEye className="text-body font-body text-default-font" />
                      <span className="text-heading-4 font-heading-4 text-default-font">
                        Visual Discovery
                      </span>
                    </div>
                    <span className="text-body font-body text-subtext-color">
                      Pinterest-inspired masonry feeds make browsing and
                      discovering SREF codes intuitive and visually engaging.
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-3 self-stretch rounded-lg bg-default-background px-4 py-4 border border-neutral-border">
                    <div className="flex items-center gap-2">
                      <FeatherUsers className="text-body font-body text-default-font" />
                      <span className="text-heading-4 font-heading-4 text-default-font">
                        Community Driven
                      </span>
                    </div>
                    <span className="text-body font-body text-subtext-color">
                      Share discoveries, follow creators, and build your
                      reputation in the growing AI art community.
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-3 self-stretch rounded-lg bg-default-background px-4 py-4 border border-neutral-border">
                    <div className="flex items-center gap-2">
                      <FeatherFolderOpen className="text-body font-body text-default-font" />
                      <span className="text-heading-4 font-heading-4 text-default-font">
                        Professional Organization
                      </span>
                    </div>
                    <span className="text-body font-body text-subtext-color">
                      Advanced tagging, favorites, and library management tools
                      designed for serious creators and agencies.
                    </span>
                  </div>
                  <div className="flex flex-col items-start gap-3 self-stretch rounded-lg bg-default-background px-4 py-4 border border-neutral-border">
                    <div className="flex items-center gap-2">
                      <FeatherZap className="text-body font-body text-default-font" />
                      <span className="text-heading-4 font-heading-4 text-default-font">
                        One-Click Reuse
                      </span>
                    </div>
                    <span className="text-body font-body text-subtext-color">
                      Copy SREF codes instantly to your clipboard and paste them
                      them into your MidJourney prompt.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full max-w-[768px] flex-col items-center gap-4 py-8 text-center">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  Ready to Start Mining?
                </span>
                <span className="max-w-[448px] text-body font-body text-subtext-color">
                  Join thousands of creators who are already discovering amazing
                  SREF codes and transforming their AI art workflow.
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="neutral-secondary"
                    size="large"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Log In
                  </Button>
                  <Button
                    size="large"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Start Mining
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default About;