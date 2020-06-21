import React from 'react';
import {Button, Modal, Form, Input} from 'antd';
import * as Styled from '../style';

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: {span: 6},
    sm: {span: 6}
  },
  wrapperCol: {
    xs: {span: 16},
    sm: {span: 16}
  }
};

const INITIAL_FORM_VALUES = {
  name: undefined,
  euro: undefined,
  pln: undefined
};


const AddCurrencyTransactionModal = (props) => {
  const [form] = Form.useForm();

  const closeModal = () => {
    form.resetFields()
    props.onClose()

  }

  const saveModal = () => {
    form.validateFields().then(values => {
      if (values) {
        collectPayload();
        closeModal();
      }
    });
  };

  const validateInput = (rule, value) => {
    const reg = /^[0-9]*(\.[0-9]{0,2})?$/
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      return Promise.resolve();
    }

    return Promise.reject('Tylko liczba i tylko dwa miejsca po przecinku!');
  }


  const collectPayload = () => {
    const {name, euro} = form.getFieldsValue();
    const valueToDecimal = parseFloat(euro * props.valuePLN).toFixed(2)
    const payload = {
      name,
      euro,
      pln: valueToDecimal
    }
    props.onSave(payload)
  }

  return (
    <>
      <Modal
        title="Dodaj transakcję"
        visible={props.isVisible}
        onOk={saveModal}
        onCancel={closeModal}
        footer={
          [
            <Button key="back" onClick={closeModal}>Anuluj</Button>,
            <Button key="submit" type="primary" onClick={saveModal}>Zapisz</Button>
          ]}>
        <Styled.Forms {...FORM_ITEM_LAYOUT} form={form} initialValues={INITIAL_FORM_VALUES}>
          <Form.Item name="name" label="Nazwa" key={'name'}
                     rules={
                       [
                         {
                           required: true,
                           message: 'Pole jest wymagane'
                         }
                       ]
                     }
          >
            < Input
              size="small"
              placeholder="Nazwa"
              data-testid="name"/>
          </Form.Item>
          <Form.Item
            name="euro"
            label="Wartość w euro"
            key={'euro'}
            rules={[
              {
                required: true,
                message: 'Pole jest wymagane'
              },
              {validator: validateInput}
            ]}
          >
            <Input size="small" placeholder="Wartość w Euro" data-testid="euro"/>
          </Form.Item>
        </Styled.Forms>
      </Modal>
    </>
  )
}

export default AddCurrencyTransactionModal;