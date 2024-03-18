import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const ApiKey = `ff4a686d99a47264154dbaf310752e0c`;
app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send("Please provide a city name");
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${(process.env.OPENWEATHERMAP_API_KEY = `${ApiKey}`)}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Extract only temperature and city name
    const temperature = weatherData.main.temp;
    const city = weatherData.name;
    res.send(`The weather in ${city}  and temperature is ${temperature}.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
