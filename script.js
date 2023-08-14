let fromCurr = document.getElementById("from-curr");
let toCurr = document.getElementById("to-curr");

let firstCur = document.getElementsByClassName("from-curr-inp");
let secondCur = document.getElementsByClassName("to-curr-inp");

let conv_btn = document.getElementsByClassName("conv-btn");
let inpNum;
let outNum;

const api = "https://api.exchangeratesapi.io/v1/latest";

// console.log(select);
// console.log(curr_in);
// console.log(curr_out);
// console.log(conv_btn);
// console.log(to_curr);

fromCurr.addEventListener("change", (event) => {
	inpNum = `${event.target.value}`;
});

toCurr.addEventListener("change", (event) => {
	outNum = `${event.target.value}`;
});

firstCur.addEventListener("input", updateValue);

function updateValue(x) {
	searchValue = x.target.value;
}

conv_btn.addEventListener("click", getResult);

function getResult() {
	fetch(`${api}`)
		.then((currency) => {
			return currency.json();
		})
		.then(displayResult);
}

function displayResult(currency) {
	let fromRate = currency.rates[inpNum];
	let toRate = currency.rates[outNum];
	secondCur.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
}
