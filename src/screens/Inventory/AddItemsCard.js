import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

function AddItemScreen()
{  
	const nav = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
            	onPress={() => nav.navigate("AddBarcode")}
                >
                <View style={styles.Item}>
                    <MaterialCommunityIcons name="barcode-scan" size={50} style={styles.icon}/>
                    <Text style={styles.Text} >Add By Barcode</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
            	onPress={() => nav.navigate("SearchFoods")}
                >
                <View style={styles.Item}>
                    <MaterialCommunityIcons name="food" size={50} style={styles.icon}/>
                    <Text style={styles.Text}>Search Foods</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
				onPress={() => nav.navigate("AddManually")}
                >
                <View style={styles.Item}>
                    <FontAwesome name="search" size={50} style={styles.icon}/>
                    <Text style={styles.Text} >Add Item Manually</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default AddItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    Item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderRadius: 12,
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