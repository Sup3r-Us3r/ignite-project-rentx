import React from 'react';

import {
  Wrapper,
} from './styles';

interface BulletProps {
  active?: boolean;
}

export const Bullet = ({ active = false }: BulletProps) => {
  return (
    <Wrapper active={active} />
  );
};
