import { CardProps, Item } from "../componenttypes/comtypes";

const Cards = ({ cardItems, handleAddToCart }: CardProps) => {
  return (
    <>
      <div className="row">
        {cardItems && cardItems.length > 0
          ? cardItems.map((item: Item) => {
              return (
                <div className="col-md-4" key={item.id}>
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                    <div className="card-body">
                    <div>
                            <img
                              src={item.image}
                              className="img-responsive"
                            />
                          </div>
                      <div className="mb-3">
                        <p className="card-text">{item.description}</p>
                      </div>

                      <h6>
                        Rating{" "}
                        <span className="badge bg-secondary">
                          {item.rating.rate}
                        </span>{" "}
                      </h6>

                      <h6>
                        Price{" "}
                        <span className="badge bg-dark"> $ {item.price}</span>{" "}
                      </h6>
                    </div>
                    <div className="card-footer">
                      <a
                        href="#"
                        className="btn btn-danger"
                        onClick={() => {
                          handleAddToCart({ ...item, quantity: 0 });
                        }}
                      >
                        Add to cart{" "}
                        <span className="px-2">
                          <i className="bi bi-cart"></i>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          : "No Items are available"}
      </div>
    </>
  );
};

export default Cards;
