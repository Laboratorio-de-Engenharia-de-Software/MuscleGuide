import { TouchableOpacity, Text } from "react-native"
import ButtonStyle from "./ButtonComponentStyle"

interface ButtonTextComponentProp {
    nome: string,
}

const ButtonTextComponent: React.FC<ButtonTextComponentProp> = ({nome}) => {
    return (
        <TouchableOpacity style={ButtonStyle.ButtonText}>
            <Text style={ButtonStyle.ButtonTextTitle}>{nome}</Text>
        </TouchableOpacity>
    )
} 

export default ButtonTextComponent;