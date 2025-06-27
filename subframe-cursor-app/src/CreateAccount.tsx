import React from "react";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherFolder } from "@subframe/core";
import { LinkButton } from "@/ui/components/LinkButton";
import { FeatherChevronRight, FeatherUser } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Checkbox } from "@/ui/components/Checkbox";
import { Button } from "@/ui/components/Button";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { FeatherClipboard } from "@subframe/core";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
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
                Join the Mining Community
              </span>
              <span className="text-body-bold font-body-bold text-brand-200">
                Discover, save, and organize your SREF codes with a free
                account.
              </span>
            </div>
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Save your favorite SREF codes
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherFolder />} />
                <span className="text-body font-body text-white">
                  Organize codes in custom folders
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Track which codes you use most
                </span>
              </div>
              <div className="flex items-center gap-4">
                <IconWithBackground size="medium" icon={<FeatherClipboard />} />
                <span className="text-body font-body text-white">
                  Join the mining community
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
              Create your account
            </span>
            <div className="flex w-full flex-wrap items-start gap-2">
              <span className="text-body font-body text-subtext-color">
                Already have an account?
              </span>
              <LinkButton
                variant="brand"
                iconRight={<FeatherChevronRight />}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
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
              label="Username"
              helpText=""
              icon={<FeatherUser />}
            >
              <TextField.Input
                placeholder="Choose a username"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Password"
              helpText=""
              icon={<FeatherClipboard />} // Placeholder for FeatherLock
            >
              <TextField.Input
                type="password"
                placeholder="Create a password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <TextField
              className="h-auto w-full flex-none"
              label="Confirm Password"
              helpText=""
              icon={<FeatherClipboard />} // Placeholder for FeatherLock
            >
              <TextField.Input
                type="password"
                placeholder="Confirm your password"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <div className="flex w-full flex-wrap items-start gap-2 px-2 py-2">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={false}
                onCheckedChange={(checked: boolean) => {}}
              />
            </div>
            <Button
              className="h-8 w-full flex-none"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Create Account
            </Button>
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
          <div className="flex w-full flex-wrap items-start justify-center gap-2">
            <span className="text-body font-body text-subtext-color">
              Already have an account?
            </span>
            <LinkButton
              variant="brand"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage; 