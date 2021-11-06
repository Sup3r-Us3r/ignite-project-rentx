import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Wrapper,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

export const SignUpFirstStep = () => {
  const { navigate, goBack } = useNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [driverLicense, setDriverLicense] = useState<string>('');

  function handleBack() {
    goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup
          .string()
          .required('CNH é obrigatória'),
        email: Yup
          .string()
          .email('E-mail inválido')
          .required('E-mail é obrigatório'),
        name: Yup
          .string()
          .required('Nome é obrigatório'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Algo deu errado', error.message);
      }
    }
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
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button
            title="Próximo"
            onPress={handleNextStep}
          />
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
