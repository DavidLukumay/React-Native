import React, { Component } from 'react';
import { Text,View,StyleSheet,Button } from 'react-native';
import { Card,Icon,Input,CheckBox } from 'react-native-elements';
import * as SecureStore  from 'expo-secure-store';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo){
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            });
    }

    static navigationOptions = {
        title: 'login',
    };

    handleLogin(){
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.password})
            )
            .catch((error) => console.log('could not save user info',error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('could not delete user info',error));
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input 
                    placeholder="username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder="password"
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onIconPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color="#512DA8"
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

