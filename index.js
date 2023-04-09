const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email, password} = req.body;
  if(email && password){
    let isUserExist = USERS.find(user => user.email === email);
    if(isUserExist){
      res.status(400).send({status:400, message: "User already exist", data: null});
    }else{
      const randomToken =  "rtaahsjerrqomjdaburescuyqommsgywpotwbvqtyumnrets"; // hardcoded for now
      const id = USERS.length; // creating id
      //for now password hashing is not done.
      USERS.push( {
        id,
        email,
        password,
        randomToken
      });
      res.send({status:200, message:"User is added", data: {email, password}});
    }
  }
  else{
    res.status(400).send({status:400, message:"Email or Password is missing", data: null}); // we can validate this case in frontend also.
  }

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

  // return back 200 status code to the client
})


app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const {email, password} = req.body;
  if(email && password){
    let isUserExist = USERS.find(user => user.email === email);
    if(isUserExist){
      if (isUserExist.password === password){
         res.send({status: 200, message: 'Login Successful', data: isUserExist});
      }
      else{
        res.status(401).send({status: 401, message: 'Password Mismatch', data: isUserExist});
      }
    }else{
      res.status(404).send({status: 404, message: 'User Not Found', data: isUserExist});
    }
  }else{
    res.status(400).send({status:400, message:"Email or Password is missing", data: null});
  }
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send({status: 200, message:"all questions", data: QUESTIONS })
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
   const {id} = req.body;
   if (id >= 0){
     const userSubmission = SUBMISSION.filter(submission => submission.userId === id);
     res.send({status: 200, message: "All Submissions" ,data: userSubmission})
   }else{
    res.status(400).send({status: 400, message: "User Id is missing" ,data: null})
   }
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
   const {id, questionId, result, points} = req.body;
   QUESTIONS.push({
    userId: id,
    questionId,
    result,
    points
   })
   res.send({status: 200, message: "Submission Status Updated", data: null})
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})