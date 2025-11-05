import { View, FlatList, StyleSheet, ListRenderItemInfo } from "react-native";
import GradeCardComponent from "../components/GradeCard/GradeCardComponent"
import HeaderApp from "../components/Header/HeaderApp";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { TRAINING_DATA, TrainingItem } from '../infrastructure/adapters/db/trainings'; // Importe os dados mocados!
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../infrastructure/framework/TabRoutes";

// type GridScreenProps = StackScreenProps<RootStackParamList, 'Grid'>;

type GridScreenProps = CompositeScreenProps<
    // Tipo das props DESTA tela dentro do Tab Navigator
    BottomTabScreenProps<TabStackParamList, 'TreinosTab'>, 
    // Tipo das props do Stack Navigator PAI (que você usa para ir para ExerciseList)
    StackScreenProps<RootStackParamList>
>;

const GridScreen: React.FC<GridScreenProps> = ({ navigation }) => {

    // const defaultImage = require('../../assets/default_training_icon.png'); // Crie uma imagem default
    // const navigation = useNavigation<GridNavigationProp>();

    const handleCardPress = (treinoId: string) => {
        // Explicação: Chamamos 'ExerciseList' e passamos o treinoId como um parâmetro de rota.
        // É assim que a tela de destino saberá quais exercícios carregar.
        navigation.navigate('ExerciseList', { treinoId: treinoId });
    };

    const goToHome = () => {
        // Altere 'Register' para o nome da sua rota de cadastro
        navigation.navigate('HomeTab');
    };

    const renderTreino = ({ item }: ListRenderItemInfo<TrainingItem>) => {
        const imageToDisplay = item;

        return (
            <GradeCardComponent
                imagem={imageToDisplay.img}
                title={item.titulo}
                subtitle={item.subtitulo}
                onPress={() => handleCardPress(item.id)} // Passa o ID do treino para a função de navegação
            />
        );
    };

    return (
        <View style={GridStyles.mainContainer}> 
            <HeaderApp onPress={goToHome} />
            <FlatList
                // Removido o View que encapsulava o FlatList
                data={TRAINING_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderTreino}
                // numColumns={2}
                // contentContainerStyle é ideal para estilos que afetam o conteúdo da lista
                contentContainerStyle={GridStyles.gridContainer}
            />
        </View>
    )
}

const GridStyles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'black',
        flex: 1, // Garante que ocupe toda a altura
        gap: 16
    },
    gridContainer: {
        width: '100%',
        paddingHorizontal: 8
    }
});

export default GridScreen;