import { useContext } from 'react'
import { PizzaContext } from './PizzaContextProvider'

const Cart = () => {
    const {state, dispatch} = useContext(PizzaContext)
  return (
    <div className='Cart'>
        <h1>Kundkorg</h1>
        <ul>
            {
                state.pizzas.map((p)=>{
                    return <li key={p.id}>Size: {p.size} ({p.toppings.pommes? 'Pommes, ' : ''}{p.toppings.sås? 'Sås, ' : ''}{p.toppings.skinka? 'Skinka, ': ''})<button onClick={(e)=>{dispatch({type: 'REMOVE', payload: e.target.value})}} value={p.id} className='delete-btn'>X</button></li>
                })
            }
        </ul>
    </div>
  )
}

export default Cart