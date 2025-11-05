import { TouchableOpacity, Text } from "react-native"
import ButtonStyle from "./ButtonComponentStyle"
import { ChevronRight } from 'lucide-react-native';

interface ButtonStartComponentProps {
    onPress: () => void
}

const ButtonStartComponent: React.FC<ButtonStartComponentProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={ButtonStyle.ButtonStart} onPress={onPress}>
            <Text style={ButtonStyle.ButtonStartTitle}>Começar Treino</Text>
            <ChevronRight color={'white'} size={26}/>

        </TouchableOpacity>
    )
}

export default ButtonStartComponent