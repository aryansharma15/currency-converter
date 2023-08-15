const api = "http://openexchangerates.org/api/latest.json?app_id=477612ac55004129901ccc7f00e61446";
// const access_key = "0347097f865f328f5107214788fd06cc";

console.log(api);
let fromCurr = document.getElementById("from-curr");
let toCurr = document.getElementById("to-curr");

let firstCur = document.getElementsByClassName("from-curr-inp")[0];
let secondCur = document.getElementsByClassName("to-curr-inp")[0];

let conv_btn = document.getElementsByClassName("conv-btn")[0];
let inpNum;
let outNum;
let searchValue;

fromCurr.addEventListener("change", (event) => {
	inpNum = event.target.value;
});

toCurr.addEventListener("change", (event) => {
	outNum = event.target.value;
});

firstCur.addEventListener("input", updateValue);

function updateValue(x) {
	searchValue = x.target.value;
}

conv_btn.addEventListener("click", getResult);

function getResult() {
	fetch(`${api}`)
		.then((response) => {
			if (response.status === 200) {
				return response.json();
			} else {
				throw new Error(`Something went wrong. Code: ${response.status}`);
			}
		})
		// .then((currency) => {
		// 	return currency.json();
		// })
		.then(displayResult)
		.catch((error) => {
			console.error(error);
		});
}

function displayResult(currency) {
	inpNum = inpNum || "";
	outNum = outNum || "";
	if (inpNum in currency.rates && outNum in currency.rates) {
		let fromRate = currency.rates[inpNum];
		let toRate = currency.rates[outNum];
		secondCur.innerHTML = ((toRate / fromRate) * searchValue).toFixed(2);
	} else {
		secondCur.innerHTML = "Currency not supported";
	}
}
