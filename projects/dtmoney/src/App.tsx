import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransacionModal";
import Modal from "react-modal";
import { TransactionContextProviver } from "./hooks/useTransactions";

Modal.setAppElement("#root");

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freela de web",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2021-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1500,
          createdAt: new Date("2021-02-12 09:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
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
    <TransactionContextProviver>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOPen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionContextProviver>
  );
}
