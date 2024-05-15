/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdOutlineAutorenew, MdOutlineSort, MdOutlineWidthNormal } from "react-icons/md";
import { TbArrowsSort } from "react-icons/tb";
import { useSortingContext } from "../../context";
import { generateArray } from "../../utils";
import "./sortingmenu.css";

function SortingMenu() {
	const { isArraySorted, setIsArraySorted, setArray, arraySize, setArraySize, selectedSort, setSelectedSort, sortingInProgress, setSortingInProgress } =
		useSortingContext();
	const iconSize = "1.5rem";

	useEffect(() => {
		setArray(generateArray(arraySize));
	}, []);

	const handleArraySizeChange = (event) => {
		if (!sortingInProgress) {
			setArraySize(event.target.value);
			setArray(generateArray(parseInt(event.target.value)));
			setIsArraySorted(false);
		}
	};

	const handleSortChange = (event) => {
		if (!sortingInProgress) {
			if (isArraySorted) {
				setArray(generateArray(arraySize));
			}
			setSelectedSort(parseInt(event.target.value));
			setIsArraySorted(false);
		}
	};

	const handleNewArray = () => {
		if (!sortingInProgress) {
			setArray(generateArray(arraySize));
			setIsArraySorted(false);
		}
	};

	return (
		<div className="menu">
			<div className="flex-row a-items-center j-content-center gap1">
				<div className="flex-row a-items-center j-content-center gap05">
					<TbArrowsSort size={iconSize} />
					Sort Algorithm:
				</div>
				<select value={selectedSort} onChange={handleSortChange}>
					<option value={1}>Bubble Sort</option>
					<option value={1}>Quick Sort</option>
					<option value={2}>Merge Sort</option>
					<option value={3}>Heap Sort</option>
					<option value={4}>Insertion Sort</option>
					<option value={5}>Selection Sort</option>
				</select>
			</div>
			<div className="divider"></div>
			<div className="flex-row a-items-center j-content-center gap05">
				<MdOutlineWidthNormal size={iconSize} /> Array Size:
				<input className="slider" type="range" min="4" max="100" value={arraySize} onChange={handleArraySizeChange} />
			</div>
			<div className="divider"></div>
			<div className="flex-row a-items-center j-content-center gap1">
				<button onClick={() => handleNewArray()}>
					<MdOutlineAutorenew size={iconSize} />
					New Array
				</button>
				<button
					onClick={() => {
						!isArraySorted && setSortingInProgress(true);
					}}
				>
					<MdOutlineSort size={iconSize} />
					Sort
				</button>
			</div>
		</div>
	);
}

export default SortingMenu;
