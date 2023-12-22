import { View, SafeAreaView, StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import GetData from "../../components/Inventory/InventoryData"

//Only the first view screen, anything else in components/inventory
function InventoryScreen ()
{  
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);
    
    return (
        <SafeAreaView style={styles.inventoryList}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Food</Text>
                <Text style={styles.headerText}>Expiration Date</Text>
                <Text style={styles.headerText}>Quantity</Text>
            </View>

            <ScrollView 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <GetData/>
            </ScrollView>
        </SafeAreaView>
    );
}

export default InventoryScreen;

const styles = StyleSheet.create({
    inventoryList: {
        flex: 1,
        backgroundColor: 'white',
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
    }
});