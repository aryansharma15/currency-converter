document.addEventListener("DOMContentLoaded", function () {
	let fromCurr = document.getElementById("from-curr");
	let toCurr = document.getElementById("to-curr");

	let firstCurInput = document.getElementsByClassName("from-curr-inp")[0];
	let secondCurInput = document.getElementsByClassName("to-curr-inp")[0];

	let swapButton = document.getElementsByClassName("swap")[0];

	let conv_btn = document.getElementsByClassName("conv-btn")[0];

	function updateConvAmt(rate) {
		const inputValue = parseFloat(firstCurInput.value);
		const convertedValue = inputValue * rate;
		secondCurInput.textContent = convertedValue.toFixed(2);
	}

	function calc() {
		const inpCur = fromCurr.value;
		const outCur = toCurr.value;
		console.log(`https://api.exchangerate-api.com/v4/latest/${inpCur}`);

		fetch(`https://api.exchangerate-api.com/v4/latest/${inpCur}`)
			.then((res) => res.json())
			.then((data) => {
				const rate = data.rates[outCur];
				const exchRate = document.getElementsByClassName("rate-box")[0];
				console.log("exchRate: ", exchRate);

				exchRate.textContent = `1 ${inpCur} = ${rate.toFixed(4)} ${outCur}`;

				updateConvAmt(rate);
			});
	}

	function listeners() {
		swapButton.addEventListener("click", () => {
			[fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
		});
		calc();

		conv_btn.addEventListener("click", () => {
			calc();
			console.log("Convert button pressed");
		});

		fromCurr.addEventListener("change", calc);
		toCurr.addEventListener("change", calc);

		swapButton.addEventListener("click", calc);
		firstCurInput.addEventListener("input", calc);
	}

	window.onload = () => {
		listeners();
		calc();
	};
});
