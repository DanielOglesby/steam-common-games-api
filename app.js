import serverless from "serverless-http";
import express from "express";
import axios from "axios";
import 'dotenv/config'

const app = express();

app.listen(3000, function () {
  console.log("Express server listening on port 3000");
});

app.get("/", async (req, res) => {
  try {
    const steamIds = req.query.steamid;
    if (!steamIds) {
      return res.status(400).send("Missing steamid query parameter");
    }

    const promises = steamIds.map((steamUserID) =>
      getUserOwnedGames(steamUserID),
    );
    const responses = await Promise.all(promises);
    let commonGames = await findCommonGames(responses);
    res.send(commonGames);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

export async function getUserOwnedGames(steamUserID) {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamUserID}&format=json&include_appinfo=true&include_played_free_games=true`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return console.log("Error:", error);
  }
}

export async function findCommonGames(...userGames) {
  try {
    let games = userGames[0];
    let allGames = games[0].response.games.concat(games[1].response.games);
    let duplicateGames = [];

    let appidMap = new Map();

    allGames.forEach((game) => {
      const appid = game.appid;
      if (appidMap.has(appid)) {
        duplicateGames.push(game);
      } else {
        appidMap.set(appid, true);
      }
    });

    return duplicateGames;
  } catch (error) {
    console.error(error);
    return console.log("Error:", error);
  }
}

export const handler = serverless(app);
