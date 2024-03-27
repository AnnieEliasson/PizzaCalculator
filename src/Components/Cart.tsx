import { useContext } from "react";
import { PizzaContext } from "./PizzaContextProvider";

const Cart = () => {
  const { state, dispatch } = useContext(PizzaContext);

//   let totalAmount = 0;
//   const endPrice = () => {
//     state.pizzas.forEach((p) => {
//       totalAmount = totalAmount + p.totalPrice;
//     });
//   };
//   endPrice();

  
  return (
    <div className="Cart">
      <h1>Kundkorg</h1>
      <ul>
        {state.pizzas.map((p) => {
          return (
            <li key={p.id}>
              <p>Size: {p.size} </p> 
              {p.topping.map((t) => <p key={t.name}>{t.name}, {t.price} kr</p>)}
              <p>Pris: {p.totalPrice}</p>
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
              <p>Total Summa: {p.totalPrice}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
