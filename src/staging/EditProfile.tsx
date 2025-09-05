"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { EditProfileDialog } from "@/ui/components/EditProfileDialog";
import { DialogLayout } from "@/ui/layouts/DialogLayout";

function EditProfile() {
  return (
    <DialogLayout open={false} onOpenChange={() => {}}>
      <EditProfileDialog
        title="Edit Profile"
        profileImage="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
        tags={
          <div className="flex w-full flex-wrap items-start gap-2">
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              baroque
            </Button>
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              photorealistic
            </Button>
            <Button
              variant="neutral-primary"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              lomography
            </Button>
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
              vapor-mist
            </Button>
          </div>
        }
        actions={
          <div className="flex w-full items-center justify-end gap-2">
            <Button
              className="h-11 grow shrink-0 basis-0"
              variant="neutral-primary"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Cancel
            </Button>
            <Button
              className="h-11 grow shrink-0 basis-0"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Save Profile
            </Button>
          </div>
        }
      />
    </DialogLayout>
  );
}

export default EditProfile;