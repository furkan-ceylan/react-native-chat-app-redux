import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView, Button, Text, TouchableOpacity} from 'react-native';

import { TextInput } from '@shoutem/ui';


class sendButton extends Component {

    state = {
        text: null
    }
 
    onChangeText = text => this.setState({text: text});

    onSubmitEditing = () => {
        this.props.dispatch(
            this.props.submitAction(this.state.text)
        );

        if (!this.props.noclear) {
            this.setState({
                text: null
            });
        }
    }

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.refs.sendit);
        }
    }

    onBlur = () => {
        if (this.props.submitOnBlur) {
            this.onSubmitEditing();
        }
    }
    onLayout = (event) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
        }
    }
    render() {
        return (
            <TouchableOpacity
            placeholder={this.props.placeholder}
            underlineColorAndroid = {this.underlineColorAndroid}
                       onChangeText={this.onChangeText}
                       onSubmitEditing={this.onSubmitEditing}
                       onLayout={this.onLayout}
                       value={this.state.text}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       
            style={{marginLeft:280, backgroundColor:'gray', width: 70, height: 30}}
             styleName="dark"
             ref="sendit"
             title="Press Me"

              >
                
            </TouchableOpacity>
                        
        )
    }
}

export default connect()(sendButton);