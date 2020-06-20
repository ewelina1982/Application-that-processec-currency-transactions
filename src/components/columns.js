import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import * as Styled from './style';

const showTransferValute = (deleteFunction) => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Euro',
            dataIndex: 'euro',
            key: 'euro',
        },
        {
            title: 'Pln',
            dataIndex: 'pln',
            key: 'pln',
        },
        {
            title: '',
            width: 50,
            dataIndex: 'delete',
            key: 'delete',
            render: (text, record) => <Styled.Delete placement="top" title="Czy na pewno chcesz usunąć?" onConfirm={() => deleteFunction(record.index)} okText="Tak" cancelText="Nie">
        <DeleteOutlined theme="outlined" className="remove-icon"/>
        </Styled.Delete>
},
    ]
}

export default showTransferValute;