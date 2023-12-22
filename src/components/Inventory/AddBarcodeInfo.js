import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { db, auth } from "../../../config/firebase"

function AddBarcodeInfo( { route } ) {
	const nav = useNavigation();
	const [quantity, setQuantity] = useState("");
	const [date, setDate] = useState(new Date());
    const [ExpDate, setExpDate] = useState(new Date());
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
	const { itemTitle, itemID, upcData } = route.params;

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

	function addHandler() {
        try {
			if (itemTitle != "" && date != "" && quantity != "") {
				const user = auth.currentUser.uid;

				addDoc(collection(db, "inventory", user, "inventory"), {
					food: itemTitle,
					purchase_date: Timestamp.fromDate(new Date(date)),
					exp_date: Timestamp.fromDate(new Date(ExpDate)),
					quantity: parseInt(quantity),
					UPC: upcData,
					item_id: itemID
				}).then (() => {
					console.log("Data Submitted");
				}).catch((error) => {
					console.log(error);
				});
		
				endAddHandler();
			}
			else {
				console.error("Empty Items");
			}
        }
        catch(error) {
            console.log(error);
        }
	}

    function endAddHandler() {
        nav.goBack()
    }

	return (
		<TouchableWithoutFeedback  
			onPress={Keyboard.dismiss}
			accessible={false}>

			<View style={styles.inputContainer}>
				<Text style={styles.headerText}>Item Name</Text>
				<Text style={styles.textStyle}>{itemTitle}</Text>

				<Text style={styles.headerText}>Quantity</Text>
				<TextInput
					style={styles.textInput}
					keyboardType="numeric"
					placeholder="Quantity"
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

				<View style={styles.rowContainer}>
					<View style={styles.rowStyle}>
						<Text style={styles.headerText}>UPC</Text>
						<Text style={styles.textRowStyle}>{upcData}</Text>
					</View>

					<View style={styles.rowStyle}>
						<Text style={styles.headerText}>Item ID</Text>
						<Text style={styles.textRowStyle}>{itemID}</Text>
					</View>
				</View>

				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<Button title="Cancel" onPress={endAddHandler} color="#f31282" />
					</View>
					<View style={styles.button}>
						<Button title="Add Item" onPress={addHandler} color="#b180f0" />
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default AddBarcodeInfo;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		padding: 16,
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
		marginTop: 16,
		flexDirection: "row",
		justifyContent: "center",
	},
	button: {
		width: 100,
		marginHorizontal: 8,
	},
    rowContainer: {
		flexDirection: "row",
    },
    rowStyle: {
        flex: 1,
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
});