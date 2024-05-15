import React from "react";
import ReactDOM from "react-dom/client";
import SortingMenu from "./components/SortingMenu/SortingMenu";
import SortingVisualizer from "./components/SortingVisualizer/SortingVisualizer";
import { SortingProvider } from "./context";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SortingProvider>
			<div className="container">
				<div className="container-inner">
					<SortingMenu />
					<SortingVisualizer />
				</div>
			</div>
		</SortingProvider>
	</React.StrictMode>
);
