/* eslint-disable react/prop-types */
// SortingContext.js
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";

const SortingContext = createContext();

export const useSortingContext = () => useContext(SortingContext);

export const SortingProvider = ({ children }) => {
	const [array, setArray] = useState([]);
	const [arraySize, setArraySize] = useState(25);
	const [selectedSort, setSelectedSort] = useState(0);
	const [sortingInProgress, setSortingInProgress] = useState(false);
	const [isArraySorted, setIsArraySorted] = useState(false);

	const values = {
		array,
		setArray,
		arraySize,
		setArraySize,
		selectedSort,
		setSelectedSort,
		sortingInProgress,
		setSortingInProgress,
		isArraySorted,
		setIsArraySorted,
	};

	return <SortingContext.Provider value={values}>{children}</SortingContext.Provider>;
};
