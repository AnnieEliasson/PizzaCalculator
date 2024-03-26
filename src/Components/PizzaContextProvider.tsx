import React, { createContext, useReducer } from "react";
/* import uuid from "react-uuid"; */

type PropList = {
  children: React.ReactNode;
};

export type Topping = {
  pommes: boolean;
  sås: boolean;
  skinka: boolean;
};

export type Pizza = {
  id: string;
  size: string;
  toppings: Topping;
};

type PizzaState = {
  pizzas: Pizza[];
};

const initialPizzas: PizzaState = {
  pizzas: [
    /* {
      id: uuid(),
      size: "small",
      toppings: {
        pommes: false,
        sås: false,
        skinka: false,
      },
    }, */
  ],
};

type Action = {
  type: string;
  payload: Pizza | string;
};

const reducer = (state: PizzaState, action: Action) => {
  switch (action.type) {
    case "ADD":
      console.log(state);

      return { pizzas: [...state.pizzas, action.payload] };

      case 'REMOVE': 
      return {pizzas: [...state.pizzas.filter((p)=> p.id != action.payload)]}
      
  }

  return state;
};

export const PizzaContext = createContext<{
  state: PizzaState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialPizzas,
  dispatch: () => null,
});

const PizzaContextProvider = ({ children }: PropList) => {
  const [state, dispatch] = useReducer(reducer, initialPizzas);

  return (
    <PizzaContext.Provider value={{ state, dispatch }}>
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaContextProvider;
