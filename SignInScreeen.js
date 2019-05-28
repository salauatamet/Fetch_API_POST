import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { Container, Content, Form, Input } from 'native-base';
// import base64 from 'react-native-base64';
import styles from '../src/css/Styles';

import logo from '../assets/logo.png';
import OfflineNotice from '../src/components/OfflineNotice';

class SignInScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }
    // console.log(this.state.username);
    // console.log(this.state.password);
    _handlePress() {
        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify({
                username: (this.state.username),
                password: (this.state.password),
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData)
                )
            })
            .done();
    };

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: 'rgba(110, 207, 246, 0.2)' }}>
                    <StatusBar
                        barStyle="light-content"
                        backgroundColor="#00A1E4"
                    />
                    <View style={styles.Header}>
                        <View style={styles.logoContainer}>
                            <Image source={logo} style={styles.logo} />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.FormText}>
                            Уже зарегистрированы
                        </Text>
                    </View>
                    <Content>
                        <Form>
                            <Icon name={'md-person'} size={20} color={'#ED1C24'}
                                style={styles.IconIDNumber}
                            />
                            <Input
                                onChangeText={(text) => this.setState({ username: text })}
                                ref="Text"
                                returnKeyType="next"
                                style={styles.input}
                                placeholder={'Логин'}
                                placeholderTextColor={'#87979E'}
                                selectionColor="#111111"
                                keyboardType="default"
                                autoCorrect={false}
                                underlineColorAndroid='transparent'
                            />

                            <Icon name={'md-lock'} size={20} color={'#ED1C24'}
                                style={styles.inputIconPasswordSignIn}
                            />
                            <Input
                                ref="Password"
                                returnKeyType="done"
                                onChangeText={(text) => this.setState({ password: text })}
                                style={styles.input}
                                placeholder={'Пароль'}
                                secureTextEntry={true}
                                placeholderTextColor={'#87979E'}
                                underlineColorAndroid='transparent'
                                ref={(input) => this.password = input}
                            />

                            <TouchableOpacity style={styles.btnLogin} onPress={() => this._handlePress()}>
                                <Text style={styles.btnLoginText}>Войти в кабинет</Text>
                            </TouchableOpacity>
                        </Form>

                        <View style={styles.registerLink}>
                            <View style={styles.btnNoAccount}>
                                <Text style={styles.btnNoAccountText}>Нет Аккаунта?</Text>
                            </View>
                            <TouchableOpacity style={styles.btnSignIn} onPress={() => this.props.navigation.navigate('Регистрация')}>
                                <Text style={styles.btnSignInText}>
                                    Регистрация
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Content>
                <OfflineNotice />
            </Container>
        );
    }
}

export default SignInScreen;
