import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import { Timestamp, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase"

function Nutrition( { route } ) {
	const nav = useNavigation();
	const { mainID, itemID, food, oldPurchaseDate, oldExpDate, oldQuantity } = route.params;
	const [quantity, setQuantity] = useState(oldQuantity);
	const [date, setDate] = useState(oldPurchaseDate);
    const [ExpDate, setExpDate] = useState(oldExpDate);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
	const [resultURL, setResultURL] = useState(null);
	const [checkID, setID] = useState(false);
	
	useEffect(() => {
		if (itemID != "")
		{
			const apiKey = 'Private';
			const apiUrl = `https://api.spoonacular.com/food/products/${itemID}/nutritionLabel.png?apiKey=${apiKey}`;
			axios.get(apiUrl)
			.then(response => {
				setResultURL(apiUrl);
			})
			.catch(error => {
				console.error(error);
			});

			setID(true);
		}
    }, []);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const showDatePicker2 = () => {
		setDatePickerVisibility2(true);
	};

	const hideDatePicker2 = () => {
		setDatePickerVisibility2(false);
	};

	const handleConfirm = (selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
		hideDatePicker();
	};

    const handleConfirm2 = (selectedDate) => {
		const currentDate = selectedDate;
		setExpDate(currentDate);
		hideDatePicker2();
	};

    function endHandler() {
        nav.goBack()
    };

	function ConfirmHandler() {
		const user = auth.currentUser.uid;
		const Fields = doc(db, "inventory", user, "inventory", mainID);

		if (oldQuantity != quantity) {
			updateDoc(Fields, {
				quantity: parseInt(quantity),
			}).then (() => {
				console.log("Data Updated");
			}).catch((error) => {
				console.log(error);
			});
		}

		if (oldPurchaseDate != date) {
			updateDoc(Fields, {
				purchase_date: Timestamp.fromDate(new Date(date)),
			}).then (() => {
				console.log("Data Updated");
			}).catch((error) => {
				console.log(error);
			});
		}

		if (oldExpDate != ExpDate) {
			updateDoc(Fields, {
				exp_date: Timestamp.fromDate(new Date(ExpDate)),
			}).then (() => {
				console.log("Data Updated");
			}).catch((error) => {
				console.log(error);
			});
		}

        nav.goBack()
    }

	return (
		<TouchableWithoutFeedback  
			onPress={Keyboard.dismiss}
			accessible={false}>

			<View style={styles.inputContainer}>
				{checkID &&
				<Image 
					source={{uri: resultURL}} 
					style={styles.image}
				/>}

				<Text style={styles.headerText}>Item Name</Text>
				<Text style={styles.textStyle}>{food}</Text>

				<Text style={styles.headerText}>Quantity</Text>
				<TextInput
					style={styles.textInput}
					keyboardType="numeric"
					onChangeText={setQuantity}
					value={quantity}
				/>

				<Text style={styles.headerText}>Purchase Date</Text>
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>{date.toLocaleString()}</Text>
					<Button title="Select Date" onPress={showDatePicker} />

					<DateTimePicker
						isVisible={isDatePickerVisible}
						mode="date"
						value={date}
						display="inline"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>

				<Text style={styles.headerText}>Expiration Date</Text>
				<View style={styles.dateContainer}>
					<Text style={styles.dateText}>{ExpDate.toLocaleString()}</Text>
					<Button title="Select Date" onPress={showDatePicker2} />

					<DateTimePicker
						isVisible={isDatePickerVisible2}
						mode="date"
						value={ExpDate}
						display="inline"
						onConfirm={handleConfirm2}
						onCancel={hideDatePicker2}
					/>
				</View>

				{/* <View style={styles.rowContainer}>
					<View style={styles.rowStyle}>
						<Text style={styles.headerText}>UPC</Text>
						<Text style={styles.textRowStyle}>{upcData}</Text>
					</View>

					<View style={styles.rowStyle}>
						<Text style={styles.headerText}>Item ID</Text>
						<Text style={styles.textRowStyle}>{itemID}</Text>
					</View>
				</View> */}

				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title="Cancel" onPress={endHandler} color="#f31282" />
					</View>
					<View style={styles.button}>
						<Button title="Confirm Edit" onPress={ConfirmHandler} color="#b180f0" />
					</View>
				</View>
				

			</View>
		</TouchableWithoutFeedback>
	);
};

export default Nutrition;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		flexDirection: "column",
		//justifyContent: "center",
		padding: 4,
	},
	headerText: {
		fontSize: 15,
		marginTop: 10,
		marginBottom: 2,
	},
	textStyle: {
		backgroundColor: "#00446a",
		color: "white",
		borderRadius: 6,
		padding: 16,
		fontSize: 15,
		overflow: "hidden"
	},
	textInput: {
		backgroundColor: "#00446a",
		color: "white",
		borderRadius: 6,
		padding: 16,
		fontSize: 15,
	},
	dateContainer: {
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "#00446a",
		borderRadius: 6,
		width: "50%",
	},
	dateText: {
		color: "white",
		fontSize: 15,
		textAlign: "left",
		padding: 16,
		width: "115%",
	},
	buttonContainer: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	button: {
		width: 120,
		marginHorizontal: 8,
	},
    rowContainer: {
		flexDirection: "row",
    },
    rowStyle: {
        //flex: 1,
        flexDirection: 'column',
	},
    textRowStyle: {
		backgroundColor: "#00446a",
		color: "white",
		borderRadius: 6,
		padding: 16,
		fontSize: 15,
        width: "95%",
        overflow: "hidden"
	},
	image: {
		height: "46%",
		resizeMode: "contain"
	},
});