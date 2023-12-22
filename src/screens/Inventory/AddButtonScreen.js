import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

function AddButtonScreen() {
    const nav = useNavigation();
    return (
        <SafeAreaView>
            <TouchableOpacity
                >
                <View style={styles.Item}>
                    <MaterialCommunityIcons name="barcode-scan" size={60} style={styles.icon}/>
                    <Text style={styles.Text} >Add By Barcode</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => nav.navigate("AddManually")}>
                <View style={styles.Item}>
                    <FontAwesome name="search" size={60} style={styles.icon}/>
                    <Text style={styles.Text} >Add Item Manually</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddButtonScreen;

const styles = StyleSheet.create({
    Item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderRadius: 20,
        backgroundColor: '#00446a',
        height: 110,
    },
    Text: {
        flex: 3,
        color: 'white',
        fontSize: 25,
		textAlign: 'left'
    },
	icon: {
		flex: 3,
        color: 'white',
		textAlign: 'center'
	}
});