import { View, Text, Image, TouchableOpacity } from "react-native"
import { ImageBackground } from "react-native"
import { ImageSourcePropType } from "react-native"
import GradeStyles from "./GradeCardStyle"

interface GradeCardComponentProps {
    imagem: ImageSourcePropType,
    title: string,
    subtitle: string
    onPress: () => void
}

const GradeCardComponent: React.FC<GradeCardComponentProps> = ({ imagem, title, subtitle, onPress }) => {
    return (
        <TouchableOpacity style={GradeStyles.container} onPress={onPress}>
            <View>
                <Image
                    style={{ width: 70, height: 70, borderRadius: 8 }}
                    source={imagem}
                    resizeMode="cover"
                />
            </View>
            <View>
                <Text style={GradeStyles.title}>{title}</Text>
                <Text style={GradeStyles.subtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GradeCardComponent;