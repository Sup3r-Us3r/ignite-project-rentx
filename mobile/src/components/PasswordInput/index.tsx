import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Wrapper,
  IconContainer,
  TextInput,
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export const PasswordInput = ({
  iconName,
  value,
  ...rest
}: InputProps) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Wrapper>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            (isFocused || isFilled)
              ? theme.colors.main
              : theme.colors.textDetail
          }
        />
      </IconContainer>

      <TextInput
        {...rest}
        isFocused={isFocused}
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.textDetail}
          />
        </IconContainer>
      </BorderlessButton>
    </Wrapper>
  );
};
