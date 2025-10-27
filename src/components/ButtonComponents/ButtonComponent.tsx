import { TouchableOpacity, Text } from "react-native"
import ButtonStyle from "./ButtonComponentStyle"

interface ButtonComponentProp {
    nome: string,
    onPress: () => void
}

const ButtonComponent: React.FC<ButtonComponentProp> = ({nome, onPress}) => {
    return (
        <TouchableOpacity style={ButtonStyle.Button} onPress={onPress}>
            <Text style={ButtonStyle.ButtonTitle}>{nome}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent