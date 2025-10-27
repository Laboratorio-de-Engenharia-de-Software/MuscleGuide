// src/data/trainings.js

import { ImageSourcePropType } from "react-native";

export interface Exercise {
    id: string;
    image: number; // Assume que é o resultado de require()
    tituloExercicio: string;
    descricao: string;
}

// 2. Defina a interface para um treino (o que a FlatList irá renderizar)
export interface TrainingItem {
    id: string;
    titulo: string;
    img: ImageSourcePropType;
    subtitulo: string;
    exercises: Exercise[];
}


// --- Treino A (Peito, Tríceps e Ombro) ---
const TREINO_A = require('../../assets/images/Treinos/chest_image.png');
const DOUBLE_INCLINADO = require('../../assets/images/Exercicios/double_press_inclinado.gif');
const DOUBLE_RETO = require('../../assets/images/Exercicios/double_press_reto.gif');
const CRUZ_MAQUINA = require('../../assets/images/Exercicios/crucifixo_maquina.gif');
const TRICEPS_CORDA = require('../../assets/images/Exercicios/triceps_corda.gif');
const TRICEPS_TESTA = require('../../assets/images/Exercicios/triceps_testa.gif');
const ELEVACAO_LATERAL = require('../../assets/images/Exercicios/elevacao_lateral.gif');

// --- Treino B (Pernas) ---
const TREINO_B = require('../../assets/images/Treinos/leg_image.png');
const AGACHAMENTO_LIVRE = require('../../assets/images/Exercicios/agachamento_livre.gif');
const CADEIRA_EXTENSORA = require('../../assets/images/Exercicios/cadeira_extensora.gif');
const CADEIRA_FLEXORA = require('../../assets/images/Exercicios/cadeira_flexora.gif');
const STIFF = require('../../assets/images/Exercicios/stiff.gif');
const CADEIRA_ABDUTORA = require('../../assets/images/Exercicios/cadeira_abdutora.gif');
const EXTENSAO_PANTURRILHA = require('../../assets/images/Exercicios/extensao_panturrilha.gif');

// --- Treino C (Costas, Bíceps e Ombro) ---
const TREINO_C = require('../../assets/images/Treinos/back_image.png');
const PULLEY_ABERTO = require('../../assets/images/Exercicios/pulley_aberto.gif');
const REMADA_MAQUINA = require('../../assets/images/Exercicios/remada_maquina.gif');
const PULLDOWN = require('../../assets/images/Exercicios/pulldown.gif');
const ROSCA_DIRETA = require('../../assets/images/Exercicios/rosca_direta.gif');
const ROSCA_CONCENTRADA = require('../../assets/images/Exercicios/rosca_concentrada.gif');
const CRUZ_INVERSO = require('../../assets/images/Exercicios/crucifixo_inverso.gif');

// --- Treino D (Cardio) ---
const TREINO_D = require('../../assets/images/Treinos/run_image.png');
const CORRIDA = require('../../assets/images/Exercicios/corrida.gif');

export const TRAINING_DATA = [
    {
        id: 'treino-a',
        img: TREINO_A,
        titulo: 'Treino A',
        subtitulo: 'Peito, Tríceps e Ombro',
        exercises: [
            {
                id: 'ex-1',
                image: DOUBLE_INCLINADO, // Passando o módulo da imagem (require)
                tituloExercicio: 'Double Press Inclinado',
                descricao: 'Volume: 4 séries x 12 repetições',
            },
            {
                id: 'ex-2',
                image: DOUBLE_RETO,
                tituloExercicio: 'Double Press Reto',
                descricao: 'Volume: 4 séries x 12 repetições',
            },
            {
                id: 'ex-3',
                image: CRUZ_MAQUINA,
                tituloExercicio: 'Crucifixo Maquina',
                descricao: 'Volume: 4 séries x 12 repetições',
            },
            {
                id: 'ex-4',
                image: TRICEPS_CORDA,
                tituloExercicio: 'Tríceps Corda',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-5',
                image: TRICEPS_TESTA,
                tituloExercicio: 'Tríceps Testa',
                descricao: 'Volume: 3 séries x 12 repetições',
            },

            {
                id: 'ex-6',
                image: ELEVACAO_LATERAL,
                tituloExercicio: 'Elevação Lateral no Cabo',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
        ],
    },
    {
        id: 'treino-b',
        titulo: 'Treino B',
        img: TREINO_B,
        subtitulo: 'Quadríceps, Posterior, Glúteo e Panturrilha',
        exercises: [
            {
                id: 'ex-7',
                image: AGACHAMENTO_LIVRE,
                tituloExercicio: 'Agachamento Livre',
                descricao: 'Volume: 4 séries x 12 repetições',
            },
            {
                id: 'ex-8',
                image: CADEIRA_EXTENSORA,
                tituloExercicio: 'Cadeira Extensora',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-9',
                image: CADEIRA_FLEXORA,
                tituloExercicio: 'Cadeira Flexora',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-10',
                image: STIFF,
                tituloExercicio: 'Stiff',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-11',
                image: CADEIRA_ABDUTORA,
                tituloExercicio: 'Cadeira Abdutora',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-12',
                image: EXTENSAO_PANTURRILHA,
                tituloExercicio: 'Extensão de Panturrillha no Smith',
                descricao: 'Volume: 3 séries x 12 repetições',
            },

        ],
    },
    {
        id: 'treino-c',
        titulo: 'Treino C',
        img: TREINO_C,
        subtitulo: 'Costas, Bíceps e Ombro',
        exercises: [
            {
                id: 'ex-13',
                image: PULLEY_ABERTO,
                tituloExercicio: 'Pulley Puxada Aberta',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-14',
                image: REMADA_MAQUINA,
                tituloExercicio: 'Remada Máquina',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-15',
                image: PULLDOWN,
                tituloExercicio: 'Pull Down',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-16',
                image: ROSCA_DIRETA,
                tituloExercicio: 'Rosca Direta',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-17',
                image: ROSCA_CONCENTRADA,
                tituloExercicio: 'Rosca Concentrada',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
            {
                id: 'ex-18',
                image: CRUZ_INVERSO,
                tituloExercicio: 'Crucifixo Inverso',
                descricao: 'Volume: 3 séries x 12 repetições',
            },
        ], // Exemplo de treino sem exercícios
    },
    {
        id: 'treino-d',
        titulo: 'Treino D',
        img: TREINO_D,
        subtitulo: 'Corrida',
        exercises: [
            {
                id: 'ex-19',
                image: CORRIDA,
                tituloExercicio: 'Corrida',
                descricao: 'Tempo: 15-30 minutos (Esteira ou Rua)',
            },],
    },
];