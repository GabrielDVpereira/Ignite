import { Container } from "./styles";
import icomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImge from "../../assets/total.svg";
import { useTransactions } from "../../TransactionsContext";

export function Summary() {
  const { total, income, outcome } = useTransactions();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={icomeImg} alt="entradas" />
        </header>
        <strong>{formatAmount(income)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="entradas" />
        </header>
        <strong>-{formatAmount(outcome)}</strong>
      </div>
      <div className="highlight-backgroud">
        <header>
          <p>Total</p>
          <img src={totalImge} alt="entradas" />
        </header>
        <strong>{formatAmount(total)}</strong>
      </div>
    </Container>
  );
}
