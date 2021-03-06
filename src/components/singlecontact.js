import React from 'react';

class SingleContact extends React.Component {
    constructor() {
        super();
        this.state = {
            showEditForm: false
        }
    }

    handleToggleEdit = () => {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        if(!this.state.showEditForm){
            return(
                <SingleContactData id={this.props.id} letter={this.props.letter} name={this.props.name} number={this.props.number} handleToggleEdit={this.handleToggleEdit} handleDeleteContact={this.props.handleDeleteContact} />
            )
        } else {
            return(
                <SingleContactForm id={this.props.id} letter={this.props.letter} name={this.props.name} number={this.props.number} handleToggleEdit={this.handleToggleEdit} handleEditContact={this.props.handleEditContact} />
            )
        }
    }
}


class SingleContactData extends React.Component {
    onClickDeleteContact = () => {
        this.props.handleDeleteContact(this.props.id, this.props.letter);
    }

    render() {
        return(
            <tr id={this.props.id}>
                <td className="name col-xs-5 col-md-offset-1"><span>{this.props.name}</span></td>
                <td className="number col-xs-5"><span>{this.props.number}</span></td>
                <td className="col-xs-1">
                    <div className="contact-buttons btn-group">
                        <button className="btn btn-default" onClick={this.props.handleToggleEdit}>Modifica</button>
                        <button className="btn btn-default" onClick={this.onClickDeleteContact}>Cancella</button>
                    </div>
                </td>
            </tr>
        )
    }
}


class SingleContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            number: this.props.number
        }
    }

    onNameChange = (event) => {
        if(event.target.value.length <= 20){
            this.setState({
                name: event.target.value
            });
        }
    }

    onNumberChange = (event) => {
        const filteredInputNumber = event.target.value.replace(/[^0-9]/g, '');
        if(filteredInputNumber.length <= 20){
            this.setState({
                number: filteredInputNumber
            });
        }
    }

    onClickSave = () => {
        this.props.handleEditContact(this.props.letter, this.props.id, this.state.name, this.state.number);
        this.props.handleToggleEdit();
    }

    render() {
        return(
            <tr>
                <td className="name col-xs-5 col-md-offset-1"><input className="col-xs-5 form-control" type="text" value={this.state.name} onChange={this.onNameChange} /></td>
                <td className="number col-xs-5"><input className="col-xs-5 form-control" type="text" value={this.state.number} onChange={this.onNumberChange} /></td>
                <td className="col-xs-1">
                    <div className="contact-buttons btn-group">
                        <button className="btn btn-default" onClick={this.props.handleToggleEdit}>Annulla</button>
                        <button className="btn btn-default" onClick={this.onClickSave}>Salva</button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default SingleContact;