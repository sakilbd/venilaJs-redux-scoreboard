// select dom elements

const c = console.log.bind(console);
const counterEl = document.getElementById("counter1");
const incrementEl = document.getElementById("increment1");
const decrementEl = document.getElementById("decrement1");
const resetBtn = document.getElementById("reset1");

const matchEl = document.getElementById("match1");
const matchTitle = document.getElementById("match-title1")
const containerEl = document.getElementById("container");
const matchCreateBtn = document.getElementById("match-create-button");

// const query = document.querySelectorAll(".match >.wrapper >.lws-matchName")[0]
//     .innerHTML;

// c(query);

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

const decrement = (value) => {
    return {
        type: DECREMENT,
        payload: value,

    };
};
const reset = () => {
    return {
        type: RESET,
    };
};

// initial state
const initialState = {
    value: parseInt(counterEl.innerHTML),
    match_id: 1,
};

// create reducer function
function counterReducer(state = initialState, action) {
    c(action.match_id)
    if (action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + action.payload,
            match_id: action.match_id ? action.match_id : 1
        };
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload < 0 ? 0 : state.value - action.payload,
        };
    } else if (action.type === RESET) {
        return {
            ...state,
            value: 0,
        };
    } else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    console.log(state)
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
resetBtn.addEventListener("click", () => {
    incrementEl.value = "";
    decrementEl.value = "";
    store.dispatch(reset());
});

let i = 2;
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
    result.id = "result" + i;
    closeBtn.id = "close" + i;
    matchTitle.id = 'match-title' + i;
    var matchDynamic = `match${i}`;
    var closeDynamic = `close${i}`;
    matchTitle.innerHTML = `Match ${i}`
    document.getElementById(closeDynamic).addEventListener('click', () => {
        document.getElementById(matchDynamic).remove();
    })

    let incrementElDynamicId = `increment${i}`
    let decrementElDynamicId = `decrement${i}`
    c(incrementElDynamicId)

    const incrementDynamicElement = document.getElementById(incrementElDynamicId);
    const decrementDynamicElement = document.getElementById(decrementElDynamicId);

    c(incrementDynamicElement.value)




    c(incrementDynamicElement.onkeydown = function(e) {
        alert("sex")
        if (e.key == "Enter") {
            const value = incrementDynamicElement.value;
            c(value)
            store.dispatch(increment(parseInt(value ? value : 0), i));
            e.preventDefault();
        }
    });
    incrementDynamicElement.onkeydown = function(e) {
        if (e.key == "Enter") {
            const value = decrementDynamicElement.value;
            store.dispatch(decrement(parseInt(value ? value : 0)));
            e.preventDefault();
        }
    };



    // c(incrementInput);
    // c(decrementInput);
    // c(result);
    // c(closeBtn);
    // for (let idx = 1; idx <= i; idx++) {
    //     window["counterEl_" + idx] = document.getElementById(`counter${idx}`);
    //     window["incrementEl_" + idx] = document.getElementById(`increment${idx}`);
    //     window["decrementEl_" + idx] = document.getElementById(`decrement${idx}`);
    //     window["resetBtn_" + idx] = document.getElementById(`reset${idx}`);
    //     window["matchEl_" + idx] = document.getElementById(`match${idx}`);

    //     let incrementDynamicId = `incrementEl_${i}`;
    //     let decrementDynamicID = `decrementEl_${i}`;
    //     // let resetDynamicId = `resetBtn_${i}`;
    //     incrementDynamicId.onkeydown = function(e) {
    //         if (e.key == "Enter") {
    //             const value = incrementDynamicId.value;
    //             store.dispatch(increment(parseInt(value ? value : 0)));
    //             e.preventDefault();
    //         }
    //     };
    //     decrementDynamicID.onkeydown = function(e) {
    //         if (e.key == "Enter") {
    //             const value = decrementDynamicID.value;
    //             store.dispatch(decrement(parseInt(value ? value : 0)));
    //             e.preventDefault();
    //         }
    //     };
    // }

    // resetDynamicId.addEventListener("click", () => {
    //     incrementDynamicId.value = "";
    //     decrementDynamicID.value = "";
    //     store.dispatch(reset());
    // });
};
// const cloneMathEl = matchEl.cloneNode(true);
// cloneMathEl.id = "match1";
// containerEl.appendChild(cloneMathEl);

matchCreateBtn.addEventListener("click", () => {
    cloneNode();
    ++i;
});

document.getElementById('close1').addEventListener('click', () => {
    document.getElementById('match1').remove();
})