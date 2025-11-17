import { View, Text, ImageBackground } from "react-native"
import ButtonTextComponent from "../ButtonComponents/ButtonTextComponent"
import { styles } from "../ExerciseComponent/ExerciseComponentStyle";

interface ExerciseComponentProps {
    titulo: string,
    subtitulo: string,
    image: number | import('react-native').ImageSourcePropType,
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({titulo, subtitulo, image }) => {
    // const imagemDeFundo = require(image)
    return (
        <View style={styles.Component}>
            <ImageBackground
                style={styles.Gif}
                source={image}
                // imageStyle={styles.ImageGif}
                resizeMode="cover">
                {/* <View style={styles.GifIntern}></View> */}
            </ImageBackground>
            <View style={styles.Detail}>
                <View >
                    <Text style={styles.TextTitle}>{titulo}</Text>
                    <Text style={styles.TextSubtitle}>{subtitulo}</Text>
                </View>
                <ButtonTextComponent nome={"Alterar"} />
            </View>
        </View >
    )
}

export default ExerciseComponent;