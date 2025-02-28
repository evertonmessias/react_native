import React, { useEffect, useState } from 'react';
import { Image, View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function CalculadoraIMC() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calcular = () => {
    Keyboard.dismiss();
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
      const resp = pesoNum / (alturaNum * alturaNum);
      setImc(resp);
      setShowResults(true);
    } else {
      setImc(null);
      setClassificacao('');
      setShowResults(false);
    }
  };

  const resetar = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setShowResults(false);
  };

  const classifica = () => {
    if (imc === null) return;
    if (imc <= 18) {
      setClassificacao('Abaixo do Peso');
    } else if (imc > 18 && imc <= 25) {
      setClassificacao('Peso Ideal');
    } else if (imc > 25 && imc <= 30) {
      setClassificacao('Acima do Peso');
    } else if (imc > 30 && imc <= 35) {
      setClassificacao('Obesidade Classe I');
    } else if (imc > 35 && imc <= 40) {
      setClassificacao('Obesidade Classe II');
    } else {
      setClassificacao('Obesidade Classe III');
    }
  };

  useEffect(() => {
    classifica();
  }, [imc]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Calculadora IMC</Text>
          <Image source={require('./assets/homer.png')} style={styles.imagem} />
        </View>

        <View style={styles.inputsArea}>
          <View style={styles.peso}>
            <FontAwesome5 name="weight" size={32} color="black" />
            <Text style={styles.label}>Peso (Kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="Kg"
              keyboardType="decimal-pad"
              onChangeText={setPeso}
              value={peso}
            />
          </View>
          <View style={styles.altura}>
            <MaterialCommunityIcons name="human-male-height" size={32} color="black" />
            <Text style={styles.label}>Altura (m)</Text>
            <TextInput
              style={styles.input}
              placeholder="m"
              keyboardType="decimal-pad"
              onChangeText={setAltura}
              value={altura}
            />
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.resultado}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: showResults ? 'red' : '#0047AB' }]}
            onPress={showResults ? resetar : calcular} >
            <Text style={styles.btnText}>{showResults ? 'Reset' : 'Calcular'}</Text>
          </TouchableOpacity>

          {showResults ? (
            <View style={styles.viewResults}>
              <Text style={styles.resultText}>Seu IMC</Text>
              <Text style={styles.resultValue}>{imc !== null ? imc.toFixed(2) : ' '}</Text>
              <Text style={styles.resultClassification}>Classificação</Text>
              <Text style={styles.resultClassificationValue}>{classificacao || ' '}</Text>
            </View>
          ) : (
            <View style={[styles.viewResults, { opacity: 0 }]}>
              <Text style={styles.resultText}>{' '}</Text>
              <Text style={styles.resultValue}>{' '}</Text>
              <Text style={styles.resultClassification}>{' '}</Text>
              <Text style={styles.resultClassificationValue}>{' '}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdd403',
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  imagem: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  inputsArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  spacer: {
    height: 30,
  },
  peso: {
    alignItems: 'center',
    marginBottom: 20,
  },
  altura: {
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    marginTop: 10,
  },
  input: {
    width: 100,
    fontSize: 22,
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  resultado: {
    alignItems: 'center',
  },
  button: {
    width: 150,
    backgroundColor: '#0047AB',
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
  },
  viewResults: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 200,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 20,
    color: '#0047AB',
  },
  resultClassification: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultClassificationValue: {
    fontSize: 20,
    color: 'red',
  },
});