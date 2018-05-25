import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { Screen, Title, Text, Divider, Button, Spinner, View, ImageBackground, TextInput} from '@shoutem/ui';


import Input from '../containers/Input';
import LoginButton from '../containers/LoginButton';
import { setUserName, setUserAvatar, login } from '../actions';

const mapStateToProps = state => {
    return {
        authorizing: state.user.authorizing
    };
}
class LoginUI extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
        }
    }
    onLogin() {
        const { name } = this.state;
        this.props.login({ name });
    }
    onUserNameChanged(name) {
        if (name && name.length > 3) {
            this.setState({
                disabled: false,
                name: name
            });
        } else {
            this.setState({
                disabled: true
            });
        }
    }
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
                this.props.onFocus(this.refs.input);
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
            <ImageBackground source={require('../img/33.png')} style={styles.backgroundImage}>
            <View style={{
                paddingLeft: 30,
                paddingRight: 30,
                justifyContent: 'center',
                alignSelf: 'stretch',
                flex: 1,
                }}>
                <Title style={{
                    justifyContent: 'center',   
                    paddingLeft: 57,
                    paddingTop: 10,
                    fontSize:32, 
                    color: '#fff'
                    }}>Who are you?</Title>
                <Divider />
                   <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
                <TextInput placeholder="Your name here"
                submitAction={setUserName}
                value={this.props.name}
                       onChangeText={name => this.onUserNameChanged(name)}
                       
                       ref="username"/>
               </View>
                <Divider />

                    
                    <Button styleName="dark" onPress={this.onLogin.bind(this)}>
                <Text>Start Chatting</Text>
            </Button>
            </View>
            </ImageBackground>
            
        );
    }
}

const styles = {
    backgroundImage:{
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        justifyContent: 'center'
    }
}


export default connect(mapStateToProps, {setUserName, login})(LoginUI);