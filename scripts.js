// select dom elements

const c = console.log.bind(console);
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";

// action creators
const increment = (value) => {
    return {
        type: INCREMENT,
        payload: value,
    };
};

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,
    };
};

// initial state
const initialState = {
    value: parseInt(counterEl.innerHTML),
};

// create reducer function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + action.payload,
        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();

    if (state.value < 0) {
        alert("Value cant be less than 0");
    } else {
        counterEl.innerText = state.value.toString();
    }
};

// update UI initially
render();

store.subscribe(render);

// incrementEl.addEventListener("focus", () => {
//     store.dispatch(increment(3));
// });

// decrementEl.addEventListener("click", () => {
//     store.dispatch(decrement(2));
// });

// incrementEl.onchange = function(e) {
//     store.dispatch(increment(3));
// }
incrementEl.onkeydown = function(e) {
    if (e.key == "Enter") {
        const value = incrementEl.value;
        store.dispatch(increment(parseInt(value ? value : 0)));
        e.preventDefault();
    }
};
decrementEl.onkeydown = function(e) {
    if (e.key == "Enter") {
        const value = decrementEl.value;
        store.dispatch(decrement(parseInt(value ? value : 0)));
        e.preventDefault();
    }
};