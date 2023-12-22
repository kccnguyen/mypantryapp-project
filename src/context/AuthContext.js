import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase";

const UserAuthContext = createContext();

export const UserAuth = () => {
	return useContext(UserAuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	return (
		<UserAuthContext.Provider
			value={{ createUser, user, loading, logOut, signIn }}
		>
			{children}
		</UserAuthContext.Provider>
	);
};
