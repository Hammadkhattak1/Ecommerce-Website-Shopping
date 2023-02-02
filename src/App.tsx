import "./App.css";
import MainShoppingCartComponent from "./shoppingcart/maincart";

function App() {
  return (
    <div className="App">
      <div className="container-lg mt-5">
        <div className="row  justify-content-center align-items-center">
          <div className="col text-center">
            <MainShoppingCartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
