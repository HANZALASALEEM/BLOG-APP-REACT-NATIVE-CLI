import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {initializeApp} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAC4fJTuf_GClRbpGLTh8LjMz_p029M9ws',
  authDomain: 'blogapp-b16d5.firebaseapp.com',
  projectId: 'blogapp-b16d5',
  storageBucket: 'blogapp-b16d5.appspot.com',
  messagingSenderId: '577280054273',
  appId: '1:577280054273:web:bec7676a78564ea0819c00',
  measurementId: 'G-15SMPYMDP5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({setIsLoggedIn}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('User successfully logged in:', user);
        setIsLoggedIn(true);
        navigation.replace('Home');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 23,
    marginBottom: 55,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  btn: {
    width: '50%',
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  },
});
