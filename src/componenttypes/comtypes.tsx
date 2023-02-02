// api response state types for each item
type Item = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

// api response state types for list of items

type shoppingCartApiResponse = Item[];

// completed initital data type of api response state
type shoppingCartState = {
  isLoading: boolean;
  items: shoppingCartApiResponse;
  error: {
    message: string;
    status: number | null;
  };
};

// shopping cart type
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
};

// compelted cart data type
type Cart = {
  CartAllItem: CartItem[];

  total: number;
};

// Card Page Props
type CardProps = {
  cardItems: shoppingCartApiResponse;
  handleAddToCart: (item: CartItem) => void;
};

// reducer type

type reducerAction = {
  type: string;
  payload: Cart;
};

type MemoReturnType = {
  momoizedTotal: number;
};

// localstorage cart name
export const MY_CART = "MY_CART";

// switch Cases
export const CASES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  RESET_CART: "RESET_CART",
};

export const QUAN: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// exports

export type {
  shoppingCartApiResponse,
  shoppingCartState,
  CardProps,
  Item,
  reducerAction,
  CartItem,
  Cart,
  MemoReturnType,
};
