import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { api } from "../services/api";

interface Props {
  children: ReactNode;
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: Transaction[];
  income: number;
  outcome: number;
  total: number;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}
interface AxiosTransactionsResponse {
  transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionContextProviver({ children }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [outcome, setOutcome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    getTransactions();
  }, []);

  const createTransaction = async (transaction: TransactionInput) => {
    await api.post("/transactions", { ...transaction, createdAt: new Date() });
    getTransactions();
  };

  const getTransactions = async () => {
    const respose = await api.get<AxiosTransactionsResponse>("/transactions");

    let incomeAmount = 0,
      outcomeAmount = 0,
      totalAmount = 0;

    for (let tr of respose.data.transactions) {
      if (tr.type === "deposit") {
        incomeAmount += tr.amount;
        totalAmount += tr.amount;
      }

      if (tr.type === "withdraw") {
        outcomeAmount += tr.amount;
        totalAmount -= tr.amount;
      }
    }

    setTransactions(respose.data.transactions);
    setIncome(incomeAmount);
    setOutcome(outcomeAmount);
    setTotal(totalAmount);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        income,
        outcome,
        total,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  return useContext(TransactionsContext);
};
