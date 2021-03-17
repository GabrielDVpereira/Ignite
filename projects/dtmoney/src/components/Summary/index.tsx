import { Container } from "./styles";
import icomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImge from "../../assets/total.svg";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={icomeImg} alt="entradas" />
        </header>
        <strong>R$ 1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="entradas" />
        </header>
        <strong>R$ 1000,00</strong>
      </div>
      <div className="highlight-backgroud">
        <header>
          <p>Total</p>
          <img src={totalImge} alt="entradas" />
        </header>
        <strong>R$ 1000,00</strong>
      </div>
    </Container>
  );
}
