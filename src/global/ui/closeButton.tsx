import { IconX } from "@tabler/icons-react";

type CloseButtonProps = {
  onCloseButton: () => void;
};

export function CloseButton({ onCloseButton }: CloseButtonProps) {
  return <IconX stroke={2} onClick={onCloseButton} />;
}
