import { View, Text } from 'react-native';
import DailyTraining from '../components/DailyTraining/DailyTraining';

interface HomeScreenProps {

}

const HomeScreen: React.FC<HomeScreenProps> = () => {
    return (
        <View style={{marginTop: 32, marginHorizontal: 16}} >
            <DailyTraining title={'Treino A'} subtitle={'Peito, Tríceps e Ombro'} />
        </View>
    )
};

export default HomeScreen;
