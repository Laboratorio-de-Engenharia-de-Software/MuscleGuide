import { View } from 'react-native';
import DailyTraining from '../components/DailyTraining/DailyTraining';
import ButtonComponent from '../components/ButtonComponents/ButtonComponent';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import ButtonStartComponent from '../components/ButtonComponents/ButtonStartComponent';
import HeaderHome from '../components/Header/HeaderHome';
// import { StackScreenProps } from '@react-navigation/stack';
import { TRAINING_DATA } from '../infrastructure/adapters/db/trainings'; // Importe os dados mocados!
import { useMemo } from 'react';
import { TabStackParamList } from '../infrastructure/framework/TabRoutes'; // Ajuste o caminho se necessário!
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
// interface HomeScreenProps {

// }

// type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;
type HomeScreenProps = CompositeScreenProps<
    // Tipo das props DESTA tela dentro do Tab Navigator
    BottomTabScreenProps<TabStackParamList, 'HomeTab'>, 
    // Tipo das props do Stack Navigator PAI (que o Tab Navigator está aninhado)
    StackScreenProps<RootStackParamList>
>;
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    // const navigation = useNavigation<LoginScreenNavigationProp>();

    const treinoA = useMemo(() => {
        // Explicação: Busca o primeiro treino com o título 'Treino A' e retorna seu objeto.
        // Se o título mudar, você precisará mudar a string 'Treino A' aqui.
        return TRAINING_DATA.find(treino => treino.titulo === 'Treino A');
    }, []);

    // 2. 🎯 Crie uma função de navegação para o Treino A
    const startTreinoA = () => {
        if (treinoA) {
            // Explicação: Chamamos navigation.navigate('ExerciseList') e passamos 
            // o ID encontrado (treinoA.id) como parâmetro.
            navigation.navigate('ExerciseList', { treinoId: treinoA.id });
        } else {
            // Caso o Treino A não seja encontrado (bom para depuração)
            console.error("Treino A não encontrado nos dados.");
        }
    };

    return (
        <View style={{ backgroundColor: 'black', height: '100%', width: '100%', }} >
            <View>
                <HeaderHome />
            </View>
            <View style={{ height: '40%', width: '100%', }}>
                <DailyTraining
                    title={treinoA?.titulo || 'Treino não encontrado'}
                    subtitle={treinoA?.subtitulo || 'Verifique os dados'}
                />
            </View>
            <View style={{ margin: 8 }}>
                {/* <ButtonComponent nome='Iniciar Treino' onPress={goToGrid} /> */}
                <ButtonStartComponent onPress={startTreinoA} />

            </View>
        </View>
    )
};

export default HomeScreen;
