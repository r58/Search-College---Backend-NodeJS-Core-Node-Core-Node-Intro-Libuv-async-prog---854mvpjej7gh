const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require("mongoose");

const { collegeModel } = require("./connector");

app.get("/findColleges", (req, res) => {
  let searchName = !req.query.name ? "" : req.query.name;
  let searchState = !req.query.state ? "" : req.query.state;
  let searchCity = !req.query.city ? "" : req.query.city;
  let searchCourse = !req.query.course ? "" : req.query.course;
  let searchExam = !req.query.exam ? "" : req.query.exam;

  collegeModel
    .find({
      name: new RegExp(searchName, "i"),
      state: new RegExp(searchState, "i"),
      city: new RegExp(searchCity, "i"),
      course: new RegExp(searchCourse, "i"),
      exam: new RegExp(searchExam, "i"),
      minPackage: { $gte: 10.5 },
      maxFees: { $lte: 10 }
    })
    .then((collegeMod) => res.status(200).send(collegeMod));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
