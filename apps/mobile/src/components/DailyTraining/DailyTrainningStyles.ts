
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%', // Defina uma altura fixa ou use porcentagem do pai, ex: '30%'
    borderRadius: 10, // Bordas arredondadas como na imagem
    justifyContent: 'flex-end', // Alinha o textContainer no final (inferior)
    alignItems: 'flex-start', // Alinha o textContainer no início (esquerda)
    shadowColor: '#909090ff',      // Use preto para melhor visibilidade da sombra
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  imageOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'tranparent',
    borderRadius: 10,
  },
  textContainer: {
    paddingLeft: 20,
    paddingBottom: 20, 
  },
  title: {
    color: 'white',
    fontSize: 36, // Tamanho maior para o título
    fontWeight: 'bold', // Negrito
    marginBottom: 5, // Espaçamento entre título e subtítulo
  },
  subtitle: {
    color: 'white',
    fontSize: 18, // Tamanho menor para o subtítulo
  }
})

export default styles;