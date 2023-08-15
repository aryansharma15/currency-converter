const api = "http://openexchangerates.org/api/latest.json?app_id=477612ac55004129901ccc7f00e61446";

console.log(api);
let fromCurr = document.getElementById("from-curr");
let toCurr = document.getElementById("to-curr");

let firstCurNum = document.getElementsByClassName("from-curr-inp")[0];
let secondCurNum = document.getElementsByClassName("to-curr-inp")[0];

let swapButton = document.getElementsByClassName("swap")[0];
let exchRate = document.getElementsByClassName("rate-box");

let conv_btn = document.getElementsByClassName("conv-btn")[0];
let inpCur;
let outCur;
let searchValue;

// fromCurr.addEventListener("change", (event) => {
// 	inpCur = event.target.value;
// });

// toCurr.addEventListener("change", (event) => {
// 	outCur = event.target.value;
// });

// inpCur = firstCurNum.value;
// outCur = secondCurNum.value;

firstCurNum.addEventListener("input", updateValue);

function updateValue(x) {
	searchValue = x.target.value;
}

// conv_btn.addEventListener("click", getResult);

// function getResult() {
// 	fetch(`${api}`)
// 		.then((currency) => {
// 			return currency.json();
// 		})
// 		.then(displayResult)
// 		.catch((error) => {
// 			console.error(error);
// 		});
// }

// function displayResult(currency) {
// 	let fromRate = currency.rates[inpCur];
// 	let toRate = currency.rates[outCur];
// 	secondCurNum.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
// 	// } else {
// 	// 	secondCur.innerHTML = "Currency not supported";
// 	// }
// }

function calc() {
	const inpCur = fromCurr.value;
	const outCur = toCurr.value;

	fetch(`https://api.exchangerate-api.com/v4/latest/${inpCur}`)
		.then((res) => res.json())
		.then((data) => {
			const rate = data.rates[outCur];

			exchRate.textContent = `1 ${fromCurr} = ${rate.toFixed(4)} ${toCurr}`;
		});
}

function listeners() {
	swapButton.addEventListener("click", () => {
		[fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
	});
	calc();
}

window.onload = () => {
	listeners();
	calc();
};
