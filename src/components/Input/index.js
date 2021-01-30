import React from 'react';
import styled from 'styled-components';
import db from '../../../db.json';

const InputBase = styled.input`
  width: 281px;
  height: 38px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  border-radius: ${db.theme.borderRadius};
  background-color: transparent;
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.contrastText};
`;

export default function Input({ onChange, placeholder, ...props }) {
  return (
    <>
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </>
  );
}
