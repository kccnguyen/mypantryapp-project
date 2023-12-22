import React from "react";
import { AuthContextProvider } from "./src/context/AuthContext";
import { AuthRouter } from "./src/components/account/AuthRouter";

export default function App() {
	return (
		<AuthContextProvider>
			<AuthRouter />
		</AuthContextProvider>
	);
}
