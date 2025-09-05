"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { LinkButton } from "@/ui/components/LinkButton";
import { SampleUserProfile } from "@/ui/components/SampleUserProfile";
import { TextField } from "@/ui/components/TextField";

function PasswordRecovery() {
  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start mobile:flex-col mobile:flex-wrap mobile:gap-0">
        <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch px-12 py-12">
          <img
            className="h-12 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1755835889/uploads/15654/omtpskog4glajk11lbwm.svg"
          />
          <div className="flex w-full max-w-[448px] flex-col items-center justify-center gap-8">
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Reset your password
              </span>
              <span className="text-body font-body text-subtext-color text-center">
                Enter the email address associated with your account and
                we&#39;ll send you a link to reset your password
              </span>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-6">
              <TextField
                className="h-auto w-full flex-none"
                label="Email address"
                helpText=""
              >
                <TextField.Input
                  placeholder="Enter your email"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
              <Button
                className="h-11 w-full flex-none"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Send reset instructions
              </Button>
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Remember your password?
              </span>
              <LinkButton
                variant="brand"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sign In
              </LinkButton>
            </div>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 items-center justify-center gap-12 self-stretch bg-brand-primary-600 px-12 py-12">
          <SampleUserProfile
            avatar={
              <Avatar
                size="x-large"
                image="https://res.cloudinary.com/subframe/image/upload/v1756175238/uploads/15654/au2s2ji3wvgintuos9ql.jpg"
              >
                HW
              </Avatar>
            }
            name="Josh Jackson"
            title="Founder, SMC"
            sref="1234567890"
            sv="6"
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordRecovery;