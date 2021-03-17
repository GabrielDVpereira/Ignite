import Modal from "react-modal";

interface NewTransactionModalProps {
  isOPen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOPen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <Modal isOpen={isOPen} onRequestClose={onRequestClose}>
      <h2>Cadastrar transação</h2>
    </Modal>
  );
}
