import { clearCart } from "../features/cart/cartSlice";
import CartItem from "./CartItem";
import { useSelector, useDispatch} from "react-redux";
const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch()
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>:
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
      </header>
      <footer>
        <hr />
        <div className="cart-total">
        <h4>total <span>${total}</span></h4>
        </div>
        <button type="button" className="btn clear-btn" onClick={()=>dispatch(clearCart())}>clear cart</button>
      </footer>
    </section>
  );
};
export default CartContainer;