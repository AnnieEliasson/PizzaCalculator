import { useContext } from "react";
import { PizzaContext } from "./PizzaContextProvider";

const Cart = () => {
  const { state, dispatch } = useContext(PizzaContext);

  let totalAmount = 0;
  const endPrice = () => {
    state.pizzas.forEach((p) => {
      totalAmount = totalAmount + p.totalPrice;
    });
  };
  endPrice();

  return (
    <div className="Cart">
      <h1>Kundkorg</h1>
      <ul>
        {state.pizzas.map((p) => {
          return (
            <li key={p.id}>
              Size: {p.size}  <p>Pris: {p.totalPrice}</p>
              <button
                onClick={(e) => {
                  dispatch({
                    type: "REMOVE",
                    payload: (e.target as HTMLInputElement).value,
                  });
                }}
                value={p.id}
                className="delete-btn"
              >
                X
              </button>
            </li>
          );
        })}
        <p>Total Summa: {totalAmount}</p>
      </ul>
    </div>
  );
};

export default Cart;
