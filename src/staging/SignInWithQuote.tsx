"use client";

import React from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { LinkButton } from "@/ui/components/LinkButton";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { SampleUserProfile } from "@/ui/components/SampleUserProfile";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";

function SignInWithQuote() {
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
                Sign in to your account
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1">
                <span className="text-body font-body text-subtext-color">
                  Don&#39;t have an account?
                </span>
                <LinkButton
                  variant="brand"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Sign up
                </LinkButton>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <OAuthSocialButton
                className="h-10 w-full flex-none"
                logo="https://res.cloudinary.com/subframe/image/upload/v1711417516/shared/z0i3zyjjqkobzuaecgno.svg"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sign in with Google
              </OAuthSocialButton>
              <OAuthSocialButton
                className="h-10 w-full flex-none"
                logo="https://res.cloudinary.com/subframe/image/upload/v1711417557/shared/mzkntataoyfxy54okty4.png"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sign in with Discord
              </OAuthSocialButton>
            </div>
            <div className="flex w-full items-center gap-2">
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
              <span className="text-body font-body text-subtext-color">
                or continue with email
              </span>
              <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
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
              <TextField
                className="h-auto w-full flex-none"
                label="Password"
                helpText=""
              >
                <TextField.Input
                  placeholder="Enter your password"
                  value=""
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                />
              </TextField>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <ToggleGroup value="" onValueChange={(value: string) => {}}>
                    <ToggleGroup.Item icon={null} value="3f84d335">
                      Remember me
                    </ToggleGroup.Item>
                  </ToggleGroup>
                </div>
                <LinkButton
                  variant="brand"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Forgot password?
                </LinkButton>
              </div>
              <Button
                className="h-11 w-full flex-none"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sign in
              </Button>
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

export default SignInWithQuote;