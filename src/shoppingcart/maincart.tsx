import { useEffect, useState, useReducer, ReducerAction, useMemo } from "react";
import axios from "axios";
import {
  CASES,
  Cart,
  CartItem,
  MY_CART,
  MemoReturnType,
  reducerAction,
  shoppingCartState,
} from "../componenttypes/comtypes";
import Cards from "./cards";
import CartItemsModal from "./cartItems";

let parsedItems: Cart | null = null;

const items: string | null = localStorage.getItem(MY_CART);

if (items) {
  parsedItems = JSON.parse(items);
}

const initialState: Cart = {
  total: parsedItems ? parsedItems.total : 0,
  CartAllItem: parsedItems ? parsedItems.CartAllItem : [],
};

const reducer = (state: Cart, action: reducerAction): Cart => {
  switch (action.type) {
    case CASES.ADD_TO_CART:
      return {
        ...state,
        CartAllItem: action.payload.CartAllItem,
        total: action.payload.total,
      };

    case CASES.RESET_CART:
      return {
        ...state,
        CartAllItem: [],
        total: 0,
      };

    default:
      return state;
  }
};

const MainShoppingCartComponent = () => {
  const [shoppingCartState, setShoppingCartState] = useState<shoppingCartState>(
    { isLoading: true, items: [], error: { message: "", status: null } }
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProducts = async (): Promise<void> => {
      try {
        const data = await axios.get("https://fakestoreapi.com/products");

        setShoppingCartState((prevValue) => ({
          ...prevValue,
          isLoading: false,
          items: data.data.slice(0, 3),
        }));
      } catch (error: any) {
        setShoppingCartState((prevValue) => ({
          ...prevValue,
          error: error,
          isLoading: false,
        }));
      }
    };

    getProducts();
  }, []);



  // 




  const memoData = useMemo((): MemoReturnType => {

    let totalAmount: number = 0;

    let copyOfItem: CartItem[] = [...state.CartAllItem];

    for (let index = 0; index < copyOfItem.length; index++) {
      totalAmount += copyOfItem[index].price * copyOfItem[index].quantity;
    }


    localStorage.setItem(
      MY_CART,
      JSON.stringify({ total: totalAmount, CartAllItem: copyOfItem })
    );



    return { momoizedTotal: totalAmount };
  }, [state.CartAllItem]);












  const checkForDuplicateItem = (item: CartItem): Cart => {
    if (state.CartAllItem) {
      let itemArrayCopy = [...state.CartAllItem];
      let isItemAvailable: CartItem | null = null;
      let itemTotalPrice: number = 0;

      let CartTotal: number = state.total;

      for (let index = 0; index < itemArrayCopy.length; index++) {
        if (itemArrayCopy[index].id === item.id) {
          itemArrayCopy[index].quantity += 1;
          isItemAvailable = itemArrayCopy[index];
          break;
        }
      }

      if (isItemAvailable) {
        CartTotal = CartTotal + isItemAvailable.price;
        return {
          CartAllItem: itemArrayCopy,
          total: CartTotal + isItemAvailable.price,
        };
      }

      item = { ...item, quantity: 1 };

      itemTotalPrice = item.price * item.quantity;

      CartTotal = CartTotal + itemTotalPrice;

      return {
        total: CartTotal,
        CartAllItem: [...state.CartAllItem, item],
      };
    }

    return { total: 0, CartAllItem: [] };
  };

  const handleAddToCart = (item: CartItem): void => {
    const newDuplicateData: Cart = checkForDuplicateItem(item);

    dispatch({
      type: CASES.ADD_TO_CART,
      payload: {
        CartAllItem: newDuplicateData.CartAllItem,
        total: newDuplicateData.total,
      },
    });

    localStorage.setItem(MY_CART, JSON.stringify(newDuplicateData));
  };

  if (shoppingCartState.isLoading) {
    return <p className="text-danger">Loading...</p>;
  }

  if (shoppingCartState.error.message) {
    return <p className="text-danger">{shoppingCartState.error.message}</p>;
  }

  const handleItemRemoveCart = (itemToBeRemoved: CartItem): void => {
    let newCartItems: CartItem[] = state.CartAllItem.filter(
      (item) => item.id !== itemToBeRemoved.id
    );

    const newCart: Cart = {
      CartAllItem: newCartItems,
      total: state.total,
    };

    dispatch({
      type: CASES.ADD_TO_CART,
      payload: newCart,
    });

    localStorage.setItem(MY_CART, JSON.stringify(newCart));
  };

  const handleCartQuantityChanged = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: CartItem
  ): void => {
    const { value } = event.target;
    let copyofMainState = [...state.CartAllItem];
    let parsedValue: number = 0;

    if (value) {
      parsedValue = parseInt(value);
    }

    if (parsedValue && parsedValue >= 1) {
      for (let index = 0; index < copyofMainState.length; index++) {
        if (copyofMainState[index].id === item.id) {
          copyofMainState[index].quantity = parsedValue;
          break;
        }
      }

      dispatch({
        type: CASES.ADD_TO_CART,
        payload: { CartAllItem: copyofMainState, total: state.total },
      });
    } else {
      for (let index = 0; index < copyofMainState.length; index++) {
        if (copyofMainState[index].id === item.id) {
          copyofMainState[index].quantity = 1;
          break;
        }
      }

      dispatch({
        type: CASES.ADD_TO_CART,
        payload: { CartAllItem: copyofMainState, total: state.total },
      });
    }
  };

  const handleCartReset = (): void => {
    dispatch({
      type: CASES.RESET_CART,
      payload: { CartAllItem: [], total: 0 },
    });
  };

  return (
    <>
      <h4 className="display-4 fs-3  ">
        Typescript Shopping Cart
        <span className="px-3 ">
          <i className="bi bi-cart3"></i>
          <span className="text-danger fw-bold">
            ({state?.CartAllItem.length})
          </span>
        </span>
      </h4>

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        View Cart
      </button>
      <section className="mt-5 text-start">
        <Cards
          cardItems={shoppingCartState.items}
          handleAddToCart={handleAddToCart}
        />
      </section>

      <CartItemsModal
        cartItems={state.CartAllItem}
        total={memoData.momoizedTotal}
        handleItemRemoveCart={handleItemRemoveCart}
        handleCartReset={handleCartReset}
        handleCartQuantityChanged={handleCartQuantityChanged}
      />
    </>
  );
};

export default MainShoppingCartComponent;
