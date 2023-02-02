import { Image } from "antd";

import { CartItem, QUAN } from "../componenttypes/comtypes";
import React from "react";
type CartItemsListProps = {
  cartItems: CartItem[];
  total: number;
  handleItemRemoveCart: (item: CartItem) => void;
  handleCartReset: () => void;
  handleCartQuantityChanged: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: CartItem
  ) => void;
};
const CartItemsModal = ({
  cartItems,
  total,
  handleItemRemoveCart,
  handleCartReset,
  handleCartQuantityChanged,
}: CartItemsListProps) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cart Items
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="list-group"
                style={{ maxHeight: "400px", overflow: "auto" }}
              >
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((eachCartItem: CartItem) => {
                    return (
                      <div key={eachCartItem.id}>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                        >
                          <div className="d-flex w-100 justify-content-between mb-3">
                            <div className="text-start">
                              <h5 className="mb-3">{eachCartItem.title}</h5>
                              <h6>
                                <strong>
                                  {" "}
                                  $ {eachCartItem.price.toFixed(2)}
                                </strong>
                              </h6>
                            </div>

                            <div className="mx-1">
                              <label
                                htmlFor="exampleDataList"
                                className="form-label"
                              >
                                <small>
                                  Product Quantity{" "}
                                  <strong>
                                    {eachCartItem.quantity} - ${" "}
                                    {(
                                      eachCartItem.price * eachCartItem.quantity
                                    ).toFixed(2)}
                                  </strong>
                                </small>
                              </label>
                              <div style={{ width: "187px" }}>
                                <input
                                  className="form-control"
                                  list="datalistOptions"
                                  id="exampleDataList"
                                  placeholder="Custom Quantity"
                                  onChange={(e) => {
                                    handleCartQuantityChanged(e, eachCartItem);
                                  }}
                                  type={"number"}
                                  pattern="[0-9]"
                                  title="Numbers only"
                                />
                                <datalist id="datalistOptions">
                                  {QUAN.map((quan: number) => {
                                    return <option value={quan} key={quan} />;
                                  })}
                                </datalist>
                              </div>
                            </div>
                          </div>

                          <div>
                            <img
                              src={eachCartItem.image}
                              className="img-responsive"
                            />
                          </div>

                          <p className="mb-3">{eachCartItem.description}</p>

                          <div className="text-start pb-3">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleItemRemoveCart(eachCartItem);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <h4 className="text-danger">
                      Cart Empty{" "}
                      <span>
                        <i className="bi bi-cart"></i>
                      </span>{" "}
                    </h4>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer border  d-flex justify-content-between align-items-center">
              {total ? (
                <h3 className="text-danger text-decoration-underline">
                  Total : <strong>$ {total.toFixed(2)}</strong>{" "}
                </h3>
              ) : null}
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                {cartItems && cartItems.length > 0 ? (
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      handleCartReset();
                    }}
                  >
                    Reset Cart
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default CartItemsModal;
