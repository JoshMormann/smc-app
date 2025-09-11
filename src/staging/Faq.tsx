"use client";

import React from "react";
import { Accordion } from "@/ui/components/Accordion";
import { Breadcrumbs } from "@/ui/components/Breadcrumbs";
import { MainNavigation } from "@/ui/components/MainNavigation";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { AuthAwareSideBarNavigation } from "@/components/navigation/AuthAwareSideBarNavigation";

function Faq() {
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
                FAQ
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
                  Frequently Asked Questions
                </span>
                <span className="w-full whitespace-pre-wrap font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color text-center -tracking-[0.01em]">
                  {
                    "Your questions answered: Everything you need to know\nabout SREF Mining"
                  }
                </span>
              </div>
              <div className="flex w-full max-w-[768px] flex-wrap items-center justify-center">
                <div className="flex grow shrink-0 basis-0 flex-col items-center gap-6">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    Frequently Asked Questions
                  </span>
                  <div className="flex w-full flex-col items-start justify-center gap-4">
                    <Accordion
                      trigger={
                        <div className="flex w-full items-center gap-2 px-3 py-2">
                          <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                            1. What exactly is an &#39;SREF code&#39;?
                          </span>
                          <Accordion.Chevron />
                        </div>
                      }
                    >
                      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                        <span className="text-body font-body text-subtext-color">
                          A SREF code (Style Reference) is a parameter used in
                          MidJourney prompts to recreate or reference a specific
                          visual style. For example: --sref 1234567890 --sv 6.
                          SREF Mining Co helps you discover, save, and organize
                          these codes so you can reuse styles with ease.
                        </span>
                      </div>
                    </Accordion>
                    <Accordion
                      trigger={
                        <div className="flex w-full items-center gap-2 px-3 py-2">
                          <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                            2. How does SREF Mining Co help me as a MidJourney
                            user?
                          </span>
                          <Accordion.Chevron />
                        </div>
                      }
                    >
                      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                        <span className="text-body font-body text-subtext-color">
                          Our platform works like a mining operation for
                          creativity. Instead of endlessly scrolling or losing
                          track of great styles, you can browse, “mine,” and
                          save SREF codes into organized collections. This makes
                          it easier to experiment, refine your art direction,
                          and find inspiration quickly.
                        </span>
                      </div>
                    </Accordion>
                    <Accordion
                      trigger={
                        <div className="flex w-full items-center gap-2 px-3 py-2">
                          <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                            3. Is SREF Mining Co free to use?
                          </span>
                          <Accordion.Chevron />
                        </div>
                      }
                    >
                      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                        <span className="text-body font-body text-subtext-color">
                          Yes! Anyone can start for free with basic features
                          like browsing, saving, and organizing SREF codes. For
                          power users, we also offer premium plans that unlock
                          private storage, and unlimited access exclusive
                          curated packs.
                        </span>
                      </div>
                    </Accordion>
                    <Accordion
                      trigger={
                        <div className="flex w-full items-center gap-2 px-3 py-2">
                          <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                            4. Who is SREF Mining Co designed for?
                          </span>
                          <Accordion.Chevron />
                        </div>
                      }
                    >
                      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                        <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                          {
                            "We serve three main groups:\n •\tProfessional Creators who need serious organization, security and style management tools.\n •\tHobbyist Explorers who want to easily find and save inspiring SREF codes.\n •\tCommunity Contributors who enjoy sharing their discoveries and building recognition in the AI art community."
                          }
                        </span>
                      </div>
                    </Accordion>
                    <Accordion
                      trigger={
                        <div className="flex w-full items-center gap-2 px-3 py-2">
                          <span className="grow shrink-0 basis-0 text-heading-4 font-heading-4 text-default-font">
                            5. What makes SREF Mining Co different from other
                            SREF sites?
                          </span>
                          <Accordion.Chevron />
                        </div>
                      }
                    >
                      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-3 py-2">
                        <span className="whitespace-pre-wrap text-body font-body text-subtext-color">
                          {
                            "Most SREF sites are simple galleries with little structure. SREF Mining Co stands out with its mining-company theme, professional-grade organization (preview images, tagging, and search), and community features that encourage collaboration and sharing. It’s not just a collection of codes — it’s an ecosystem for serious AI art explorers."
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
      </div>
    </DefaultPageLayout>
  );
}

export default Faq;