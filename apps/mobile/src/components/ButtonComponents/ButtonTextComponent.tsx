import { TouchableOpacity, Text } from "react-native"
import ButtonStyle from "./ButtonComponentStyle"

interface ButtonTextComponentProp {
    nome: string,
    onPress: () => void
}

const ButtonTextComponent: React.FC<ButtonTextComponentProp> = ({nome, onPress}) => {
    return (
        <TouchableOpacity 
            style={ButtonStyle.ButtonText}
            onPress={onPress}>
            <Text style={ButtonStyle.ButtonTextTitle}>{nome}</Text>
        </TouchableOpacity>
    )
} 

export default ButtonTextComponent;