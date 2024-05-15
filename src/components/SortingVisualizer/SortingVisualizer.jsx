/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { useSortingContext } from "../../context";
import { pause } from "../../utils";
import "./sortingvisualizer.css";

function SortingVisualizer() {
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [tooltipValue, setTooltipValue] = useState("");
	const { array, setArray, arraySize, selectedSort, sortingInProgress, setSortingInProgress, isArraySorted, setIsArraySorted } = useSortingContext();
	const [currentIndices, setCurrentIndices] = useState([-1, -1]);
	const [sortedIndices, setSortedIndices] = useState([]);
	const pauseTime = 40;

	useEffect(() => {
		let isMounted = true;

		const sortArray = async () => {
			switch (selectedSort) {
				case 0:
					await bubbleSort();
					break;
				case 1:
					await quickSort(array, 0, arraySize - 1);
					break;
				case 2:
					await mergeSort(array, 0, arraySize - 1);
					break;
				case 3:
					await heapSort();
					break;
				case 4:
					await insertionSort();
					break;
				case 5:
					await selectionSort();
					break;
				default:
					break;
			}
			cleanUpSort();
		};

		if (sortingInProgress && !isArraySorted) {
			sortArray();
		}

		return () => {
			isMounted = false;
		};
	}, [sortingInProgress]);

	const mergeSort = async (array, start, end) => {
		const merge = async (arr, start, mid, end) => {
			let temp = [];
			let i = start;
			let j = mid + 1;
			let k = 0;

			while (i <= mid && j <= end) {
				setCurrentIndices([i, j]);

				await pause(10);

				if (arr[i] <= arr[j]) {
					temp[k++] = arr[i++];
				} else {
					temp[k++] = arr[j++];
				}
			}

			while (i <= mid) {
				temp[k++] = arr[i++];
			}

			while (j <= end) {
				temp[k++] = arr[j++];
			}

			for (let p = 0; p < k; p++) {
				arr[start + p] = temp[p];
				setArray([...arr]);
			}

			const sortedIndices = [];
			for (let p = start; p <= end; p++) {
				sortedIndices.push(p);
			}
			setSortedIndices((prevIndices) => [...prevIndices, ...sortedIndices]);
		};

		if (start >= end) return;

		const mid = Math.floor((start + end) / 2);
		await mergeSort(array, start, mid);
		await mergeSort(array, mid + 1, end);
		await merge(array, start, mid, end);
	};

	const quickSort = async (array, start, end) => {
		const partition = async (array, start, end) => {
			const pivot = array[end];
			let i = start - 1;

			for (let j = start; j < end; j++) {
				setCurrentIndices([j, end]);

				await pause(10);

				if (array[j] < pivot) {
					i++;
					const temp = array[i];
					array[i] = array[j];
					array[j] = temp;
					setArray([...array]);
				}
			}

			const temp = array[i + 1];
			array[i + 1] = array[end];
			array[end] = temp;
			setArray([...array]);

			const sortedIndices = [];
			for (let p = start; p <= end; p++) {
				sortedIndices.push(p);
			}
			setSortedIndices((prevIndices) => [...prevIndices, ...sortedIndices]);

			return i + 1;
		};

		if (start >= end) return;

		const pivotIndex = await partition(array, start, end);
		await quickSort(array, start, pivotIndex - 1);
		await quickSort(array, pivotIndex + 1, end);
	};

	const heapSort = async () => {
		const heapify = async (array, n, i) => {
			let largest = i;
			const left = 2 * i + 1;
			const right = 2 * i + 2;

			if (left < n && array[left] > array[largest]) {
				largest = left;
			}

			if (right < n && array[right] > array[largest]) {
				largest = right;
			}

			if (largest !== i) {
				const temp = array[i];
				array[i] = array[largest];
				array[largest] = temp;
				setArray([...array]);

				setCurrentIndices([i, largest]);

				await pause(10);

				await heapify(array, n, largest);
			}
		};

		const n = array.length;

		for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
			await heapify(array, n, i);
		}

		for (let i = n - 1; i > 0; i--) {
			const temp = array[0];
			array[0] = array[i];
			array[i] = temp;
			setArray([...array]);

			setCurrentIndices([0, i]);

			await pause(10);

			await heapify(array, i, 0);

			setSortedIndices((prevIndices) => [...prevIndices, i]);
		}

		setSortedIndices((prevIndices) => [...prevIndices, 0]);
	};

	const bubbleSort = async () => {
		for (let i = 0; i < array.length - 1; i++) {
			for (let j = 0; j < array.length - i - 1; j++) {
				await pause(pauseTime);
				setCurrentIndices([j, j + 1]);
				if (array[j] > array[j + 1]) {
					const temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
					setArray([...array]);
				}
				setSortedIndices((prevIndices) => [...prevIndices, array.length - i - 1]);
			}
		}
	};

	const insertionSort = async () => {
		for (let i = 1; i < array.length; i++) {
			let current = array[i];
			let j = i - 1;

			while (j >= 0 && array[j] > current) {
				setCurrentIndices([j, j + 1]);
				await pause(10);
				array[j + 1] = array[j];
				j--;
			}
			array[j + 1] = current;
			setArray([...array]);
			sortedIndices.push(i);
			setSortedIndices([...sortedIndices]);
		}
	};

	const selectionSort = async () => {
		const n = array.length;
		for (let i = 0; i < n - 1; i++) {
			let minIndex = i;
			for (let j = i + 1; j < n; j++) {
				setCurrentIndices([minIndex, j]);
				await pause(10);
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}

			const temp = array[minIndex];
			array[minIndex] = array[i];
			array[i] = temp;
			setArray([...array]);
			sortedIndices.push(i);
			setSortedIndices([...sortedIndices]);
		}
	};

	const cleanUpSort = () => {
		setCurrentIndices([-1, -1]);
		setIsArraySorted(true);
		setSortingInProgress(false);
		setSortedIndices([]);
	};

	const handleMouseEnter = (event, number) => {
		const { clientX, clientY } = event;
		setTooltipPosition({ x: clientX, y: clientY });
		setTooltipValue(number);
	};

	const handleMouseLeave = () => {
		setTooltipValue("");
	};

	const itemBackgroundColor = (index) => {
		if (currentIndices[0] == index) return "orange";
		else if (currentIndices[1] == index) return "red";
		else if (sortedIndices.includes(index) || isArraySorted) return "green";
		else return "cadetblue";
	};

	return (
		<div className="array-container">
			{sortingInProgress && <div className="top-message">Sorting in progress. Please wait...</div>}
			{isArraySorted && <div className="top-message">Array is sorted! Generate new array to try again</div>}
			{array.map((number, index) => (
				<div
					key={index}
					style={{
						backgroundColor: itemBackgroundColor(index),
						height: `${number / 10}%`,
						width: `${80 / arraySize}%`,
						margin: `0 ${20 / arraySize}%`,
					}}
					onMouseEnter={(event) => handleMouseEnter(event, number)}
					onMouseLeave={handleMouseLeave}
					className="array-item"
				>
					{(arraySize < 20) & (number > 50) ? number : ""}
					{tooltipValue && (
						<div
							style={{
								left: tooltipPosition.x - 50,
								top: tooltipPosition.y - 115,
							}}
							className="array-tooltip"
						>
							{tooltipValue}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default SortingVisualizer;
