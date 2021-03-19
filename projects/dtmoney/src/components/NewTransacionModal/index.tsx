import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useState, FormEvent } from "react";
import { api } from "../../services/api";

interface NewTransactionModalProps {
  isOPen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOPen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState<string>("deposit");
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>("");

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      value,
      category,
    };

    const response = await api.post("/transactions", data);
    console.log(response);
  };

  return (
    <Modal
      isOpen={isOPen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="Number"
          placeholder="Valor"
          onChange={(e) => setValue(Number(e.target.value))}
          value={value}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
