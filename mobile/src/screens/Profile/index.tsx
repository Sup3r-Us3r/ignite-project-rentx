import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import {
  Wrapper,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

export const Profile = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user, signOut, updateUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [name, setName] = useState<string>('');
  const [driverLicense, setDriverLicense] = useState<string>('');

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => signOut(),
          style: 'cancel',
        },
      ],
    );
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert(
        'Você está Offline',
        'Para mudar a senha é necessário que tenha uma conexão com a internet',
      );
    } else {
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const responseImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (responseImage.cancelled) {
      return;
    }

    if (responseImage.uri) {
      setAvatar(responseImage.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('Nome é obrigatório'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado', 'As informações do perfil foram salvas com sucesso');
    } catch (error) {
      console.log({ error });
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Algo deu errado', error.message);
      } else {
        Alert.alert('Erro ao editar', 'Não foi possível atualizar o perfil');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Wrapper>
          <Header>
            <HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {
              option === 'dataEdit' ?
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                    value={user.name}
                  />
                  <Input
                    iconName="mail"
                    placeholder="E-mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                    value={user.driver_license}
                  />
                </Section>
              :
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    autoCorrect={false}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                    autoCorrect={false}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir senha"
                    autoCorrect={false}
                  />
                </Section>
            }

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Content>
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
