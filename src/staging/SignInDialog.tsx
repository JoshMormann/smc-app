"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { LoginDialog } from "@/ui/components/LoginDialog";
import { DialogLayout } from "@/ui/layouts/DialogLayout";

function SignInDialog() {
  return (
    <DialogLayout open={false} onOpenChange={() => {}}>
      <LoginDialog
        title="Please Log In"
        description="You must be signed in to use this feature"
        actions={
          <>
            <Button
              className="h-11 grow shrink-0 basis-0"
              variant="neutral-primary"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Log In
            </Button>
            <Button
              className="h-11 grow shrink-0 basis-0"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Get Started
            </Button>
          </>
        }
      />
    </DialogLayout>
  );
}

export default SignInDialog;