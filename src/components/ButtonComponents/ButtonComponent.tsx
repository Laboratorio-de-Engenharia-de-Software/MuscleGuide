import { TouchableOpacity, Text } from "react-native"
import ButtonStyle from "./ButtonComponentStyle"

interface ButtonComponentProp {
    nome: string
}

const ButtonComponent: React.FC<ButtonComponentProp> = ({nome}) => {
    return (
        <TouchableOpacity style={ButtonStyle.Button}>
            <Text style={ButtonStyle.ButtonTitle}>{nome}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent