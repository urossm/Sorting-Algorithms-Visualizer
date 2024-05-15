export function generateArray(arraySize) {
	const array = [];
	for (let i = 0; i < arraySize; i++) {
		array.push(Math.floor(Math.random() * 1000) + 1);
	}
	return array;
}

export const pause = (milliseconds) => {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
};
