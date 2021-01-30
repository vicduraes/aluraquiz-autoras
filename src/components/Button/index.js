import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import db from '../../../db.json';

const Button = styled.button`
  width: 100%;
  padding: 10px 16px;
  line-height: 1;
  outline: 0;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border: none;
  border-radius: ${db.theme.borderRadius};
  transition: 0.3s;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.contrastText};

  &:hover,
  &:focus {
    opacity: 0.5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
