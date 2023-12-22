import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function SearchFoods() {
	const nav = useNavigation();
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = () => {
		if (search != "")
		{
			const apiKey = '351d8b685c8741cb86b82656ee8935e2';
			const apiUrl = `https://api.spoonacular.com/food/products/search?apiKey=${apiKey}&query=${search}&number=10`;
			axios.get(apiUrl)
				.then(response => {
					if (response.data.status == "failure")
					{
						setScanResult(response.data.message);
					}
					else {
						setSearchResults(response.data.products);
					}
				})
				.catch(error => {
					console.error(error);
			});
		}
	};

	const AddSearchFoods = (title, id) => {
		nav.navigate('AddSearchFoods', { itemTitle: title, itemID: id });
	};

    return (
		<View style={styles.container}>
			<TextInput
				style={styles.textInput}
				placeholder="Search Foods"
				value={search}
				onChangeText={setSearch}
			/>

			<Button style={styles.button} title="Search" onPress={handleSearch} />

			<ScrollView>
				{searchResults.map(result => (
					<TouchableOpacity 
						style={styles.container} 
						key={result.id}
						onPress={() => AddSearchFoods(result.title, result.id)}
						>

						<View style={styles.searchItem}>
							<Image 
								source={{uri: result.image}} 
								style={styles.image}
							/>
							<Text style={styles.searchText}>{result.title}</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
    )
}

export default SearchFoods;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	textInput: {
		backgroundColor: "#00446a",
		color: "white",
		borderRadius: 6,
		padding: 16,
		fontSize: 15,
		margin: 4
	},
	button: {
        backgroundColor: '#00446a',
        textAlign: 'center',
        justifyContent: 'center'
	},
	searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        borderRadius: 12,
        backgroundColor: '#00446a',
        height: 80,
		padding: 16,
    },
	image: {
        flex: 1,
        height: "100%",
    },
    searchText: {
        flex: 5,
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
		flexWrap: 'wrap'
    },
});