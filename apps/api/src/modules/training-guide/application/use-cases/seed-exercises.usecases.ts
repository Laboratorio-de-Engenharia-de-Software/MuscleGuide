import { Inject, Injectable, Logger } from "@nestjs/common";
import { IExerciseRepository, EXERCISE_REPOSITORY_TOKEN } from "../../domain/repositories/exercise.repository";
import { Workout } from "../../domain/entities/workout.entity";
import * as SetVO from "../../domain/value-objects/set.vo";
import { MuscleGroup } from "../../domain/value-objects/exercise-muscle-group.vo";
import { WorkoutFocus, WorkoutFocusVO } from "../../domain/value-objects/workout-focus.vo";
import { IWorkoutRepository, WORKOUT_REPOSITORY_TOKEN } from "modules/training-guide/domain/repositories/workout.repository";
import { Exercise } from "modules/training-guide/domain/entities/exercuse.entity";
// import { RawTrainingSession } from "modules/training-guide/application/use-cases/seed-data.interface"
// O MAPA DE TRADUÇÃO COMPLETO (omito aqui por espaço, mas é o definido acima)
// const DescriptiveMuscleGroupMap: Record<string, MuscleGroup> = { ... };
// ... (Assumindo que este mapa está definido globalmente ou no topo deste arquivo) ...

