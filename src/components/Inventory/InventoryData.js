import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated, } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { doc, collection, getDocs, query, where, orderBy, onSnapshot, deleteDoc } from "firebase/firestore"; 
import { db, auth } from "../../../config/firebase"
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useNavigation } from "@react-navigation/native";

function GetData (props) {
    const nav = useNavigation();
    const [invData, setinvData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getINVData();
    }, []);

    const getINVData = useCallback(async () => {
        try {
            const user = auth.currentUser.uid;
            const q = query(collection(db, "inventory", user, "inventory"), orderBy("food"));

            const DATA = onSnapshot(q, (querySnapshot) => {
                const d = querySnapshot.docs
                    .map((doc) => ({ 
                        id: doc.id,
                        food: doc.data().food, 
                        purchaseDate: doc.data().purchase_date.toDate().toLocaleDateString(),
                        expDate: doc.data().exp_date.toDate().toLocaleDateString(),
                        quantity: doc.data().quantity,
                        item_id: doc.data().item_id == null ? "" : doc.data().item_id
                    }));

                setinvData(d);
            })         
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const rightSwipe = (progress, id) => {
        // const scale = dragX.interpolate({
        //     inputRange: [0, 100],
        //     outputRange: [0, 1],
        //     extrapolate: 'clamp',
        // });

        return (
            <TouchableOpacity 
                //onPress={handleDelete}
                onPress={() => handleDelete(id)}
                activeOpacity={0.6}>
                <View style={styles.deleteBox}>
                    <Animated.Text style={{color: 'white'}}>
                        Delete
                    </Animated.Text>
                </View>
            </TouchableOpacity>
        );
    };

    function handleDelete(id) {
        if (id != null) {
            const user = auth.currentUser.uid;
            
            deleteDoc(doc(db, "inventory", user, "inventory", id))
            .then (() => {
                console.log("Data Deleted");
            }).catch((error) => {
                console.log(error);
            });;
        }
    }

    const GetNutrition = (id, item_id, food, purchaseDate, expDate, quantity) => {
        if (id != null)
        {
            nav.navigate('Nutrition', 
                { 
                    mainID : String(id),
                    itemID: String(item_id),
                    food: String(food),
                    oldPurchaseDate: purchaseDate,
                    oldExpDate: expDate,
                    oldQuantity: String(quantity)
                }
            );
        }
        else
            console.error("Not a valid item!")
		
	};

    return (
        <>
            {invData.map((props, index) =>
            <Swipeable 
                key = {props.id}
                //renderRightActions = {rightSwipe}
                renderRightActions={(progress) => rightSwipe(progress, props.id)}
                >
                <TouchableOpacity
                    key = {props.id}
                    onPress={() => 
                        GetNutrition(
                            props.id, props.item_id, props.food, props.purchaseDate, props.expDate, props.quantity
                        )}>
                    <View style={styles.invItem}>
                        <Text style={styles.invText} >{props.food} </Text>
                        <Text style={styles.invText}> {props.expDate} </Text>
                        <Text style={styles.invText}> {props.quantity} </Text>
                    </View>
                </TouchableOpacity>

            </Swipeable>
            )}
        </>
    );
}

export default GetData;

const styles = StyleSheet.create({
    inventoryList: {
        flex: 1,
        backgroundColor: 'white',
    },
    invItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderRadius: 12,
        backgroundColor: '#00446a',
        height: 80,
    },
    invText: {
        flex: 2,
        color: 'white',
        padding: 8,
        fontSize: 15,
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        height: 30,
    },
    headerText: {
        flex: 2,
        fontSize: 15,
        textAlign: 'center',
        color: 'black'
    },
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        margin: 4,
        borderRadius: 12,
        width: 100,
        height: 80,
    },
});