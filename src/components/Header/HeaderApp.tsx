import { ChevronLeft } from "lucide-react-native"
import { View, Text, TouchableOpacity } from "react-native"
import { RootStackParamList } from "../../../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface HeaderAppProps {
    onPress: () => void
}
const HeaderApp: React.FC<HeaderAppProps> = ({ onPress }) => {
    {
        return (
            <View style={{ flexDirection: 'row', padding: 16, paddingTop: 32, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#1E1E1E', gap: 86 }}>
                <TouchableOpacity onPress={onPress}>
                    <ChevronLeft color={'#3269D2'} size={25} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Muscle Guide</Text>
            </View>
        )
    }
}

export default HeaderApp