// Seus dados adaptados
const RAW_TRAINING_DATA = {
    "workoutName": "Treino ABC Foco Hipertrofia",
    "description": "Grade de hipertrofia dividida em 3 sessões principais. Volume e intensidade otimizados para ganhos de massa muscular (Mass Gain).",
    "trainingSessions": [
        {
            "sessionName": "Treino A - Peito, Tríceps, Ombros (Empurrar)",
            "focus": "MASS_GAIN",
            "workoutItems": [
                { "id": "A1", "name": "Supino Reto com Barra", "gifUrl": "URL_DO_GIF_A1", "isBasic": true, "sets": { "series": 4, "repetitions": 8, "restTimeSeconds": 90 }, "targetGroups": ["Peitoral Maior", "Deltoide Anterior", "Tríceps"], "order": 1 },
                { "id": "A2", "name": "Supino Inclinado com Halteres", "gifUrl": "URL_DO_GIF_A2", "isBasic": true, "sets": { "series": 4, "repetitions": 10, "restTimeSeconds": 90 }, "targetGroups": ["Peitoral Superior", "Deltoide Anterior", "Tríceps"], "order": 2 },
                { "id": "A3", "name": "Desenvolvimento com Halteres Sentado", "gifUrl": "URL_DO_GIF_A3", "isBasic": true, "sets": { "series": 4, "repetitions": 10, "restTimeSeconds": 90 }, "targetGroups": ["Deltoide Anterior", "Deltoide Medial", "Tríceps"], "order": 3 },
                { "id": "A4", "name": "Elevação Lateral com Halteres", "gifUrl": "URL_DO_GIF_A4", "isBasic": false, "sets": { "series": 3, "repetitions": 12, "restTimeSeconds": 60 }, "targetGroups": ["Deltoide Medial"], "order": 4 },
                { "id": "A5", "name": "Extensão de Tríceps na Polia (Corda)", "gifUrl": "URL_DO_GIF_A5", "isBasic": false, "sets": { "series": 3, "repetitions": 12, "restTimeSeconds": 60 }, "targetGroups": ["Tríceps"], "order": 5 }
            ],
            "alternatives": {
                "Supino Reto com Barra": ["Supino Reto com Halteres", "Máquina Peck Deck (Chest Press)"],
                "Supino Inclinado com Halteres": ["Supino Inclinado na Máquina Smith", "Crucifixo Inclinado com Halteres"],
                "Desenvolvimento com Halteres Sentado": ["Desenvolvimento Militar com Barra (em pé ou sentado)", "Desenvolvimento na Máquina Smith"],
                "Elevação Lateral com Halteres": ["Elevação Lateral no Cabo", "Elevação Lateral na Máquina"],
                "Extensão de Tríceps na Polia (Corda)": ["Tríceps Testa com Barra W", "Tríceps Coice com Halteres"]
            }
        },
        {
            "sessionName": "Treino B - Costas e Bíceps (Puxar)",
            "focus": "MASS_GAIN",
            "workoutItems": [
                { "id": "B1", "name": "Puxada Alta (Lat Pulldown) com Pegada Aberta", "gifUrl": "URL_DO_GIF_B1", "isBasic": true, "sets": { "series": 4, "repetitions": 8, "restTimeSeconds": 90 }, "targetGroups": ["Grande Dorsal", "Redondo Maior", "Bíceps"], "order": 1 },
                { "id": "B2", "name": "Remada Curvada com Barra (Pegada Pronada)", "gifUrl": "URL_DO_GIF_B2", "isBasic": true, "sets": { "series": 4, "repetitions": 8, "restTimeSeconds": 90 }, "targetGroups": ["Trapézio", "Grande Dorsal", "Romboides", "Bíceps"], "order": 2 },
                { "id": "B3", "name": "Remada Sentada no Cabo (Triângulo)", "gifUrl": "URL_DO_GIF_B3", "isBasic": false, "sets": { "series": 3, "repetitions": 10, "restTimeSeconds": 60 }, "targetGroups": ["Grande Dorsal", "Romboides"], "order": 3 },
                { "id": "B4", "name": "Rosca Direta com Barra", "gifUrl": "URL_DO_GIF_B4", "isBasic": false, "sets": { "series": 3, "repetitions": 10, "restTimeSeconds": 60 }, "targetGroups": ["Bíceps Braquial"], "order": 4 },
                { "id": "B5", "name": "Rosca Martelo com Halteres", "gifUrl": "URL_DO_GIF_B5", "isBasic": false, "sets": { "series": 3, "repetitions": 12, "restTimeSeconds": 60 }, "targetGroups": ["Braquial", "Bíceps Braquial", "Supinador"], "order": 5 }
            ],
            "alternatives": {
                "Puxada Alta (Lat Pulldown) com Pegada Aberta": ["Barra Fixa (Pull-up)", "Puxada com Pegada Neutra na Máquina"],
                "Remada Curvada com Barra (Pegada Pronada)": ["Remada Unilateral com Halter (Serrote)", "Remada na Máquina Pendular"],
                "Remada Sentada no Cabo (Triângulo)": ["Pullover no Cabo", "Remada Cavalinho (T-Bar)"],
                "Rosca Direta com Barra": ["Rosca Alternada com Halteres", "Rosca no Cabo com Barra Reta"],
                "Rosca Martelo com Halteres": ["Rosca Inversa com Barra", "Rosca Concentrada"]
            }
        },
        {
            "sessionName": "Treino C - Pernas e Glúteos",
            "focus": "MASS_GAIN",
            "workoutItems": [
                { "id": "C1", "name": "Agachamento Livre com Barra", "gifUrl": "URL_DO_GIF_C1", "isBasic": true, "sets": { "series": 4, "repetitions": 6, "restTimeSeconds": 120 }, "targetGroups": ["Quadríceps", "Glúteos", "Isquiotibiais"], "order": 1 },
                { "id": "C2", "name": "Levantamento Terra Romeno (Stiff)", "gifUrl": "URL_DO_GIF_C2", "isBasic": true, "sets": { "series": 4, "repetitions": 10, "restTimeSeconds": 90 }, "targetGroups": ["Isquiotibiais", "Glúteo Máximo", "Eretores da Coluna"], "order": 2 },
                { "id": "C3", "name": "Cadeira Extensora", "gifUrl": "URL_DO_GIF_C3", "isBasic": false, "sets": { "series": 3, "repetitions": 12, "restTimeSeconds": 60 }, "targetGroups": ["Quadríceps"], "order": 3 },
                { "id": "C4", "name": "Mesa Flexora", "gifUrl": "URL_DO_GIF_C4", "isBasic": false, "sets": { "series": 3, "repetitions": 12, "restTimeSeconds": 60 }, "targetGroups": ["Isquiotibiais"], "order": 4 },
                { "id": "C5", "name": "Elevação de Panturrilha Sentado", "gifUrl": "URL_DO_GIF_C5", "isBasic": false, "sets": { "series": 4, "repetitions": 15, "restTimeSeconds": 60 }, "targetGroups": ["Sóleo", "Gastrocnêmio"], "order": 5 }
            ],
            "alternatives": {
                "Agachamento Livre com Barra": ["Leg Press 45º", "Agachamento Búlgaro com Halteres"],
                "Levantamento Terra Romeno (Stiff)": ["Elevação Pélvica (Hip Thrust)", "Good Morning com Barra"],
                "Cadeira Extensora": ["Hack Squat", "Afundo com Barra"],
                "Mesa Flexora": ["Cadeira Flexora", "Flexão Nórdica (Assistida)"],
                "Elevação de Panturrilha Sentado": ["Panturrilha em Pé (Smith ou Livre)", "Panturrilha no Leg Press"]
            }
        }
    ]
};

