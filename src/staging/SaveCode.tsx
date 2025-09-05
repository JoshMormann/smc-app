"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { SaveSrefCodeDialog } from "@/ui/components/SaveSrefCodeDialog";
import { DialogLayout } from "@/ui/layouts/DialogLayout";

function SaveCode() {
  return (
    <DialogLayout open={false} onOpenChange={() => {}}>
      <SaveSrefCodeDialog
        tags={
          <div className="flex w-full flex-wrap items-start gap-2">
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              cyberpunk
            </Button>
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              watercolor
            </Button>
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              red
            </Button>
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              purple
            </Button>
          </div>
        }
      />
    </DialogLayout>
  );
}

export default SaveCode;