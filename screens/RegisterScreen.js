// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import React, {useState} from 'react';

// // Image Picker
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// //Firebase
// import {auth} from '../firebase/Index';
// import {firestore} from '../firebase/Index';
// import {storage} from '../firebase/Index';
// import {createUserWithEmailAndPassword} from 'firebase/auth';

// export default Register = ({navigation}) => {
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [name, setName] = useState(null);
//   const [image, setImage] = useState();

//   function onPickImage() {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       data => setImage(data.assets[0].uri),
//     );
//   }

//   function onClickImage() {
//     launchCamera(
//       {
//         mediaType: 'photo',
//       },
//       data => setImage(data.assets[0].uri),
//     );
//   }

//   function onRegister() {
//     if (!password && !email) {
//       return;
//     }
//     try {
//       createUserWithEmailAndPassword(auth, email, password).then(
//         userCredential => {
//           // Signed in
//           navigation.replace('Home');
//           console.log('Done');
//           // ...
//         },
//       );
//     } catch (error) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       alert(error.message);
//       console.log(error.message);
//     }
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Image source={{uri: !image ? null : image}} style={styles.img} />
//       <View style={styles.imgBtnContainer}>
//         <TouchableOpacity style={styles.imgBtn} onPress={() => onClickImage}>
//           <Text style={styles.btnText}>Click Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.imgBtn} onPress={() => onPickImage}>
//           <Text style={styles.btnText}>Pick Image</Text>
//         </TouchableOpacity>
//       </View>

//       <View
//         style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Name"
//           value={name}
//           onChangeText={text => setName(text)}
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Email"
//           value={email}
//           onChangeText={text => setEmail(text)}
//         />
//         <TextInput
//           style={styles.textInput}
//           placeholder="Password"
//           value={password}
//           secureTextEntry
//           onChangeText={text => setPassword(text)}
//         />
//       </View>
//       <TouchableOpacity style={styles.imgBtn} onPress={() => onRegister}>
//         <Text style={styles.btnText}>Register</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   imgBtn: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4361ee',
//     width: 110,
//     alignSelf: 'center',
//     height: 45,
//     borderRadius: 15,
//     margin: 20,
//   },
//   imgBtnContainer: {
//     flexDirection: 'row',
//     width: '80%',
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 17,
//   },
//   textInput: {
//     borderBottomWidth: 0.8,
//     margin: 10,
//     borderRadius: 5,
//     width: '80%',
//   },
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   img: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'gray',
//     borderRadius: 50,
//   },
// });
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, setDoc} from 'firebase/firestore';
import {getStorage, ref, uploadBytes} from 'firebase/storage';
import {getDownloadURL} from 'firebase/storage';
import {initializeApp} from 'firebase/app';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Firebase configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyAC4fJTuf_GClRbpGLTh8LjMz_p029M9ws',
  authDomain: 'blogapp-b16d5.firebaseapp.com',
  projectId: 'blogapp-b16d5',
  storageBucket: 'blogapp-b16d5.appspot.com',
  messagingSenderId: '577280054273',
  appId: '1:577280054273:web:bec7676a78564ea0819c00',
  measurementId: 'G-15SMPYMDP5',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const RegisterScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const onRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = userCredential.user.uid;
      const userRef = doc(db, 'users', userId);
      const userData = {name};
      await setDoc(userRef, userData);
      const photoRef = ref(storage, `users/${userId}/photo`);
      const photoBlob = await fetch(photo).then(response => response.blob());
      await uploadBytes(photoRef, photoBlob);
      const photoUrl = await getDownloadURL(photoRef);
      console.log(photoUrl);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error.message);
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.photo} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add photo</Text>
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePickImage} style={styles.button}>
          <Text style={styles.buttonText}>Pick image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Take photo</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={onRegister} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    fontSize: 16,
    backgroundColor: '#6060af',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
    width: 122,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
  input: {
    width: '80%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  registerButton: {
    margin: 10,
    fontSize: 16,
    backgroundColor: '#448e42',
    textDecorationLine: 'underline',
    marginHorizontal: 10,
    width: 122,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default RegisterScreen;
