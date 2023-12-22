import { StyleSheet, View,  } from 'react-native';
import { addDoc, collection, Timestamp } from "firebase/firestore"; 
import { db, auth } from "../../../config/firebase"
import AddManuallyInput from '../../components/Inventory/AddManuallyInput'
import { useNavigation } from '@react-navigation/native';

function AddManually() {
    const nav = useNavigation();

    function endAddHandler() {
        nav.goBack()
    }

    function addHandler(name, date, ExpDate, quantity) {
        try {
            const user = auth.currentUser.uid;

            addDoc(collection(db, "inventory", user, "inventory"), {
                food: name,
                purchase_date: Timestamp.fromDate(new Date(date)),
                exp_date: Timestamp.fromDate(new Date(ExpDate)),
                quantity: parseInt(quantity),
            }).then (() => {
                console.log("Data Submitted");
            }).catch((error) => {
                console.log(error);
            });
    
            endAddHandler();
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.appContainer}>
                <AddManuallyInput
                    //visible={modalIsVisible}
                    addDoc={addHandler}
                    onCancel={endAddHandler}
                />
            </View>
        </>
    );
};

export default AddManually;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    goalsContainer: {
        flex: 5,
    },
});