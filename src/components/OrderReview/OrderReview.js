import React from "react";
import useCart from "../../hooks/useCart";
import useProducts from "../../hooks/useProducts";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";
import { removeFromDb } from "../../utilities/fakedb";
import { useHistory } from "react-router";

const OrderReview = () => {
  const [products] = useProducts();
  const [cart, setCart] = useCart(products);
  const history = useHistory();

  const handleRemove = (key) => {
    const newCart = cart.filter((product) => product.key !== key);
    setCart(newCart);
    removeFromDb(key);
  };

  const handleProceedToShipping = () => {
    // clear from the ui
    // setCart([]); (changed)
    // clear from the localStorage
    // clearTheCart(); (changed)
    // history.push("/placeorder"); (changed)
    history.push("/shipping");
  };

  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((product) => (
          <ReviewItem
            product={product}
            key={product.key}
            handleRemove={handleRemove}
          ></ReviewItem>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <button onClick={handleProceedToShipping} className="btn-regular">
            Proceed to Shipping
          </button>
        </Cart>
      </div>
    </div>
  );
};

export default OrderReview;
