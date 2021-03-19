import Modal from "react-modal";
import { Container } from "./styles";

interface NewTransactionModalProps {
  isOPen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOPen,
  onRequestClose,
}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOPen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" />
        <input type="Number" placeholder="Valor" />
        <input placeholder="Categoria" />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
