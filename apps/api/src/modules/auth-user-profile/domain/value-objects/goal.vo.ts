// Garantimos que apenas valores válidos possam ser usados
export enum GoalType {
  MASS_GAIN = 'GANHO_DE_MASSA',
  WEIGHT_LOSS = 'PERDA_DE_PESO',
  MAINTENANCE = 'SAIR_DO_SEDENTARISMO', // Mapeando o termo de negócio
}

export class Goal {
  // A propriedade interna é privada para garantir imutabilidade
  private readonly type: GoalType;

  private constructor(type: GoalType) {
    this.type = type;
  }

  // Método estático de criação que garante a validade do VO (Linguagem Ubíqua)
  public static create(type: GoalType): Goal {
    if (!Object.values(GoalType).includes(type)) {
      // Usar uma exceção de domínio aqui é uma boa prática
      throw new Error('GoalType inválido fornecido.');
    }
    return new Goal(type);
  }

  // Permite acesso ao valor sem permitir alteração (imutabilidade)
  public getValue(): GoalType {
    return this.type;
  }

  // Método para comparação (essencial em VOs)
  public equals(other: Goal): boolean {
    return this.type === other.type;
  }
}

// Isso garante que no sistema só existam Objetivos válidos.