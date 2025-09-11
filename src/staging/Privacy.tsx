"use client";

import React from "react";
import { Accordion } from "@/ui/components/Accordion";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { AuthAwareSideBarNavigation } from "@/components/navigation/AuthAwareSideBarNavigation";

function Privacy() {
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
                Privacy Policy
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
                  Privacy Policy
                </span>
                <span className="w-full whitespace-pre-wrap font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color text-center -tracking-[0.01em]">
                  {
                    "Your privacy matters: Understanding how we protect your\ndata"
                  }
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-wrap items-center justify-center">
                <div className="flex grow shrink-0 basis-0 flex-col items-start justify-center gap-4">
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          1. Data Collection
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        We collect minimal personal information necessary to
                        provide our services. This includes email addresses for
                        account creation, usage data for improving our platform,
                        and optional profile information you choose to share.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          2. Data Usage
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        Your data is used solely to enhance user experience,
                        provide platform functionality, and communicate
                        important updates. We never sell or share personal
                        information with third parties without explicit consent.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          3. Data Protection
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="text-body font-body text-subtext-color">
                        We implement industry-standard security measures to
                        protect your data. This includes encryption, secure
                        servers, and regular security audits to prevent
                        unauthorized access or data breaches.
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          4. User Rights
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                        {
                          "You have the right to:\n •\tAccess your personal data\n •\tRequest data deletion\n •\tOpt-out of marketing communications\n •\tRequest data portability\n •\tFile a complaint about data handling"
                        }
                      </span>
                    </div>
                  </Accordion>
                  <Accordion
                    trigger={
                      <div className="flex w-full items-center gap-2 px-3 py-2">
                        <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                          5. Compliance and Updates
                        </span>
                        <Accordion.Chevron />
                      </div>
                    }
                    defaultOpen={true}
                  >
                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                      <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                        {
                          "We comply with GDPR, CCPA, and other international privacy regulations. Our privacy policy is regularly reviewed and updated to reflect changes in law and our data practices. Users will be notified of any significant changes."
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

export default Privacy;