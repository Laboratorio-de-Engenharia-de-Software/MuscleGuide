import InputTextComponent from "./InputTextComponent";

// Exemplo de Input Tipo Email
const InputEmail: React.FC = () => (
    <InputTextComponent 
        label="E-mail" 
        placeholder="exemplo@dominio.com" 
        keyboardType="email-address" 
    />
);

export default InputEmail