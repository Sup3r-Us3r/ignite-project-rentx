import styled, { css } from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface OptionProps {
  active: boolean;
}

interface OptionTitleProps {
  active: boolean;
}

export const Wrapper = styled.View`
  background: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Header = styled.View`
  align-items: center;
  height: 227px;
  width: 100%;
  padding: 0 24px;
  background: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${getStatusBarHeight() + 32}px;
  width: 100%;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  height: 180px;
  width: 180px;
  border-radius: 90px;
  margin-top: 48px;
  background: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled.Image`
  height: 180px;
  width: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 40px;
  width: 40px;
  background: ${({ theme }) => theme.colors.main};
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  margin-bottom: 20px;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<OptionProps>`
  padding-bottom: 14px;

  ${({ theme, active }) => active && css`
    border-bottom-width: 3px;
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const OptionTitle = styled.Text<OptionTitleProps>`
  font-family: ${({ theme, active }) => active
    ? theme.fonts.secondary600
    : theme.fonts.secondary500
  };
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) => active
    ? theme.colors.header
    : theme.colors.textDetail
  };
`;

export const Section = styled.View``;
