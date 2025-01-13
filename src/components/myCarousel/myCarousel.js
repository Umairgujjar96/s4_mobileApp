import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";

const { width: viewportWidth } = Dimensions.get("window");

const images = [
  require("../../assets/icons/Group427320660.png"),
  require("../../assets/icons/Group427320660.png"),
  require("../../assets/icons/Group427320660.png"),
];

const CarouselComponent = () => {
  return (
    <View style={styles.container}>
      <Swiper showsPagination={true} loop={true}>
        {images.map((image, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    width: viewportWidth,
    height: 390,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default CarouselComponent;
