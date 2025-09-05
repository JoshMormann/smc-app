"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { ManageAccountDialog } from "@/ui/components/ManageAccountDialog";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { FeatherFlame } from "@subframe/core";

function AccountManagement() {
  return (
    <DialogLayout open={false} onOpenChange={() => {}}>
      <ManageAccountDialog
        title="Manage Account"
        subscriptionPlans={
          <div className="flex w-full max-w-[768px] flex-wrap items-center justify-center">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch overflow-hidden rounded-lg border-2 border-solid border-brand bg-default-background px-6 py-6">
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
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Current Plan
              </Button>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 overflow-hidden rounded-lg bg-default-background px-6 py-6">
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
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Upgrade
              </Button>
            </div>
          </div>
        }
      />
    </DialogLayout>
  );
}

export default AccountManagement;