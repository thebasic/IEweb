import React, { Component } from 'react';
import { Button, ButtonGroup , Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';


export class Home extends Component {
    static displayName = Home.name;
    

    constructor(props) {
        super(props);
        this.state = { datas: [], loading: true };
        this.state = { toggle: false, loading: true };
        this.state = { dDate: [], detail: [], amount: [], typeIO: 0, status: [], itemId: [], loading: true };
        //this.state = { amount: [], loading: true };

        this.toggleModal = this.toggleModal.bind(this);
        Home.setPopUp = Home.setPopUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.publish = this.publish.bind(this);
        this.postIncome = this.postIncome.bind(this);
        Home.setPopUp = Home.setPopUp.bind(this);
        this.clearData = this.clearData.bind(this);
        Home.letDelId = Home.letDelId.bind(this);
        Home.letUpDateId = Home.letUpDateId.bind(this);
        this.setupUpdateIncom = this.setupUpdateIncom.bind(this);
        this.setupUpdateExpenses = this.setupUpdateExpenses.bind(this);

        var _tv = 0;
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        let _renderDatasTable = this.state.loading
            ? <p><em>w8</em></p>
            : Home.renderDatasTable(this.state.datas);
        let _renderSetPopUpe = Home.setPopUp();
        //let _renderSetPopUpExpenses = Home.setPopUp(1);

        return (
            <div>
                {_renderDatasTable}
                <button type="button" className="btn btn-primary" hidden>add</button>
                {_renderSetPopUpe}


            </div>
        );
    }


    // get data
    async getData() {
        const responseI = await fetch('api/Incomes');
        const data = await responseI.json();
        //data.IDate = new Intl.DateTimeFormat('en-GB').format(data.IDate);
        //console.log('gDate',data)
        //this.setState({ datas: dataI, loading: false });

        const responseE = await fetch('api/Expanses');
        const dataCc = data.concat(await responseE.json());
        //data.IDate = new Intl.DateTimeFormat('en-GB').format(data.IDate);
        console.log('gDate', dataCc)


        let _asd = 0;
        let _date = [];
        let reformattedData = dataCc.map((res) => {
            _asd = _asd + 1;
            //_date = new Date(res.iDate);
            //_date = new Intl.DateTimeFormat('en-GB').format(_date);
            //_date = moment(res.iDate).format('DD-MM-YYYY');
            console.log(_date);
            return {

                key: _asd,
                id: res.id,
                date: res.iDate != null ? res.iDate : res.eDate,
                list: res.iList != null ? res.iList : res.eList,
                income: res.income1,
                expanses: res.expenses,
                typeIE: res.income1 != null ? 1 : res.expenses != null ? 2 : 0
                  //res.income1 != null ? 1 : 2

            };
        })

        this.setState({ datas: reformattedData, loading: false });

        //console.log('gAData', dataCc/*this.state.datas*/)
        console.log('gRfData', reformattedData/*this.state.datas*/)
        //let _data = {
        //    id: 1,
        //    iDate: null,
        //    iList: "detail",
        //    income1: 100
        //}
        //await this.setState({ datas: _data, loading: true });
        //console.log("setdata", /*_data*/this.datas)

        //let _data = {
        //    id: 1,
        //    iDate: null,
        //    iList: "detail",
        //    income1: 100
        //}
        //await this.setState({ datas: _data});
        console.log("setdata", /*_data*/this.state.datas)
    }

    async toggleModal() {
        //console.log('ok', this.state.toggle);
        await this.setState({ toggle: !this.state.toggle });
        //console.log('state tg', this.state.toggle);
        //this.clearData();
    }

    // ect fnc
    async handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    async handleDelete({ target }) {
        console.log('handleDelete')
        this.setState({
            [target.name]: target.value
        }, () => console.log(this.state.itemId));
    }


    async setupUpdateIncom(id, type, list, inc, exp, uI, date) {
        console.log('setupUpdateIncom : ', id, type, list, inc, exp)
        //let _amount = [];
        //switch (type) {
        //    case 1: _amount = inc;
        //        break;
        //    case 2: _amount = exp;
        //        break;
        //}
        //await this.setState({ detail: list });
        await this.setState({ itemId: id, typeIO: type, detail: list, amount: inc, status: uI, dDate: date}, () => console.log(id, type, this.state.detail, this.state.amount));
        await this.toggleModal();
        //console.log(this.state.detail);
    }

    async setupUpdateExpenses(id, type, list, inc, exp, uE, date) {
        console.log('setupUpdateExpenses : ', id, type, list, inc, exp)
        //let _amount = [];
        //switch (type) {
        //    case 1: _amount = inc;
        //        break;
        //    case 2: _amount = exp;
        //        break;
        //}
        await this.setState({ itemId: id, typeIO: type, detail: list, amount: exp, status: uE , dDate: date}, () => console.log(id, type, this.state.detail, this.state.amount));
        await this.toggleModal();
    }

    async publish() {
        
        console.log("publishData", this.state.detail, 'amo', this.state.amount,'TIO', this.state.typeIO,'stt', this.state.status);
        //this.state.typeIO == 1 ? await this.postIncome() : this.postExpenses();
        
        

        if (this.state.status == 3) {

            if (this.state.typeIO == 1) {
                console.log('update Income');
                this.postUIncome();
            }
            else if (this.state.typeIO == 2) {
                console.log('update Expenses');
                this.postUExpenses();
            }
            else {

            }
        }
        else {

            if (this.state.typeIO == 1) {
                await this.postIncome();
                console.log('postIncome');
            }
            else if (this.state.typeIO == 2) {
                await this.postExpenses();
                console.log('postExpenses');
            }

        }

        await this.toggleModal();
    }

    async clearData() {
        await this.setState({
            detail: ""
            , amount: ""
            , typeIO: 0
            , dDate: null
            , status: null
            , itemId: null
        }, () => console.log('crdDT', this.state.detail, this.state.amount, this.state.typeIO))
    }

    // postData
    async postIncome() {
        //let _dateS = new Intl.DateTimeFormat('en-GB').format(new Date());
        let _date = new Date();
        let _type = this.state.typeIO;

        let _postData = {
            Id: 0,
            IDate: _date,
            IList: this.state.detail,
            Income1: parseInt(this.state.amount)//this.state.amount
        };

        await fetch('api/incomes',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_postData)
            }).then(res => res.json());

        //console.log(new Intl.DateTimeFormat('en-GB').format(_date));
        console.log("postDataIc", _postData);
        await this.clearData();
        //console.log("cleared", _postData);
    }

    async postExpenses() {
        let _date = new Date();
        let _type = this.state.typeIO;

        let _postData = {
            Id: 0,
            EDate: _date,
            EList: this.state.detail,
            Expenses: parseInt(this.state.amount)
        };
        console.log("postDataEp", _postData);
        await fetch('api/Expanses',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_postData)
            }).then(res => res.json());

        //console.log(new Intl.DateTimeFormat('en-GB').format(_date));
        
        await this.clearData();
    }

    async postUIncome() {
        //let _date = new Date();
        //let _type = this.state.typeIO;

        let _postData = {
            Id: this.state.itemId,
            IDate: this.state.dDate,
            IList: this.state.detail,
            Income1: parseInt(this.state.amount)
        };
        console.log("postDataInc", _postData);
        await fetch('api/Incomes/' + this.state.itemId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_postData)
            }).then(res => res.json());

        //console.log(new Intl.DateTimeFormat('en-GB').format(_date));
        
        await this.clearData();
    }

    async postUExpenses() {
        //let _date = new Date();
        //let _type = this.state.typeIO;

        let _postData = {
            Id: this.state.itemId,
            EDate: this.state.dDate,
            EList: this.state.detail,
            Expenses: parseInt(this.state.amount)
        };
        console.log("postDataUExp", _postData);
        await fetch('api/Expanses/' + this.state.itemId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(_postData)
            }).then(res => res.json());

        //console.log(new Intl.DateTimeFormat('en-GB').format(_date));

        await this.clearData();
    }

    async deleteItem(id, type) {
        console.log('type', type)
        //let _postData = {
        //    Id: 0,
        //    EDate: _date,
        //    EList: this.state.detail,
        //    Expenses: parseInt(this.state.amount),
        //    //typeIE: this.state.typeIO
        //};

        await fetch('api/' + (type == 1 ? 'Incomes/' : 'Expanses/') + id,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
                //,body: JSON.stringify(id)
            }).then(res => res.json());
    }

    static letDelId(id, type) {
        //console.log('letDId : ', id)
        this.deleteItem(id, type);
    }

    static letUpDateId(id, type, list, inc, exp, date) {
        console.log('letUId : ', id, type, list, inc, exp)
        //this.deleteItem(id, type);
        
        if (type == 1) {
            this.setupUpdateIncom(id, type, list, inc, exp, 3, date)
        } else if (type == 2) {
            this.setupUpdateExpenses(id, type, list, inc, exp, 3, date)
        } else {

        }

    }

    //static fnc
    static renderDatasTable(datas) {
        
        return (
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>List</th>
                        <th>Income</th>
                        <th>Expenses</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map(datas =>
                        <tr key={datas.key}>
                            <td>{datas.date}</td>
                            <td>{datas.list}</td>
                            <td>{datas.income}</td>
                            <td>{datas.expanses}</td>
                            <td>
                                
                                <ButtonGroup >
                                    <Button color="primary" onClick={() => this.letUpDateId(
                                        datas.id
                                        , datas.typeIE
                                        , datas.list
                                        , datas.income
                                        , datas.expanses
                                        , datas.date
                                    )}>edit</Button>
                                    <Button color="danger" onClick={() => this.letDelId(datas.id, datas.typeIE)}>delete</Button>
                                </ButtonGroup>
                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static setPopUp() {
        let _toggle = this.toggleModal;
        //let _type = type == 0 ? "Add income" : "Add Expenses";
        //let _typeN = type == 0 ? 0 : 1;
        //let _asdas = () => { this.setState({ typeIO: type, loading: true }, /*() => { this.teFnc(type) }*/() => { console.log("asd", _typeN
            ///*this.state.typeIO*/) }  ) }

        return (
            <>
                <Button color="primary" onClick={_toggle}>Add</Button>

                <Modal isOpen={this.state.toggle} toggle={_toggle} >
                    <ModalHeader toggle={_toggle}>Add List</ModalHeader>
                    <ModalBody>
                        <Form >
                            <FormGroup>
                                <Label >Select Type</Label>
                                <Input type="select" name="typeIO" value={this.state.typeIO} onChange={this.handleChange}>
                                    <option Value={0}>select type..</option>
                                    <option value={1}>Add income</option>
                                    <option value={2}>Add Expenses</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label >Detail</Label>
                                <Input name="detail" value={this.state.detail} onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Amount</Label>
                                <Input name="amount" value={this.state.amount} onChange={this.handleChange}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.publish}>Save</Button>
                        <Button color="secondary" onClick={_toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>

            

            );
    }

    
}
