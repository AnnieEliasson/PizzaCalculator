import { useContext } from "react";
import { PizzaContext, Topping } from "./PizzaContextProvider";
import uuid from "react-uuid";
import { useState } from "react";
import { Pizza } from "./PizzaContextProvider";
import { toppings } from "./Toppings";

const CreatePizza = () => {
  const [toppingArr, setToppingArr] = useState([] as Topping[]);

  const { dispatch } = useContext(PizzaContext);
  const [pizza, SetPizza] = useState<Pizza>({
    id: uuid(),
    size: "",
    topping: [],
    totalPrice: 0,
  });

  const calcPrice = (pizza: Pizza) => {
    let sizePrice = 0;
    let toppingPrice = 0;

    switch (pizza.size) {
      case "Small":
        sizePrice = 25;
        break;
      case "Medium":
        sizePrice = 50;
        break;
      case "Big":
        sizePrice = 75;
        break;
      default:
        break;
    }

    toppingArr.forEach((t) => {
      toppingPrice = toppingPrice + t.price;
    });

    SetPizza({ ...pizza, totalPrice: sizePrice + toppingPrice });
  };

  return (
    <div className="Create-Pizza">
      <h1>CreatePizza</h1>
      <div className="inputs">
        <fieldset>
          <legend>Välj Storlek</legend>

          <label htmlFor="Small">Small</label>
          <input
            onChange={(e) => {
              SetPizza({ ...pizza, size: e.target.id });
            }}
            type="radio"
            name="size"
            id="Small"
          />

          <label htmlFor="Medium">Medium</label>
          <input
            onChange={(e) => {
              SetPizza({ ...pizza, size: e.target.id });
            }}
            type="radio"
            name="size"
            id="Medium"
          />

          <label htmlFor="Big">Big</label>
          <input
            onChange={(e) => {
              SetPizza({ ...pizza, size: e.target.id });
            }}
            type="radio"
            name="size"
            id="Big"
          />
        </fieldset>
        <fieldset>
          <legend>Topping</legend>

          <ul style={{ listStyle: "none" }}>
            <li>
              <input
                className="topping"
                onClick={(e: any) => {
                  let choise = toppings.find((t) => t.name === e.target.id);
                  setToppingArr([...toppingArr, choise as Topping]);
                }}
                type="checkbox"
                name="pommes"
                id="pommes"
              />
              <label htmlFor="Pommes">Pommes</label>
            </li>
            <li>
              <input
                className="topping"
                onClick={(e: any) => {
                  let choise = toppings.find((t) => t.name === e.target.id);
                  setToppingArr([...toppingArr, choise as Topping]);
                }}
                type="checkbox"
                name="sås"
                id="sås"
              />
              <label htmlFor="Sås">Sås</label>
            </li>
            <li>
              <input
                className="topping"
                onClick={(e: any) => {
                  let choise = toppings.find((t) => t.name === e.target.id);
                  setToppingArr([...toppingArr, choise as Topping]);
                }}
                type="checkbox"
                name="skinka"
                id="skinka"
              />
              <label htmlFor="Skinka">Skinka</label>
            </li>
          </ul>

          <button
            onClick={() => {
              calcPrice(pizza);
              SetPizza({
                ...pizza,
                topping: toppingArr,
              });
            }}
          >
            Lägg till A
          </button>
        </fieldset>
      </div>
      <h2>Din Pizza:</h2>
      <p>
        <span>Storlek: </span> {pizza.size}
      </p>
      <ul>
        <span>Toppings: </span>
        {toppingArr.map((t) => (
          <p key={t.name}>{t.name}</p>
        ))}

        <p>Pris: {pizza.totalPrice}</p>
      </ul>
      <button
        className="add-btn"
        onClick={() => {
          dispatch({ type: "ADD", payload: pizza });
          SetPizza({
            id: uuid(),
            size: "",
            topping: [],
            totalPrice: 0,
          });

          const checkboxes: NodeListOf<HTMLInputElement> =
            document.querySelectorAll(".topping");
          const radios = document.getElementsByName(
            "size"
          ) as NodeListOf<HTMLInputElement>;
          checkboxes.forEach((box) => {
            box.checked = false;
          });

          radios.forEach((radio) => {
            radio.checked = false;
          });
        }}
      >
        Lägg Till Pizza
      </button>
    </div>
  );
};

export default CreatePizza;
