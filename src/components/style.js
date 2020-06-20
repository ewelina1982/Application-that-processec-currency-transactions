import styled from 'styled-components';
import {Input as InputAntd, Form, Popconfirm, Table as TableAntd, Button as ButtonAntd} from 'antd';

export const Input = styled(InputAntd)`
   width:250px;
   height: 32px;
`;

export const Forms = styled(Form)`
  label {
    font-weight: 500;
  }
  div {
    margin-bottom: 0px !important;
  }
  input {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
  .ant-select-selection--single {
    width: 100%;
  }
`;

export const Delete = styled(Popconfirm)`
  color: #df0000;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: none;
  :hover {
    color: #fa3119;
    background-color: transparent;
  }
`;

export const Table = styled(TableAntd)`
  margin-top: 10px;
    width: 50% !important;
`;

export const Container = styled.div`
  margin: 0;
  padding: 10px;
  
`;

export const GreatesValue = styled.div`
  margin-left: 10px;
`;

export const ContainerTable = styled.div`
display: flex;
`;

export const Button = styled(ButtonAntd).attrs(props => ({
  'data-testid': 'add-button'
}))`
 margin-left: 130px;
`;

export const Title = styled.div`

    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    color: #2d5ff5;
`;
