import { useEffect, useState } from "react";

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({
		windowWidth: undefined,
		windowHeight: undefined,
	});

	useEffect(() => {
		const onWindowDimensionsChange = () => {
			const { width: windowWidth, height: windowHeight } = window;
			setWindowDimensions({ windowWidth, windowHeight });
		};
		window.addEventListener("resize", onWindowDimensionsChange);
		return () => {
			window.removeEventListener("resize", onWindowDimensionsChange);
		};
	}, []);

	return windowDimensions;
};
