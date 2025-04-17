import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Platform, Alert } from "react-native";
import { Button, Loader } from "../../../components";
import { appIcons, heightPixel, hp, routes } from "../../../services";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { GreenSnackbar, RedSnackbar } from "../../../services/helpingMethods";
import { useIsFocused } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import { userData } from "../../../redux/Slices/userSlice";

const PurchaseTokens = ({ navigation }) => {
    const user = useSelector((state) => state.user.userData);
    const dispatch = useDispatch()
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [data, setData] = useState([

    ]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            console.log("calling api....");
            await callApi("GET", `${api.token}`, {},
                (res) => {
                    setLoading(false);
                    if (res?.status) {
                        console.log(res?.data);
                        setData(res?.data?.tokens);
                    } else {
                        RedSnackbar(res?.message);
                    }
                },
                (err) => {
                    console.log("error occurred while fetching data");
                    setLoading(false);
                }
            );
        } catch (e) {
            setLoading(false);
            console.log("error occurred", e);
        }
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        getData();
    }, [isFocused]);

    const [selectedTokens, setSelectedTokens] = useState({
        tokens: {}
    });

    const onCounterPress = (action, item) => {
        let updatedTokens = { ...selectedTokens };
        let currentQuantity = updatedTokens.tokens[item?.type]?.quantity ?? 0;

        if (action === "plus") {
            currentQuantity += 1;
        } else if (action === "minus" && currentQuantity > 0) {
            currentQuantity -= 1;
        }

        updatedTokens.tokens[item?.type] = { tokenId: item?._id, quantity: currentQuantity };
        setSelectedTokens(updatedTokens);
    };

    const getSelectedValue = (type) => {
        return selectedTokens?.tokens[type]?.quantity ?? 0;
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (let key in selectedTokens.tokens) {
            const token = selectedTokens.tokens[key];
            const tokenData = data.find(item => item?.type === key);
            if (tokenData) {
                total += tokenData.price * token.quantity;
            }
        }
        return total;
    };

    const openPaymentSheet = async () => {
        setLoading(true)
        try {
            const { error } = await presentPaymentSheet();
            if (error) {
                setLoading(false);
                Alert.alert(`Error code: ${error.code}`, error.message);
            } else {
                setLoading(false);
                paymentCompleteApi()

            }
        } catch (error) {
            setLoading(false);
            console.log("openPaymentSheet error: ", error);
        }
    };


    const paymentCompleteApi = async () => {
        setLoading(true);
        try {
            await callApi("POST", api.confirmPayment, selectedTokens, (response) => {
                if (response?.status) {
                    GreenSnackbar("Purchase successful!");
                    setSelectedTokens({
                        tokens: {}
                    })
                    console.log(response?.data)
                    dispatch(userData(response?.data?.user));
                    navigation.navigate('Home')

                } else {
                    RedSnackbar(response?.message || "Failed to process purchase.");
                }
            }, (err) => {
                console.log("Error occurred", err);
            });


        } catch (error) {
            console.error("Error occurred during purchase:", error);
            RedSnackbar("Error occurred while making the purchase.");
        } finally {
            setLoading(false);
        }
    }

    const handlePurchase = async () => {
        // Check if any token quantity is greater than 0
        const hasTokensToPurchase = Object.values(selectedTokens.tokens).some((token) => token.quantity > 0);

        if (!hasTokensToPurchase) {
            RedSnackbar("Please select at least one token to purchase.");
            return;
        }
        setLoading(true)
        try {
            console.log("calling api....");
            await callApi("POST", `${api.purchaseIntent}`, selectedTokens,
                async (response) => {
                    setLoading(false)

                    if (response?.status) {
                        console.log(response?.data?.paymentIntent)
                        const paymentOptions = {
                            merchantDisplayName: Platform.OS == "ios" ? "com.scripterz.scroll4.ios" : "com.mysurprise.android",
                            customerId: response?.data?.paymentIntent?.customer,
                            // customerEphemeralKeySecret: res?.data?.subscriptionId,
                            paymentIntentClientSecret: response?.data?.paymentIntent?.client_secret,
                            allowsDelayedPaymentMethods: true,
                            defaultBillingDetails: {},
                        };

                        if (Platform.OS == "android") {
                            paymentOptions.googlePay = {
                                merchantCountryCode: 'us',
                                testEnv: false, // use test environment
                                currencyCode: "USD",
                            };
                        }
                        if (Platform.OS == "ios") {
                            paymentOptions.applePay = {
                                merchantCountryCode: 'us',
                            };
                        }



                        const { error } = await initPaymentSheet(paymentOptions);

                        if (!error) {
                            await openPaymentSheet();
                        } else {
                            console.log("help", error)
                        }


                    } else {
                        RedSnackbar(response?.message || "Failed to process purchase.");
                    }
                }
                ,
                (error) => {
                    console.error("Error occurred during purchase:", error);
                    RedSnackbar("Error occurred while making the purchase.");
                    setLoading(false)
                }
            );
        } catch (e) {
            setLoading(false)
            console.log("error occured", e);
        }
    };

    return (
        <View style={styles.notificationMain}>
            <Text style={styles.name}>{user?.userName}</Text>
            {
                !loading &&
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>Purchase Tokens</Text>
                    {
                        data?.map((item) => (
                            <View style={styles.tokenRow} key={item?._id}>
                                <Image source={{ uri: item?.image }} style={styles.tokenIcon} />
                                <Text style={[styles.tokenName, { color: item?.type === 'bronze' ? 'brown' : item.type === 'silver' ? 'silver' : 'gold' }]}>
                                    {item?.name}
                                </Text>
                                <Text style={[styles.tokenPrice, { flex: 2 }]}>({item?.price} USD)</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => { onCounterPress("minus", item) }}
                                        style={[styles.counterButton, { backgroundColor: 'red' }]}>
                                        <Text style={styles.counterText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.counterValue}>{getSelectedValue(item?.type)}</Text>
                                    <TouchableOpacity
                                        onPress={() => { onCounterPress("plus", item) }}
                                        style={styles.counterButton}>
                                        <Text style={styles.counterText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }

                    <View style={[styles.tokenRow, { paddingVertical: hp(4), marginBottom: hp(8), borderBottomWidth: 1 }]}>
                        <Text style={styles.totalPrice}>Total Price</Text>
                        <Text style={styles.total}>{calculateTotalPrice()} USD</Text>
                    </View>

                    <Button onPress={handlePurchase}>
                        Purchase Now
                    </Button>
                </ScrollView>
            }
            <Loader loading={loading} />
        </View>
    );
};

export default PurchaseTokens;
