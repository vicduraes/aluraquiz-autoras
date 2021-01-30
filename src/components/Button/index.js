import React from 'react';
import styled from 'styled-components';
import db from '../../../db.json';

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  outline: 0;
  transition: 0.3s;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${db.theme.borderRadius};

  &:hover,
  &:focus {
    opacity: 0.5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

export default Button;
