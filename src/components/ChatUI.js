import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView, Image, TouchableOpacity, ReactNative, 
StyleSheet }  from 'react-native';
import {Footer, FooterTab} from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Title, Screen, ScrollView, TextInput,Text } from '@shoutem/ui';
import Messages from '../containers/Messages';
import Input from '../containers/Input';
import { sendMessage } from '../actions';

const mapStateToProps = (state) => ({
chatHeight: state.chatroom.meta.height,
user: state.user,
});

class ChatUI extends Component {
 constructor()
 {
     super();
     this.state = {
        text: '',
        scrollViewHeight: 0,
        inputHeight: 0
    }
 }
 updateValue(text) {
     console.warn(text)

 }      

componentDidMount() {
    this.scrollToBottom(false);
}

componentDidUpdate() {
    this.scrollToBottom();
}

onChangeText(text) { 
    this.setState({text: text})
};

onSendBtnPressed (text) { this.props.sendMessage(this.state.text, this.props.user); }

onScrollViewLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
        scrollViewHeight: layout.height
    });
}

onInputLayout = (event) => {
    const layout = event.nativeEvent.layout;

    this.setState({
        inputHeight: layout.height
    });
}

scrollToBottom(animate = false) {
    const { scrollViewHeight, inputHeight } = this.state,
          { chatHeight } = this.props;

    const scrollTo = chatHeight - scrollViewHeight + inputHeight;

 if (scrollTo > 0) {
   this.refs.scroll.scrollToEnd();

}
}
_scrollToInput(reactRef) {
    this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
}
submit() {
    let collection = {}
    collection.text = this.state.text,
    console.warn(collection);
}

render() {
    return (
   <Screen >   
            <Title style={{paddingTop: 25, paddingLeft: 10, borderBottomWidth: 0.5, backgroundColor: 'white', paddingBottom: 10}}>
            <Image style={{width:80, height: 80}} source={require('../img/11.png')} />
            <Text>                    GENERAL CHAT</Text>
            </Title>
            <KeyboardAwareScrollView ref="scroll"
                                     onLayout={this.onScrollViewLayout}>
                <Messages />
    </KeyboardAwareScrollView>
          <Footer style={{width:360,
                    height:30,
                    backgroundColor:'#fff',
                    borderRadius:20,
                    borderWidth: 0.5,
                    marginBottom: 3,
                    borderColor: 'gray',    
         }}>              
 <TextInput           
                onSubmitEditing = {this.onSubmitEditing}
                multiline
                   onLayout={this.onInputLayout}
                   submitAction={this.onSendBtnPressed}
                   ref="input"
                   placeholder="Say something ..." 
                   onChangeText={(text) => this.onChangeText(text, 'text')}
                   style={{backgroundColor: 'rgba(0,0,0,0)',
                   borderBottomWidth: 1.5, borderColor: '#f8f8f8', fontSize: 16, color: 'gray', paddingBottom:20}}
                   ref={input => { this.textInput = input; } }/>   
          </Footer>
          <TouchableOpacity
                           onPress={() => this.onSendBtnPressed()}
                           style={{marginLeft:280, backgroundColor:'gray', width: 70, height: 30}}
                           title= "send"
           >  
           </TouchableOpacity>

 </Screen>       
    )
}
}

export default connect(mapStateToProps, {sendMessage})(ChatUI);