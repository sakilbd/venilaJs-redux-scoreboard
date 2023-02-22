// select dom elements

const c = console.log.bind(console);
const counterEl = document.getElementById("counter1");
const incrementEl = document.getElementById("increment1");
const decrementEl = document.getElementById("decrement1");
const resetBtn = document.getElementById("reset1");

const matchEl = document.getElementById("match1");
const matchTitle = document.getElementById("match-title1");
const containerEl = document.getElementById("container");
const matchCreateBtn = document.getElementById("match-create-button");

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";

// action creators
const increment = (value, match_id) => {
    return {
        type: INCREMENT,
        payload: value,
        match_id: match_id,

    };
};

const decrement = (value, match_id) => {
    return {
        type: DECREMENT,
        payload: value,
        match_id: match_id,
    };
};
const reset = () => {
    return {
        type: RESET,
    };
};

let i = 2;
let currentNodeId = 1;
let existingIdArray = []

const createObject = (matchid) => {
    return {
        [matchid]: 0

    }
}

// initial state
const initialState = {
    value: 0,
    match_id: 1,
    dynamicObject: { 1: 0 }
};



// create reducer function
function counterReducer(state = initialState, action) {
    c("aciton_match_id :" + action.match_id);
    if (action.type === INCREMENT) {
        c("dynamicObject : " + state.dynamicObject[action.match_id])
        c("payload : " + action.payload)
        return {
            ...state,
            value: state.value + action.payload,
            dynamicObject: {
                ...state.dynamicObject,
                [action.match_id]: state.dynamicObject[action.match_id] ? state.dynamicObject[action.match_id] + action.payload : action.payload,
            },
            match_id: action.match_id ? action.match_id : 1,

        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload < 0 ? 0 : state.value - action.payload,
            dynamicObject: {
                ...state.dynamicObject,
                [action.match_id]: state.dynamicObject[action.match_id] ? (state.dynamicObject[action.match_id] - action.payload) < 0 ? 0 : (state.dynamicObject[action.match_id] - action.payload) : 0,

            },
            match_id: action.match_id ? action.match_id : 1,

        };

    } else if (action.type === RESET) {

        for (let idx = 1; idx < i; idx++) {
            let resetCounterId = 'counter' + idx;
            let incrementId = 'increment' + idx;
            let decremenId = 'decrement' + idx;
            let resetCounterDom = document.getElementById(resetCounterId);
            if (resetCounterDom) {
                resetCounterDom.innerText = 0;
                document.getElementById(incrementId).value = ""
                document.getElementById(decremenId).value = ""

            }
            initialState.dynamicObject[currentNodeId] = 0;
            // c(JSON.stringify(initialState))
        }
        return {
            ...state,
            value: 0,
            dynamicObject: {
                ...initialState,
            }
        };
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    // console.log(JSON.stringify(state.dynamicObject));
    if (state.value < 0) {
        alert("Value cant be less than 0");
    } else {
        c("match_id " + state.match_id);

        let counterDynamic = `counter` + currentNodeId;
        let _dom = document.getElementById(counterDynamic);
        // _dom.innerText = state.value.toString();
        _dom.innerText = state.dynamicObject[currentNodeId] ? state.dynamicObject[currentNodeId] : 0;
    }
};

// update UI initially
render();

store.subscribe(render);
incrementEl.onkeydown = function(e) {
    if (e.key == "Enter") {
        currentNodeId = 1;
        const value = incrementEl.value;
        store.dispatch(increment(parseInt(value ? value : 0), 1));
        e.preventDefault();
    }
};
decrementEl.onkeydown = function(e) {
    if (e.key == "Enter") {
        currentNodeId = 1;
        const value = decrementEl.value;
        store.dispatch(decrement(parseInt(value ? value : 0), 1));
        e.preventDefault();
    }
};
resetBtn.addEventListener("click", () => {
    incrementEl.value = "";
    decrementEl.value = "";
    store.dispatch(reset());
});

const cloneNode = () => {
    const cloneMathEl = matchEl.cloneNode(true);
    cloneMathEl.id = "match" + i;
    containerEl.appendChild(cloneMathEl);

    const incrementInput = document.querySelectorAll(`#match${i} #increment1`)[0];
    const decrementInput = document.querySelectorAll(`#match${i} #decrement1`)[0];
    const result = document.querySelectorAll(`#match${i} #counter1`)[0];
    const closeBtn = document.querySelectorAll(`#match${i} #close1`)[0];
    const matchTitle = document.querySelectorAll(`#match${i} #match-title1`)[0];

    incrementInput.id = "increment" + i;
    decrementInput.id = "decrement" + i;
    result.id = "counter" + i;
    closeBtn.id = "close" + i;
    matchTitle.id = "match-title" + i;
    var matchDynamic = `match${i}`;
    var closeDynamic = `close${i}`;
    matchTitle.innerHTML = `Match ${i}`;
    document.getElementById(closeDynamic).addEventListener("click", () => {
        document.getElementById(matchDynamic).remove();
    });

    let [incrementDynacmicId, decrementDynamicId, counterDynamicId] = [`increment${i}`, `decrement${i}`, `counter${i}`]

    document.getElementById(incrementDynacmicId).value = '';
    document.getElementById(decrementDynamicId).value = '';
    document.getElementById(counterDynamicId).innerText = 0;
    // c(JSON.stringify(initialState.dynamicObject));

    dynamicActionWithId(i);
    i++;



};
const dynamicActionWithId = (idx) => {
    let tempIdArr = []
    for (let j = 2; j <= idx; j++) {
        let incrementElDynamicId = `increment${j}`;
        let decrementElDynamicId = `decrement${j}`;
        // c(incrementElDynamicId);

        const incrementDynamicElement =
            document.getElementById(incrementElDynamicId);
        const decrementDynamicElement =
            document.getElementById(decrementElDynamicId);

        // c(incrementDynamicElement.value)
        if (incrementDynamicElement) {
            tempIdArr.push(j)
            incrementDynamicElement.onkeydown = function(e) {
                if (e.key == "Enter") {
                    currentNodeId = j;

                    c("j : " + j)
                    const value = incrementDynamicElement.value;
                    // c(i)
                    store.dispatch(increment(parseInt(value ? value : 0), j));
                    e.preventDefault();
                }
            };
            decrementDynamicElement.onkeydown = function(e) {
                if (e.key == "Enter") {
                    currentNodeId = j;
                    const value = decrementDynamicElement.value;
                    store.dispatch(decrement(parseInt(value ? value : 0), j));
                    e.preventDefault();
                }
            };
        }
        existingIdArray = [];
        existingIdArray = [tempIdArr];
    }
};

matchCreateBtn.addEventListener("click", () => {
    initialState.value = 0;
    // c(existingIdArray)
    cloneNode();
});

document.getElementById("close1").addEventListener("click", () => {
    document.getElementById("match1").remove();
});