import { ConfirmDialog } from "@/components/ui/confirm-dialog";

interface DeleteDialogProps {
  open: boolean;
  customerName: string;
  confirming?: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

export function DeleteDialog({ open, customerName, confirming, onCancel, onConfirm }: DeleteDialogProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Delete Customer?"
      description={`This action cannot be undone. Remove ${customerName} from the customer list permanently.`}
      confirming={confirming}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
