import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import NavBar from './components/NavBar.jsx'
import CartContainer from './components/CartContainer.jsx'
import Modal from './components/Modal.jsx';
import { calculateTotals } from './features/cart/cartSlice.js';

function App() {
  const {cartItems} = useSelector(store=>store.cart)
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(calculateTotals())
},[cartItems])
  return (
    <main className="App">
      <Modal/>
      <NavBar/>
      <CartContainer/>
    </main>
  )
}

export default App
