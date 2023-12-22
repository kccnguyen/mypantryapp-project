// Global styles, some styles might be in the UI folder, like buttons, inputs, and more.
import { StyleSheet,Dimensions } from "react-native";
//General styles for the whole project

const { width:screenWidth, height: screenHeight } = Dimensions.get('window');

//Homescreen Stylesheet
const homeStyles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		backgroundColor: "#ededed",
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	NotifButton: {
		backgroundColor: "#00446a",
		borderRadius: 20,
		width: screenWidth * 0.95,
		height: screenHeight * 0.18,
		padding: 35,
		justifyContent:"center",
		flexDirection: "row",
		alignItems: "center",
	},
	chefButton:{
		backgroundColor: "#00446a",
		borderRadius: 20,
		width: screenWidth * 0.95,
		height: screenHeight * 0.18,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	spendButton:{
		backgroundColor: "#00446a",
		borderRadius: 20,
		width: screenWidth * 0.95,
		height: screenHeight * 0.18,
		justifyContent: "center",
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	innerBGContainer: {
		backgroundColor: "#ededed",
		alignItems: 'center',
		width: screenWidth * 0.95,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	innerButton: {
		backgroundColor: "#00446a",
		borderRadius: 20,
		width: screenWidth * 0.46,
		height: screenHeight * 0.18,
		alignItems: "center",
		padding: 18,
	},
	textContainer: {
		flex: 1,
		paddingleft: 10,
		alignItems:'center',
		justifyContent:'center'
	},
	buttonText: {
		fontSize: 25,
		fontWeight: "bold",
		alignItems:'center',
		justifyContent:'center',
		color: "white",
		paddingLeft:20,
	},
	innerButtonText: {
		fontSize: 25,
		fontWeight: "bold",
		alignItems: "flex-end",
		color: "white",
		marginBottom: 15,
	},
});

export { homeStyles };
