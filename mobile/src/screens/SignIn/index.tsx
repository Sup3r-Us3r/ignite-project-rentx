import React, { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import {
  Wrapper,
  Header,
  Title,
  SubTitle,
  Form,
  Footer,
} from './styles';

export const SignIn = () => {
  const theme = useTheme();

  const { navigate } = useNavigation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleNewAccount() {
    navigate('SignUpFirstStep');
  }

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup
          .string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup
          .string()
          .required('A senha é obrigatória'),
      });
  
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Algo deu errado', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique suas credencias.',
        );
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <Title>
              Estamos{'\n'}quase lá.
            </Title>
            <SubTitle>
              Faça seu logini para começar{'\n'}
              uma experiência incrível
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              enabled
              loading={false}
              onPress={handleSignIn}
            />
            <Button
              title="Criar conta gratuita"
              enabled
              loading={false}
              color={theme.colors.backgroundSecondary}
              light
              onPress={handleNewAccount}
            />
          </Footer>
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
