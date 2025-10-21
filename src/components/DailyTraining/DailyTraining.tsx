import { View, Text, ImageBackground } from 'react-native';
import styles from './styles'

interface DailyTrainingProps {
    title: string;
    subtitle: string;
}
const imagemDeFundo = require('../../../assets/chest_image.png')
const DailyTraining: React.FC<DailyTrainingProps> = ({title, subtitle}) => {
    return (
        <ImageBackground 
      source={imagemDeFundo} 
      style={styles.card} 
      resizeMode="cover"
      imageStyle={styles.imageOverlay} // Aplica um overlay escuro na imagem
    >
      {/* Container para os textos, posicionado no canto inferior esquerdo */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </ImageBackground>
    )
}

export default DailyTraining