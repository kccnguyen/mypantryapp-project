import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

function AddBarcode() {
    const nav = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [scanResult, setScanResult] = useState("Not yet scanned");
    
    const askForCameraPermission = () => {(async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })()}

    useEffect(() => {
        askForCameraPermission();
    }, []);

    function isBarcode(barcode) {
        var _ = barcode.toString().split("")
        var _1 = 0
        var _2 = 0
        var __
        for ($ = 0; $ <= 10; ++$) {
            _1 += +_[$]
        }; for ($ = 10; $ >= 0; $ -= 2) {
            _2 += +_[$]
        }; _2 *= 2
        var _3 = _1 + _2
        __ = +_3.toString().substring(1, 2)
        if (__ > 9) {
            __ = +_3.toString().substring(1, 2)
        } else if (__ === 0) {
            __ = 10
        };
        __ = 10 - __
        if (__ === +_[11]) {
            return true
        }
        return false
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        //setText(data)
        //console.log('Type: ' + type + '\nData: ' + data)

		if (type == "org.gs1.EAN-13")
        {
            let check = isBarcode(data);
            if (check == false)
            {
                let codeStr = data.toString();
                const res = codeStr.replace(codeStr[0], '');
                data = String(Number(res)).padStart(res.length, "0");
            }
        }

		try {
			if (data != null)
			{
				const apiKey = '351d8b685c8741cb86b82656ee8935e2';
				const apiUPC = `https://api.spoonacular.com/food/products/upc/${data}?apiKey=${apiKey}`;
				axios.get(apiUPC)
				.then(response => {
					if (response.data.status == "failure")
					{
						setScanResult(response.data.message);
					}
					else
					{
						setScanResult("Successfully scanned");
						nav.navigate("AddBarcodeInfo", { itemTitle: response.data.title, itemID: response.data.id, upcData: data, });
					}
				})
				.catch(error => {
					console.error(error);
				});
			}
		}
		catch(error) {
			console.log(error);
		}
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }} />
            </View>

            <Text style={styles.maintext}>{scanResult}</Text>

            {scanned && <Button title={'Scan again?'} onPress={() => {setScanned(false); setScanResult("Not yet scanned")}} color='tomato' />}
        </View>
    );
};

export default AddBarcode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        textAlign: 'center'
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});