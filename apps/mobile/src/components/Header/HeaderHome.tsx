import { Bell } from "lucide-react-native"
import { View, Text, ImageBackground } from "react-native"

interface HeaderHomeProps {

}
// const imagemFundo = require('../../../assets/mingcute_notification-fill.png')
const HeaderHome: React.FC<HeaderHomeProps> = ({ }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, paddingTop: 32 }}>
            <Text style={{ color: '#3269D2', fontSize: 24, fontWeight: 'bold' }}>
                Olá, Pedro!
            </Text>
            <Bell color={'#3269D2'} size={25} />
        </View>
    )
}

export default HeaderHome