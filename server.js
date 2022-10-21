/* INITIATE SERVER */
const express = require('express')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const port = 8080

/* INITIATE FIREBASE DATABASE CONNECTION */
const firebase = require('firebase');

const firebaseConfig = {
  apiKey: "AIzaSyC9AcOKOM5eP4QhgpGGh1RTGu05QDA3ojA",
  authDomain: "connect-four-7d59c.firebaseapp.com",
  databaseURL: "https://connect-four-7d59c-default-rtdb.firebaseio.com",
  projectId: "connect-four-7d59c",
  storageBucket: "connect-four-7d59c.appspot.com",
  messagingSenderId: "883134891892",
  appId: "1:883134891892:web:3e3b6af1660cbccc1bce21"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var blue_score;
var orange_score;

/* DATABASE FUNCTIONS */
const updateScoreBoardData = async (blue_score, orange_score, res) => {
    firebase
        .database()
        .ref("scoreboard")
        .set({
            blue_score: blue_score,
            orange_score: orange_score
        })
        .then(() => {
            res.send([blue_score, orange_score]);
        })
}

const getScoreBoardData = async (res) => {
    firebase
        .database()
        .ref("scoreboard")
        .once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            blue_score = data.blue_score;
            orange_score = data.orange_score;
            res.send([blue_score, orange_score]);
        });
}

/* JEST TEST SCOREBOARD FUNCTIONS */
const testScoreBoardData = async (blue_score, orange_score) => {
    firebase
        .database()
        .ref("scoreboard")
        .set({
            blue_score: blue_score,
            orange_score: orange_score
        })
        .then(() => {
            return('Database API call complete');
        })
}

const validateScoreBoardData = async () => {
    firebase
        .database()
        .ref("scoreboard")
        .once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            blue_score = data.blue_score;
            orange_score = data.orange_score;
            return [blue_score, orange_score];
        });
}

/* HANDLE API CALLS FUNCTIONS */
app.get('/updateblue', (req, res) => {
    blue_score += 1;
    updateScoreBoardData(blue_score, orange_score, res);
})

app.get('/updateorange', (req, res) => {
    orange_score += 1;
    updateScoreBoardData(blue_score, orange_score, res);
})

app.get('/getscore', (req, res) => {
    getScoreBoardData(res);
})

app.get('/resetscore', (req, res) => {
    blue_score = 0;
    orange_score = 0;
    updateScoreBoardData(blue_score, orange_score, res);
})

app.listen(port, () => {
  //console.log(`Example app listening on port ${port}`)
})

module.exports = {
    testScoreBoardData,
    validateScoreBoardData
}