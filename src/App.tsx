import "./App.scss";
import Cart from "./Components/Cart";
import CreatePizza from "./Components/CreatePizza";
import PizzaContextProvider from "./Components/PizzaContextProvider";

function App() {
  return (
    <div className="app">

      <PizzaContextProvider>
        <CreatePizza />
        <Cart />
      </PizzaContextProvider>
    </div>
  );
}

export default App;
