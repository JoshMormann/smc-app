"use client";

import React from "react";
import { Accordion } from "@/ui/components/Accordion";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { IconButton } from "@/ui/components/IconButton";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { SideBarNavigation } from "@/ui/components/SideBarNavigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { FeatherCompass } from "@subframe/core";
import { FeatherHeart } from "@subframe/core";
import { FeatherLibraryBig } from "@subframe/core";
import { FeatherMenu } from "@subframe/core";

function Terms() {
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
                Terms &amp; Conditions
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
                variant="brand-primary"
                size="large"
                icon={<FeatherMenu />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            }
          />
          <div className="flex grow shrink-0 basis-0 items-start justify-center gap-5 self-stretch rounded-t-2xl bg-neutral-border px-4 pt-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-center gap-8 self-stretch rounded-t-md bg-default-background px-12 pt-32">
              <div className="flex w-full max-w-[576px] flex-col items-center justify-center gap-4">
                <span className="font-['Inter'] text-[17px] font-[500] leading-[24px] text-brand-primary-700 text-center -tracking-[0.01em]">
                  SREF Mining Company
                </span>
                <span className="font-['National_Park'] text-[48px] font-[600] leading-[52px] text-default-font text-center -tracking-[0.04em]">
                  Terms &amp; Conditions
                </span>
                <span className="w-full whitespace-pre-wrap font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color text-center -tracking-[0.01em]">
                  {
                    "Your agreement matters: Understanding the terms of our\nservice"
                  }
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-wrap items-center justify-center">
                <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-4">
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          1. Service Agreement
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        By accessing our service, you agree to be bound by these
                        terms. We provide a platform with specific rights and
                        responsibilities for both users and the company.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          2. User Obligations
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        Users must provide accurate information, maintain
                        account security, and use the service in compliance with
                        our guidelines and applicable laws.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          3. Intellectual Property
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        All content, trademarks, and intellectual property on
                        our platform remain the exclusive property of SREF
                        Mining Co. Users may not reproduce or distribute our
                        content without explicit permission.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          4. Limitation of Liability
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                        {
                          "We are not liable for:\n •\tAny direct or indirect damages\n •\tLoss of profits or business interruption\n •\tData loss or system failures\n •\tThird-party actions or content\n •\tUnforeseen technical issues"
                        }
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          5. Modifications and Termination
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                        {
                          "We reserve the right to:\n •\tModify these terms at any time\n •\tSuspend or terminate user accounts\n •\tChange service features and pricing\n •\tDiscontinue service without prior notice\n •\tReject or limit access to our platform"
                        }
                      </span>
                    </div>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default Terms;