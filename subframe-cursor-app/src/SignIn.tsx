import React from "react";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherBarChart2 } from "@subframe/core";
import { LinkButton } from "@/ui/components/LinkButton";
import { FeatherChevronRight } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherClipboard } from "@subframe/core";
import { Checkbox } from "@/ui/components/Checkbox";
import { Button } from "@/ui/components/Button";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-wrap items-start bg-default-background mobile:flex-col mobile:flex-wrap mobile:gap-0">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-center gap-12 self-stretch bg-neutral-800 px-12 py-12 mobile:h-auto mobile:w-full mobile:flex-none">
        <div className="flex w-full max-w-[448px] grow shrink-0 basis-0 flex-col items-start justify-center gap-12 mobile:h-auto mobile:w-full mobile:max-w-[448px] mobile:flex-none">
          <img
            className="h-8 flex-none object-cover invert"
            src="https://res.cloudinary.com/subframe/image/upload/v1750990779/uploads/15654/utd2qfxte8zkgazyg5xr.svg"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate("/")}
          />
          <div className="flex flex-col items-start justify-center gap-16 pb-32 mobile:px-0 mobile:py-0">
            <div className="flex flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-white">
                Welcome Back
              </span>
              <span className="text-body-bold font-body-bold text-brand-200">
                Access your SREF Mining Co account to manage your mining
                operations.
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Monitor mining operations
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherBarChart2 />} />
                <span className="text-body font-body text-white">
                  Track performance metrics
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Manage equipment fleet
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Coordinate team activities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col items-center justify-center gap-6 self-stretch border-l border-solid border-neutral-border px-12 py-12">
        <div className="flex w-full max-w-[448px] flex-col items-start justify-center gap-8">
          <div className="flex w-full flex-col items-start gap-1">
            <span className="w-full text-heading-1 font-heading-1 text-default-font">
              Sign in to your account
            </span>
            <div className="flex w-full flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                New to SREF Mining Co?
              </span>
              <LinkButton
                variant="brand"
                iconRight={<FeatherChevronRight />}
                onClick={() => navigate("/create-account")}
              >
                Create an account
              </LinkButton>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-4">
            <TextField
              className="h-auto w-full flex-none"
              label="Email"
              helpText=""
              icon={<FeatherClipboard />} // Placeholder for FeatherMail
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
              icon={<FeatherClipboard />} // Placeholder for FeatherLock
              iconRight={<FeatherClipboard />} // Placeholder for FeatherEye
            >
              <TextField.Input
                type="password"
                placeholder="Enter your password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <div className="flex w-full flex-wrap items-start gap-2 px-2 py-2">
              <Checkbox
                label="Remember me"
                checked={false}
                onCheckedChange={(checked: boolean) => {}}
              />
            </div>
            <Button
              className="h-8 w-full flex-none"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Sign in
            </Button>
            <div className="flex w-full items-start justify-center">
              <LinkButton
                size="small"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Forgot password?
              </LinkButton>
            </div>
          </div>
          <div className="flex w-full items-center gap-2">
            <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
            <span className="text-body font-body text-subtext-color">
              or continue with
            </span>
            <div className="flex h-px grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-border" />
          </div>
          <div className="flex w-full flex-col items-start justify-center gap-2">
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417516/shared/z0i3zyjjqkobzuaecgno.svg"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Continue with Google
            </OAuthSocialButton>
            <OAuthSocialButton
              className="h-10 w-full flex-none"
              logo="https://res.cloudinary.com/subframe/image/upload/v1711417564/shared/zhcrzoah8kty6cup8zud.png"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Continue with GitHub
            </OAuthSocialButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage; 