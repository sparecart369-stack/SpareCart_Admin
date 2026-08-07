import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface DeleteDialogProps {
  open: boolean;
  customerName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteDialog({ open, customerName, onCancel, onConfirm }: DeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Delete Customer?"
      description={`This action cannot be undone. Remove ${customerName} from the customer list permanently.`}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