// Mapeamento de tradução (Pendência que resolveremos em seguida)
const DescriptiveMuscleGroupMap: Record<string, MuscleGroup> = {
    "Peitoral Maior": MuscleGroup.CHEST,
    "Peitoral Superior": MuscleGroup.CHEST,
    "Deltoide Anterior": MuscleGroup.SHOULDERS,
    "Deltoide Medial": MuscleGroup.SHOULDERS,
    "Tríceps": MuscleGroup.TRICEPS,
    "Grande Dorsal": MuscleGroup.BACK,
    "Trapézio": MuscleGroup.BACK,
    "Romboides": MuscleGroup.BACK,
    "Redondo Maior": MuscleGroup.BACK,
    "Bíceps Braquial": MuscleGroup.BICEPS,
    "Braquial": MuscleGroup.BICEPS,
    "Supinador": MuscleGroup.BICEPS, // Antebraço
    "Quadríceps": MuscleGroup.LEGS,
    "Glúteos": MuscleGroup.LEGS,
    "Glúteo Máximo": MuscleGroup.LEGS,
    "Isquiotibiais": MuscleGroup.LEGS,
    "Eretores da Coluna": MuscleGroup.CORE,
    "Sóleo": MuscleGroup.CALVES,
    "Gastrocnêmio": MuscleGroup.CALVES,
};

@Injectable()
export class SeedExercisesUseCase {
    private readonly logger = new Logger(SeedExercisesUseCase.name);

    constructor(
        @Inject(EXERCISE_REPOSITORY_TOKEN)
        private readonly exerciseRepository: IExerciseRepository,
        
        @Inject(WORKOUT_REPOSITORY_TOKEN)
        private readonly workoutRepository: IWorkoutRepository,
    ) { }

    public async execute(): Promise<void> {
        this.logger.log('Iniciando o Seed de Treinos e Exercícios...');

        // Evita rodar o seed mais de uma vez (MVP)
        const existingWorkouts = await this.workoutRepository.findAll();
        if (existingWorkouts.length > 0) {
            this.logger.warn('Grades de Treino já existem. Saindo do Seed.');
            return;
        }

        const createdExercises = new Map<string, Exercise>();
        // const alternativeExercises = new Map<string, string[]>(); // Para as ligações N:M
        const allExerciseNames = new Set<string>();

        (RAW_TRAINING_DATA.trainingSessions as RawTrainingSession[]).forEach(session => {
            // Coleta os nomes dos exercícios principais (item.exercise.name)
            session.workoutItems.forEach(item => allExerciseNames.add(item.name)); 
            
            // Coleta os nomes alternativos (Object.values garante que são arrays de string)
            Object.values(session.alternatives).forEach((names) => {
                if (names) {
                    
                    (names as string[]).forEach(name => allExerciseNames.add(name));
                }
            });
        });

        for (const name of allExerciseNames) {
            // Lógica para determinar quais grupos alvo (Ainda pendente, mas vamos traduzir usando o mapa)
            const targetGroups: MuscleGroup[] = [MuscleGroup.CHEST]; // Placeholder simples por enquanto

            const newExercise = Exercise.createNew({
                name: name,
                gifUrl: `URL_SIMULADA_${name.replace(/\s/g, '_').toUpperCase()}`,
                isBasic: name.includes('com Barra'),
                targetGroups: targetGroups.map(g => g as any),
            });
            const savedExercise = await this.exerciseRepository.save(newExercise);
            createdExercises.set(name, savedExercise);
        }

        this.logger.log(`Criados ${createdExercises.size} exercícios únicos no banco.`);

        // --- 2. SEED: Criar as Grades de Treino (Workouts) ---
        for (const session of RAW_TRAINING_DATA.trainingSessions) {

            // Usamos o Type Cast (as RawWorkoutItem[]) para garantir que as propriedades 'sets', 'name', etc. existam.
            const workoutItems = session.workoutItems.map((rawItem: any, index) => {

                const series = rawItem.sets.series;
                const repetitions = rawItem.sets.repetitions;
                const restTimeSeconds = rawItem.sets.restTimeSeconds; // Usando o valor fixo do JSON

                // Cria o VO Set com o cálculo
                const setVO = SetVO.Set.create({ series, repetitions, restTimeSeconds });

                // ... (restante do mapeamento para WorkoutItem)
                return {
                    id: rawItem.id,
                    exercise: createdExercises.get(rawItem.name)!,
                    sets: setVO,
                    order: rawItem.order,
                };
            });

            const newWorkout = Workout.createNew({
                name: session.sessionName,
                description: RAW_TRAINING_DATA.description,
                // O foco é uma string no RAW_DATA, precisamos traduzir para o ENUM
                focus: WorkoutFocusVO.create(session.focus as WorkoutFocus),
                items: workoutItems.map((item) => ({
                    // Note que WorkoutItem aninhado na Entity não usa Getters/Setters, mas sim a estrutura de propriedades
                    id: item.id,
                    order: item.order,
                    exercise: item.exercise,
                    sets: item.sets, // Mapeia o VO Set para a interface SetProps
                }) as any),
            });

            await this.workoutRepository.save(newWorkout);
        }

        this.logger.log(`Criação de ${RAW_TRAINING_DATA.trainingSessions.length} Grades de Treino concluída.`);
    }
}