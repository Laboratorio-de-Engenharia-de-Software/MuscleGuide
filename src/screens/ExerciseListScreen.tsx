import { View, Text, ScrollView, StyleSheet } from "react-native";
import ExerciseComponent from "../components/ExerciseComponent/ExerciseComponent";
import HeaderApp from "../components/Header/HeaderApp";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { useEffect, useMemo } from "react";
import { TRAINING_DATA } from "../data/trainings";

type ExerciseListScreenProps = StackScreenProps<RootStackParamList, 'ExerciseList'>;

const ExerciseListScreen: React.FC<ExerciseListScreenProps> = ({ navigation, route }) => {
    // const navigation = useNavigation<ExerciseListNavigationProp>();
    // 1. Receber o parâmetro do ID
    const { treinoId } = route.params;

    // 2. Usar useMemo para buscar o treino de forma eficiente
    const selectedTraining = useMemo(() => {
        // Explicação: useMemo APENAS ENCONTRA os dados do treino, nada mais.
        // Nenhuma chamada a 'navigation.setOptions' pode estar aqui dentro!
        return TRAINING_DATA.find(t => t.id === treinoId);
    }, [treinoId]);

    // 3. LÓGICA DE EFEITO COLATERAL (setOptions)
    useEffect(() => {
        // Explicação: O useEffect é executado APÓS a primeira renderização e sempre que
        // 'selectedTraining' mudar, sendo o local seguro para chamar setOptions.
        if (selectedTraining) {
            navigation.setOptions({ title: selectedTraining.titulo });
        }
    }, [selectedTraining, navigation]); // Dependências: Roda quando selectedTraining muda.

    // Se o treino não for encontrado...
    if (!selectedTraining) {
        return <View style={styles.errorContainer}><Text style={styles.errorText}>Treino não encontrado!</Text></View>;
    }

    const exercises = selectedTraining.exercises;
    const goToGrid = () => {
        // Altere 'Register' para o nome da sua rota de cadastro
        // navigation.navigate('TreinosTab');
        navigation.navigate('Tabs', { screen: 'TreinosTab', });
    };
    return (
        <ScrollView style={{ backgroundColor: 'black', }}>
            <HeaderApp onPress={goToGrid} />
            <View style={{ paddingHorizontal: 16, backgroundColor: 'black', alignContent: 'center', justifyContent: 'space-between', gap: 8 }}>
                {exercises.map((exercise) => (
                    <ExerciseComponent
                        key={exercise.id} // Chave única é obrigatória em listas React
                        titulo={exercise.tituloExercicio}
                        subtitulo={exercise.descricao}
                        image={exercise.image} // A imagem já é o resultado do require()
                    />
                ))}

                {exercises.length === 0 && (
                    <Text style={styles.emptyText}>Este treino não tem exercícios.</Text>
                )}
                {/* <ExerciseComponent titulo={"Double Press Incliado"} subtitulo={"Volume: 4 séries x 12 repetições"} image={require("../../assets/doublepress_inclinado.png")} />
                <ExerciseComponent titulo={"Double Press Reto"} subtitulo={"Volume: 4 séries x 12 repetições"} image={require("../../assets/doublepress_reto.png")} />
                <ExerciseComponent titulo={"Crucifixo Máquina"} subtitulo={"Volume: 4 séries x 12 repetições"} image={require("../../assets/crucifixo_maquina.png")} /> */}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'black',
        flex: 1
    },
    contentContainer: {
        paddingHorizontal: 16,
        backgroundColor: 'black',
        gap: 8,
        paddingBottom: 20 // Adiciona um padding para a rolagem
    },
    errorContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'white',
        fontSize: 18
    },
    emptyText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 50,
    }
});

export default ExerciseListScreen;