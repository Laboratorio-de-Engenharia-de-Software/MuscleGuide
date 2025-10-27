import InputTextComponent from "./InputTextComponent";

// Exemplo de Input Tipo Senha
const InputSenha: React.FC = () => (
    <InputTextComponent 
        label="Senha" 
        placeholder="Mínimo 8 caracteres" 
        password={true} 
    />
);

export default InputSenha;