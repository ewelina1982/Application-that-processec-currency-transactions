import React, {Component} from 'react';
import 'antd/dist/antd.css';
import * as Styled from '../style.js';
import Columns from '../columns.js';
import AddCurrencyTransactionModal from '../addCurrencyTransactionModal/AddCurrencyTransactionModal';


export class App extends Component {
  state = {
    list: [],
    valuePLN: null,
    isModalVisible: false
  }

  changeValueInput = (e) => {
    const {value} = e.target;
    const reg = /^[0-9]*(\.[0-9]{0,2})?$/
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      this.setState({
        valuePLN: value
      }, () => {
        this.renderList()
      })
    }
  }

  addCurrencyTransaction = () => {
    this.setState({
      isModalVisible: true
    })
  }

  deleteTransaction = (index) => {
    const data = [...this.state.list]
    let names = data.findIndex(item => item.index === index)
    data.splice(names, 1)
    this.setState({
      list: data
    })
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  saveModal = (payload) => {
    const data = [...this.state.list, payload].map((item, index) => {
      return {
        ...item,
        index
      }
    }).sort(this.camparePln)
    this.setState({
      list: data
    })
    this.closeModal()
  }

  camparePln = (a, b) => {
    const plnA = parseFloat(a.pln);
    const plnB = parseFloat(b.pln);

    let comparison = 0;
    if (plnA < plnB) {
      comparison = 1;
    } else if (plnA > plnB) {
      comparison = -1;
    }
    return comparison ;
  }

  renderGreatesValue = () => {
    const {list} = this.state
    const data = list.sort(this.camparePln)
    const sumPln = list.map(item => parseFloat(item.pln)).reduce((prev, next) => prev + next, 0).toFixed(2)
    const sumEuro = list.map(item => parseFloat(item.euro)).reduce((prev, next) => prev + next, 0).toFixed(2)

    return (
      <Styled.GreatesValue>
        <h2>Transakcja o najwiekszej kwocie</h2>
        <h3>Nazwa : {data[0] ? data[0].name : null}</h3>
        <h3>Pln : {data[0] ? data[0].pln : null}</h3>
        <h3>Euro : {data[0] ? data[0].euro : null}</h3>
        <h3>Suma PLN : {sumPln}</h3>
        <h3>Suma Euro : {sumEuro}</h3>
      </Styled.GreatesValue>
    )
  }

  renderList = () => {
    const dataList = this.state.list.map(item => {
      const valueToDecimal = parseFloat(item.euro * this.state.valuePLN).toFixed(2)
      return {
        ...item,
        pln: valueToDecimal
      }
    }).sort(this.camparePln)
    this.setState({list: dataList})
  }


  render() {
    const {isModalVisible, list, valuePLN} = this.state;
    return (
      <Styled.Container>
        <Styled.Title>Transakcja Walutowa</Styled.Title>
        <Styled.Input
          addonBefore="1 Euro =" addonAfter="PLN"
          size='small'
          onChange={this.changeValueInput}
          placeholder='Wpisz liczbę'
          data-testid="search-input"
          allowClear
          value={valuePLN}
        />
        <Styled.Button
          type="primary"
          disabled={!valuePLN}
          onClick={this.addCurrencyTransaction}> Dodawanie
          transakcji
          walutowej </Styled.Button>
        <Styled.ContainerTable>
          <Styled.Table
            columns={Columns(this.deleteTransaction)}
            rowKey={record => record.name}
            dataSource={list}
            size="middle"
          />
          < AddCurrencyTransactionModal
            isVisible={isModalVisible}
            onClose={this.closeModal}
            onSave={this.saveModal}
            valuePLN={valuePLN}
          />
          {this.renderGreatesValue()}
        </Styled.ContainerTable>
      </Styled.Container>
    );
  }
}

export default App;
