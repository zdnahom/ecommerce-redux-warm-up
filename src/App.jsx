import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import NavBar from './components/NavBar.jsx'
import CartContainer from './components/CartContainer.jsx'
import Modal from './components/Modal.jsx';
import { calculateTotals,getCartItem } from './features/cart/cartSlice.js';
import { store } from './store.js';

function App() {
  const {cartItems,isLoading} = useSelector(store=>store.cart)
  const {isOpen} = useSelector(store=>store.modal)
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(calculateTotals())
},[cartItems])

useEffect(()=>{
  dispatch(getCartItem())
},[])

if (isLoading) {
  return (
    <div className='loading'>
      <h1>Loading...</h1>
    </div>
  )
}
  return (
    <main className="App">
     {isOpen &&<Modal/>}
      <NavBar/>
      <CartContainer/>
    </main>
  )
}

export default App
