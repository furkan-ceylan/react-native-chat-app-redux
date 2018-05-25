import * as firebase from 'firebase';

// should go in a secret file
const config = {
    apiKey: 'AIzaSyCDX6fDQvjbg4TJshUWtY1C7Se18LC0vT8',
    authDomain: 'tolkin-c17bb.firebaseapp.com',
    databaseURL: 'https://tolkin-c17bb.firebaseio.com',
    projectId: 'tolkin-c17bb',
    storageBucket: 'tolkin-c17bb.appspot.com',
    messagingSenderId: '132050083977'
};
firebase.initializeApp(config);

export default firebase;