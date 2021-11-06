import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';

import {
  Wrapper,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

interface SignUpSecondStepParams {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export const SignUpSecondStep = () => {
  const theme = useTheme();

  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const { user } = route.params as SignUpSecondStepParams;

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  function handleBack() {
    goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert(
        'Preencha corretamente os campos',
        'Informe a senha e a confirmação',
      );
    }

    if (password !== passwordConfirm) {
      return Alert.alert(
        'Preenchimento incorreto',
        'As senhas não são iguais',
      );
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      password,
      driver_license: user.driverLicense,
    }).then(() => {
      navigate('Confirmation', {
        title: 'Conta criada!',
        message: `Agora é só fazer login\ne aproveitar`,
        nextScreenRoute: 'SignIn',
      });
    }).catch(() => {
      Alert.alert(
        'Erro ao cadastrar',
        'Não foi possível realizar o cadastro',
      );
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
