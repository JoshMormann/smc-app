import { BoldNavbar } from "@/ui/components/BoldNavbar";
import { BoldNavbarMobile } from "@/ui/components/BoldNavbarMobile";
import { Button } from "@/ui/components/Button";
import { FeatherClipboard } from "@subframe/core";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { BoldFooter } from "@/ui/components/BoldFooter";
import { LinkButton } from "@/ui/components/LinkButton";
import { FeatherChevronRight, FeatherUser } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { Checkbox } from "@/ui/components/Checkbox";
import { OAuthSocialButton } from "@/ui/components/OAuthSocialButton";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import SignUpPage from "./CreateAccount";
import SignInPage from "./SignIn";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full flex-col items-start bg-default-background">
      <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-6 mobile:px-2 mobile:py-2">
        <BoldNavbar className="mobile:hidden" />
        <BoldNavbarMobile className="hidden mobile:flex" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8 px-6 pt-40 pb-24">
        <span className="max-w-[1024px] whitespace-pre-wrap font-['Commissioner'] text-[92px] font-[900] leading-[84px] text-default-font text-center -tracking-[0.04em] mobile:font-['Inter'] mobile:text-[62px] mobile:font-[400] mobile:leading-[58px] mobile:tracking-normal">
          {"SREF MINING CO"}
        </span>
        <span className="max-w-[576px] whitespace-pre-wrap font-['DM_Sans'] text-[20px] font-[500] leading-[28px] text-subtext-color text-center -tracking-[0.015em]">
          {"Discover, save, and share MidJourney style references"}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Button
            size="large"
            onClick={() => navigate("/create-account")}
          >
            Create Free Account
          </Button>
          <Button
            variant="neutral-secondary"
            size="large"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Browse SREF Codes
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 py-24">
        <div className="flex w-full max-w-[1280px] flex-wrap items-start justify-center gap-6">
          <div className="flex max-w-[384px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
            <img
              className="h-48 w-full flex-none rounded-md object-cover"
              src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?w=800&auto=format&fit=crop&q=60"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-brand-primary">
                SV6
              </span>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              Cyberpunk Neon
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  2.4k copies
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  847 saves
                </span>
              </div>
            </div>
          </div>
          <div className="flex max-w-[384px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
            <img
              className="h-48 w-full flex-none rounded-md object-cover"
              src="https://images.unsplash.com/photo-1633218388467-ee37e232a815?w=800&auto=format&fit=crop&q=60"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-warning-600">
                SV4
              </span>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              Retro Synthwave
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  1.8k copies
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  632 saves
                </span>
              </div>
            </div>
          </div>
          <div className="flex max-w-[384px] grow shrink-0 basis-0 flex-col items-start gap-4 rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
            <img
              className="h-48 w-full flex-none rounded-md object-cover"
              src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=60"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-body-bold font-body-bold text-brand-primary">
                SV6
              </span>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <span className="text-heading-2 font-heading-2 text-default-font">
              Sci-Fi Portal
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  3.1k copies
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FeatherClipboard className="text-body font-body text-subtext-color" />
                <span className="text-caption font-caption text-subtext-color">
                  1.2k saves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 py-12">
        <div className="flex w-full max-w-[1280px] flex-col items-start gap-6">
          <span className="text-heading-2 font-heading-2 text-default-font">
            Recently Mined SREF Codes
          </span>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Neon Dreams
                    </span>
                    <Badge>SV6</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    mined by @stella_art • 2m ago
                  </span>
                </div>
              </div>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Retro Vibes
                    </span>
                    <Badge variant="warning">SV4</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    mined by @pixel_master • 5m ago
                  </span>
                </div>
              </div>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Cyberpunk City
                    </span>
                    <Badge>SV6</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    mined by @neo_artist • 12m ago
                  </span>
                </div>
              </div>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Digital Dawn
                    </span>
                    <Badge>SV6</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    mined by @future_sight • 15m ago
                  </span>
                </div>
              </div>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
            <div className="flex w-full items-center justify-between rounded-lg border border-solid border-neutral-border bg-default-background px-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar image="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60" />
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Synthwave Dreams
                    </span>
                    <Badge variant="warning">SV4</Badge>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    mined by @retro_miner • 18m ago
                  </span>
                </div>
              </div>
              <Button
                variant="neutral-secondary"
                size="small"
                icon={<FeatherClipboard />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Copy SREF
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 bg-neutral-100 px-6 py-24">
        <div className="flex w-full max-w-[1280px] flex-wrap items-center justify-center gap-12">
          <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-start justify-center gap-10 self-stretch">
            <div className="flex max-w-[576px] flex-col items-start justify-center gap-4">
              <span className="font-['Commissioner'] text-[30px] font-[800] leading-[34px] text-default-font -tracking-[0.025em]">
                Understanding SREF Versions
              </span>
              <span className="whitespace-pre-wrap font-['DM_Sans'] text-[18px] font-[400] leading-[26px] text-subtext-color -tracking-[0.01em]">
                {
                  "SREF codes are the DNA of MidJourney styles. SV4 and SV6 represent different generations of the technology, each with unique characteristics and capabilities."
                }
              </span>
            </div>
            <div className="flex w-full flex-wrap items-start gap-6">
              <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
                <IconWithBackground
                  variant="warning"
                  size="large"
                  icon={<FeatherClipboard />}
                />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  SV4 Style Codes
                </span>
                <span className="text-body font-body text-subtext-color">
                  Classic version optimized for artistic consistency and
                  established style patterns.
                </span>
              </div>
              <div className="flex min-w-[240px] grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-lg border border-solid border-neutral-border bg-default-background px-6 py-6">
                <IconWithBackground size="large" icon={<FeatherClipboard />} />
                <span className="text-heading-2 font-heading-2 text-default-font">
                  SV6 Style Codes
                </span>
                <span className="text-body font-body text-subtext-color">
                  Latest generation featuring enhanced detail control and
                  advanced style mixing capabilities.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-24">
        <div className="flex w-full max-w-[1280px] flex-col items-center justify-center gap-8 rounded-[32px] bg-brand-100 px-6 pt-28 pb-16 mobile:px-6 mobile:py-12">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <span className="w-full max-w-[768px] whitespace-pre-wrap font-['Commissioner'] text-[74px] font-[900] leading-[74px] text-default-font text-center -tracking-[0.04em] mobile:font-['Commissioner'] mobile:text-[48px] mobile:font-[900] mobile:leading-[44px] mobile:tracking-normal">
              {"START MINING TODAY"}
            </span>
            <span className="w-full max-w-[768px] whitespace-pre-wrap font-['DM_Sans'] text-[24px] font-[400] leading-[28px] text-subtext-color text-center -tracking-[0.015em] mobile:font-['DM_Sans'] mobile:text-[18px] mobile:font-[400] mobile:leading-[24px] mobile:tracking-normal">
              {
                "Join our community of style miners and start discovering, sharing, and collecting unique SREF codes."
              }
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              size="large"
              onClick={() => navigate("/create-account")}
            >
              Create Free Account
            </Button>
            <Button
              variant="neutral-secondary"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Join Collector Tier Waitlist
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start">
        <BoldFooter />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
