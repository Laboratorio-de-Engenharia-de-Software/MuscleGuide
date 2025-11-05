import InputTextComponent from "./InputTextComponent";

interface InputSenhaProps {
    label: string,
    placeholder: string
} 

// Exemplo de Input Tipo Senha
const InputSenha: React.FC<InputSenhaProps> = ({label, placeholder}) => (
    <InputTextComponent 
        label={label} 
        placeholder={placeholder} 
        password={true} 
    />
);

export default InputSenha;