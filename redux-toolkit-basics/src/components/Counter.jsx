import { useState } from "react"
//useSelector here is to get global state variable from store
//useDispatch is to call/use global actions from counterSlice
import { useSelector, useDispatch } from "react-redux"
import { 
    increment, 
    decrement, 
    reset, 
    incrementByAmnt 
} from "../features/counter/counterSlice"

const Counter = () => {
    //get count state from app/store.js
    //counterPers is from app/store.js
    const count = useSelector(state => state.counterPers.count)
    //initialize dispatch
    const dispatch = useDispatch()

    const [incrAmount, setIncrAmount] = useState(0)
    const addValue = Number(incrAmount) || 0

    const resetAll = () => {
        setIncrAmount(0)
        //call reset action inside dispatch to perform its functionality
        dispatch(reset())
    }

    return (
        <section>
            <h1 className="text-center h1">Count: {count}</h1>
            <div className="d-flex justify-content-center mb-3 mt-3">
                <button 
                    className="btn btn-success me-1 px-5 fs-3" 
                    //call increment action inside dispatch
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>

                <button 
                    className="btn btn-danger ms-1 px-5 fs-3" 
                    //call decrement action inside dispatch
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
            </div>

            <input 
                className="form-control mb-3"
                type="text" 
                value={incrAmount}
                onChange={(e) => setIncrAmount(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-3">
                <button 
                    className="btn btn-warning btn-lg me-1" 
                    //call incrementByAmnt action inside dispatch
                    onClick={() => dispatch(incrementByAmnt(addValue))}
                >
                    Add Amount
                </button>

                <button 
                    className="btn btn-secondary btn-lg ms-1" 
                    onClick={resetAll}
                >
                    Reset
                </button>
            </div>
        </section>
    )
}

export default Counter