import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { styles } from './styles';
import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // verificar se os dispositivos são compativeis para a authenticação
  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible)

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]));
  }

  // função para autenticação
  async function handleAuthentication () {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    // console.log(isBiometricEnrolled);

  // função para se não houver biometria cadastrada
    if(!isBiometricEnrolled) {
      return Alert.alert('Login', 'Nenhuma biometria encontrada. Por favor, Cadastre no dispositivo')
    }

  // const para criar a autenticação com digital do usuário
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida'
    });
    // console.log(auth);

    setIsAuthenticated(auth.success);
  }

  useEffect(() => {
    verifyAvaiableAuthentication();
  })

  return (
    <View style={styles.container}>
      <Text>
        Usuário Conectado: { isAuthenticated ? 'Sim' : 'Não'}
      </Text>

      <Button 
        title="entrar" onPress={handleAuthentication}
      />
    </View>
  );
}

