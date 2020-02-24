import React, { Component } from 'react';
import Test from './Test';
import firebase from 'firebase';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
// Your web app's Firebase configuration

let firebaseConfig = {
  apiKey: 'AIzaSyDFXHJV71EStlZ6Jd16tI5brf4nGj9PUNg',
  authDomain: 'testforgame-851d2.firebaseapp.com',
  databaseURL: 'https://testforgame-851d2.firebaseio.com',
  projectId: 'testforgame-851d2',
  storageBucket: 'testforgame-851d2.appspot.com',
  messagingSenderId: '864964835557',
  appId: '1:864964835557:web:b9416399888d9373affc0c',
  measurementId: 'G-MCSBQZS62D'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let test;
let firebaseRef = firebase.database().ref('User/User1');

firebaseRef.on('child_added', snapShot => {
  // console.log(snapShot.val())
});

firebaseRef.on('child_changed', snapShot => {
  //   console.log(snapShot.val())
  //   console.log("test: " + test)
  console.log('change');
  // console.log(snapShot.key)
  // if(snapShot.val().name!==this.state.name){
  // this.setState({
  //     name: snapShot.val().name
  // })
  // }
});

export default class Index extends Component {
  state = {
    name: '',
    hp: 0,
    team: ''
  };

  componentDidMount() {
    let name;

    firebaseRef.once('value').then(snapData => {
      console.log(snapData.val().name);
      test = snapData.val();
      if (this.state.name !== test) {
        this.setState({
          name: test.name,
          hp: test.hp,
          team: test.team
        });
      }
    });
    firebaseRef.on('child_changed', snapShot => {
      if (this.state.name !== snapShot.val().name) {
        this.setState({
          name: snapShot.val().name
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    let nm;
    firebaseRef.on('child_changed', () => {
      firebaseRef.once('value').then(snapData => {
        nm = snapData.val();
        console.log('Nm: ' + nm);
        if (this.state.name !== nm) {
          this.setState({
            name: nm.name,
            hp: nm.hp
          });
        }
      });
    });
    console.log('nm' + nm);
    console.log('prev: ' + prevState.name);
    console.log('state: ' + this.state.name);
  }

  attack = () => {
    if(this.state.name !== null && this.state.team !== null){
      firebaseRef.set({
          name: this.state.name,
          hp: this.state.hp - 1,
          team: this.state.team
      })
    }
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.name}</p>
        <p>Hp: {this.state.hp}</p>
        <p>Team: {this.state.team}</p>
        <Button onClick={() => this.attack()} color='primary'>
          primary
        </Button>
      </div>
    );
  }
}
