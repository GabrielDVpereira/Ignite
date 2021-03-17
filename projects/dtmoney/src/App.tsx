import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer } from "miragejs";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransacionModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Transaction 1",
          amout: 400,
          type: "deposit",
          category: "food",
          createdAt: new Date(),
        },
      ];
    });
  },
});

export function App() {
  const [
    isNewTransactionModalOpen,
    setNewTransactionModalOpen,
  ] = useState<boolean>(false);

  function handleOpenNewTransactionModalOpen() {
    setNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setNewTransactionModalOpen(false);
  }

  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOPen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}
