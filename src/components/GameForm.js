import React, { Component } from 'react';
import classnames from 'classnames';


class GameForm extends Component {
  state = {
    _id: this.props.game ? this.props.game._id : null,
    title: this.props.game ? this.props.game.title : '',
    cover: this.props.game ? this.props.game.cover : '',
    errors: {},
    loading: false
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.game._id,
      title: nextProps.game.title,
      cover: nextProps.game.cover
    });
  }



  handleChange = (e) => {
    if(!!this.state.errors[e.target.name]){
      let errors = Object.assign({}, this.state.errors);
      delete errors[e.target.name]
      this.setState({
        [e.target.name]: e.target.value ,
        errors
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();

    //validations
    let errors = {};
    if(this.state.title === '') errors.title = "Can't be blank";
    if(this.state.cover === '') errors.cover = "Can't be blank";

    this.setState({ errors })

    const isValid = Object.keys(errors).length === 0

    if(isValid) {
      const { _id, title, cover } = this.state;
      this.setState({ loading: true })
      this.props.saveGame({ _id, title, cover })
        .catch((err) => err.response.json().then(({ errors }) => this.setState({ errors, loading: false })))

    }
  }


  render() {
    const form = (
      <form className={ classnames('ui', 'form', { loading: this.state.loading }) } onSubmit={ this.handleSubmit }>
        <h1>New Game</h1>

        { !!this.state.errors.global && <div className="ui negative message"> <p>{ this.state.errors.global }</p> </div>}

        <div className={classnames('field', { error: !!this.state.errors.title })}>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' value={this.state.title} onChange={this.handleChange} />
          <span>{this.state.errors.title}</span>
        </div>
        <div className={classnames('field', { error: !!this.state.errors.cover })} >
          <label htmlFor='cover'>Cover</label>
          <input id='cover' name='cover' value={this.state.cover} onChange={this.handleChange} />
          <span>{this.state.errors.cover}</span>
        </div>

        <div className='field'>
          { this.state.cover !== '' && <img src={this.state.cover} alt='cover' className='ui small bordered image' /> }
        </div>

        <div className='field'>
          <button className="ui primary button">Save</button>
        </div>

      </form>
    );
    return(
      <div>
        { form }
      </div>
    );
  }
}

export default GameForm;