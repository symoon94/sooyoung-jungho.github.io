import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.venueName}>그랜드 호텔 웨딩홀</Text>
      <Text style={styles.address}>서울특별시 강남구 테헤란로 123</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>지하철</Text>
        <Text style={styles.infoText}>
          2호선 강남역 4번 출구에서 도보 5분
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>버스</Text>
        <Text style={styles.infoText}>
          간선버스: 146, 341, 360{'\n'}
          지선버스: 4412
        </Text>
      </View>

      <Text 
        style={styles.mapLink}
        onPress={() => Linking.openURL('https://maps.google.com')}
      >
        지도에서 보기
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  venueName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  mapLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
}); 