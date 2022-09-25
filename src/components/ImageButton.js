import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

const ImageButton = (props) => {
    return (
        <TouchableOpacity>
            <Image style={{...styles.img, ...props.style }} source={props.source} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 50,
        width: 50
    }
})
export default ImageButton