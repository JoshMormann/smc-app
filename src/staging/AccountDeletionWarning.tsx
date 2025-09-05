"use client";

import React from "react";
import { WarningDialog } from "@/ui/components/WarningDialog";
import { DialogLayout } from "@/ui/layouts/DialogLayout";

function AccountDeletionWarning() {
  return (
    <DialogLayout open={false} onOpenChange={() => {}}>
      <WarningDialog
        title="Warning!"
        subtitle="Account Deletion Cannot Be Undone!"
      />
    </DialogLayout>
  );
}

export default AccountDeletionWarning;