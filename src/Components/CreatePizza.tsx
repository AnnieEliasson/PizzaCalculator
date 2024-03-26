import { useContext } from "react";
import { PizzaContext } from "./PizzaContextProvider";
import uuid from "react-uuid";
import { useState } from "react";
import { Pizza } from "./PizzaContextProvider";

const CreatePizza = () => {
  const { dispatch } = useContext(PizzaContext);
  const [pizza, SetPizza] = useState<Pizza>({
    id: uuid(),
    size: "",
    toppings: {
      pommes: false,
      sås: false,
      skinka: false,
    },
  });

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
      <p><span>Storlek: </span> {pizza.size}</p>
      <ul>
        <p><span>Toppings: </span>
        {pizza.toppings.pommes ? "Pommes, " : ""}
        {pizza.toppings.sås ? "Sås, " : ""}
        {pizza.toppings.skinka ? "Skinka, " : ""}
        </p>

        
      </ul>
      <button className="add-btn"
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
          })

          const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(".topping")
          const radios: NodeListOf<HTMLInputElement> = document.getElementsByName("size")
          checkboxes.forEach(box => {
            box.checked = false
          });

          radios.forEach(radio => {
            radio.checked = false
          });
        }}
      >
        Lägg Till Pizza
      </button>
    </div>
  );
};

export default CreatePizza;
