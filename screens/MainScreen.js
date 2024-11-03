import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>2024년 5월 25일 토요일 오후 2시</Text>
        <Text style={styles.title}>김철수 ♥ 이영희</Text>
        <Text style={styles.subtitle}>결혼합니다</Text>
      </View>

      <Image
        source={require('../assets/main-photo.jpg')}
        style={styles.mainImage}
      />

      <View style={styles.messageBox}>
        <Text style={styles.message}>
          서로 사랑하며 아끼는 마음으로{'\n'}
          평생을 함께하고자 합니다.{'\n'}
          귀한 걸음 하시어 축복해 주시면{'\n'}
          감사하겠습니다.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Location')}
        >
          <Text style={styles.buttonText}>오시는 길</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Gallery')}
        >
          <Text style={styles.buttonText}>갤러리</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
  },
  mainImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  messageBox: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
}); 