import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://wilds.mhdb.io/en/";

// css and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// locations for now, eventually move this once everything is on its own page
app.get("/", async(req, res) => {
  let random = Math.floor(Math.random() * 4) + 1;
  console.log(API_URL + "locations/" + random);
    try {
      const response = await axios.get(API_URL + "locations/" + random);
      const result = response.data;
    // for( let i = 0; i< result.camps.length; i++) {
    //   console.log(result.camps[i].name)
    // }

    // console.log( "Use of")
    // for ( let item of result.camps) {
    //   console.log( item.name)
    // }

    // console.log( "Use forEach - recommended")
    // result.camps.forEach( (item) => console.log( item.name));

    // console.log( "Use forEach plus destructuring - recommended")
    // result.camps.forEach( ({name}) => console.log( name));


    // res.render("index.ejs", { content: JSON.stringify(result, null, 2)});
    // res.render("index.ejs", { area: result.name, zones: result.zoneCount, zoneCamps: camps});
    res.render("index.ejs", { data: result});


    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

app.get("/locations", async(req, res) => {
  let random = Math.floor(Math.random() * 4) + 1;
  console.log(API_URL + "locations/" + random);
    try {
      const response = await axios.get(API_URL + "locations/" + random);
      const result = response.data;
      res.render("locations.ejs", { data: result});
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

app.post("/get-location", async (req, res) => {
  console.log(req.body.id);
  const searchId = req.body.id;
  if(searchId.length < 1)
      res.redirect("/locations");
  
  else
  {
    try {
      var response;
      response = await axios.get(API_URL + "locations/" + searchId);

      const result = response.data;
      console.log(result);
      res.render("locations.ejs", { data: result});
    } catch (error) {
      // res.render("index.ejs", { content: JSON.stringify(error.response.data) });
      console.log(error);
      res.render("locations.ejs", {
        error: "Invalid Location ID, Valid IDs: 1-5",
      });
      }
  }
});

// TODO - camps
// app.post("/get-risk", async (req, res) => {
//   console.log(req.body);
//   if(danger.length < 1)
//       res.redirect("/locations");
  
//   else
//   {
//     try {
//       const response = await axios.get(API_URL + "locations/camps?q={\"risk\":\"" + danger + "\"}");
//       const result = response.data;
//       res.render("locations.ejs", { data: result});
//     } catch (error) {
//       // res.render("index.ejs", { content: JSON.stringify(error.response.data) });
//       res.render("index.ejs", {
//         error: "Invalid Location ID, Valid IDs: 1-5",
//       });
//       }
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
