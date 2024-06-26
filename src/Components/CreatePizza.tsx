import { useContext } from "react";
import { PizzaContext } from "./PizzaContextProvider";
import uuid from "react-uuid";
import { useState } from "react";
import { Pizza } from "./PizzaContextProvider";

const CreatePizza = () => {
  let sizePrice = 0;
  let toppingPrice = 0;

  const calcPrice = (pizza: Pizza) => {
    let trueToppings = Object.keys(pizza.toppings).filter(
      (topping) => pizza.toppings[topping]
    );
    toppingPrice = trueToppings.length * 10;

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

    pizza.totalPrice = toppingPrice + sizePrice;
  };

  const { dispatch } = useContext(PizzaContext);
  const [pizza, SetPizza] = useState<Pizza>({
    id: uuid(),
    size: "",
    toppings: {
      pommes: false,
      sås: false,
      skinka: false,
    },
    totalPrice: 0,
  });
  calcPrice(pizza);
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
                onClick={() => {
                  SetPizza({
                    ...pizza,
                    toppings: {
                      pommes: !pizza.toppings.pommes,
                      sås: pizza.toppings.sås,
                      skinka: pizza.toppings.skinka,
                    },
                  });
                }}
                type="checkbox"
                name="pommes"
                id="Pommes"
              />
              <label htmlFor="Pommes">Pommes</label>
            </li>
            <li>
              <input
                className="topping"
                onClick={() => {
                  SetPizza({
                    ...pizza,
                    toppings: {
                      pommes: pizza.toppings.pommes,
                      sås: !pizza.toppings.sås,
                      skinka: pizza.toppings.skinka,
                    },
                  });
                }}
                type="checkbox"
                name="sås"
                id="Sås"
              />
              <label htmlFor="Sås">Sås</label>
            </li>
            <li>
              <input
                className="topping"
                onClick={() => {
                  SetPizza({
                    ...pizza,
                    toppings: {
                      pommes: pizza.toppings.pommes,
                      sås: pizza.toppings.sås,
                      skinka: !pizza.toppings.skinka,
                    },
                  });
                }}
                type="checkbox"
                name="skinka"
                id="Skinka"
              />
              <label htmlFor="Skinka">Skinka</label>
            </li>
          </ul>
        </fieldset>
      </div>
      <h2>Din Pizza:</h2>
      <p>
        <span>Storlek: </span> {pizza.size}
      </p>
      <ul>
        <p>
          <span>Toppings: </span>
          {pizza.toppings.pommes ? "Pommes, " : ""}
          {pizza.toppings.sås ? "Sås, " : ""}
          {pizza.toppings.skinka ? "Skinka, " : ""}
        </p>
        <p>Pris: {pizza.totalPrice}</p>
      </ul>
      <button
        className="add-btn"
        onClick={() => {
          dispatch({ type: "ADD", payload: pizza });
          SetPizza({
            id: uuid(),
            size: "",
            toppings: {
              pommes: false,
              sås: false,
              skinka: false,
            },
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
