import React from 'react';
import { useTheme } from 'styled-components';
import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';
import { Feather } from '@expo/vector-icons';

import { generateInterval } from './generateInterval';

import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
};

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

const Calendar = ({ markedDates, onDayPress }: CalendarProps) => {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={( direction ) =>
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color={theme.colors.text}
        />
      }
      headerStyle={{
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.textDetail,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary400,
        textDayHeaderFontFamily: theme.fonts.primary500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval,
};
