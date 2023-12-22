import { KeyboardAvoidingView, TouchableOpacity, StyleSheet, Text, TextInput, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Modal from "react-native-modal";
import RegisterUserModal from "../components/account/RegisterUserModal";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const LoginScreen = () => {
	//text input states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signIn } = UserAuth();
	const [isModalVisible, setModalVisible] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			await signIn(email, password);
			console.log("logged in");
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};

	return (
		<View style={styles.mainBackground}>
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<Text style={styles.titleText}> MyPantry </Text>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Email"
						value={email}
						onChangeText={(Text) => setEmail(Text)}
						style={styles.input}
					/>
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={(Text) => setPassword(Text)}
						style={styles.input}
						secureTextEntry
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={handleSubmit}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={toggleModal}
					>
						<Text style={styles.buttonText}>Register</Text>
					</TouchableOpacity>

					<Modal
						isVisible={isModalVisible}
						onBackdropPress={toggleModal}
					>
						<RegisterUserModal
							modalContainer={styles.modalContainer}
							button={styles.button}
							buttonOutline={styles.buttonOutline}
							buttonOutlineText={styles.buttonOutlineText}
							label={styles.label}
							inputRegistration={styles.inputRegistration}
						/>
					</Modal>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	mainBackground: {
		flex: 1,
		backgroundColor: "#00446a",
	},

	titleText: {
		fontSize: 60,
		textAlignVertical: "center",
		textAlign: "center",
		justifyContent: "center",
		marginBottom: 30,
		fontWeight: "bold",
		color: "white",
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	inputContainer: {
		width: "80%",
	},
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderRadius: 10,
		marginTop: 10,
	},

	buttonContainer: {
		width: "60%",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 40,
		rowGap: 10,
	},
	button: {
		backgroundColor: "#1F60B4",
		width: "100%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		borderColor: "black",
		borderWidth: 1,
	},

	inputRegistration: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 20,
		borderRadius: 5,
	},

	buttonOutline: {
		backgroundColor: "white",
		marginTop: 5,
		borderColor: "#0782F9",
		borderWidth: 2,
	},

	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},

	buttonOutlineText: {
		color: "blue",
		fontWeight: "700",
		fontSize: 16,
	},
	modalContainer: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
	},
	label: {
		fontWeight: "bold",
		marginBottom: 5,
	},
});

export default LoginScreen;
