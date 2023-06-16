import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from '@expo/vector-icons'
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDatailProps = {
    FinishOrder:{
        number : number | string,
        order_id: string
    }
}

type FinishOrderRouteProp = RouteProp<RouteDatailProps, 'FinishOrder'>

export default function FinishOrder(){
    const route = useRoute<FinishOrderRouteProp>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    async function handleFinish(){
        try{
            await api.put('/order/send', {    
                order_id : route.params?.order_id
            })
            navigation.popToTop()
        }catch(err){
            console.log("ERRO")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Deseja finalizar pedido?</Text>
            <Text style={styles.text}>MESA {route.params?.number}</Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton}>Finalizar</Text>
                <Feather name="shopping-cart" size={20} color={'#1d1d2e'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent:'center'
    },
    alert:{
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 12
    },
    text:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 12,
    },
    button:{
        backgroundColor: '#3ff3a3',
        flexDirection: 'row',
        width: '60%',
        height: 40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    },
    textButton:{
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: '#1d1d2e'
    }
})