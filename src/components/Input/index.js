import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import db from '../../../db.json';

const InputBase = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 25px;
  border: 1px solid ${({ theme }) => theme.colors.tertiary};
  border-radius: ${db.theme.borderRadius};
  background-color: transparent;
  font-size: 14px;
  font-family: 'Lato', sans-serif;
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

Input.defaultProps = {
  value: '',
};

Input.prototypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
