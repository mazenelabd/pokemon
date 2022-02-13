import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import { Button, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import StatsCard from "./components/StatsCard";
import LoopingText from "./components/LoopingText";
import CircleCard from "./components/CircleCard";

const API_BASE = "https://pokeapi.co/api/v2/";

const App = () => {
  const [collected, setCollected] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [specieColor, setSpecieColor] = useState("");
  const newIdGenerator = () => {
    const randomId = Math.floor(Math.random() * 898 + 1);
    if (collected.every((item) => item !== randomId)) {
      setCollected([...collected, randomId]);
      return randomId;
    } else {
      newIdGenerator();
    }
  };
  const generateNewPokemon = () => {
    axios
      .get(`${API_BASE}pokemon/${newIdGenerator()}`)
      .then((res) => {
        setPokemon(res.data);
        axios.get(res.data.species.url).then((response) => {
          setSpecieColor(response.data.color.name);
          setLoaded(true);
          setError(false);
          console.log(res);
          console.log(collected);
        });
      })
      .catch((err) => {
        setError(true);
        setLoaded(true);
        console.log(err);
      });
  };
  useEffect(() => {
    generateNewPokemon();
  }, []);
  return (
    <>
      {!loaded ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        !error && (
          <Grid container justifyContent="space-around">
            <LoopingText title={pokemon.name} bgColor={specieColor} />
            <Grid item mt={3}>
              <Box sx={{ maxHeight: "443px", maxWidth: "443px", display: "flex" }}>
                <CardMedia component="img" image={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
                <Box ml={-9} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                  <CircleCard value={pokemon.height / 10} unit="m" />
                  <CircleCard value={pokemon.weight / 10} unit="kg" />
                </Box>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#969696",
                  textTransform: "capitalize",
                  textAlign: "center",
                  fontSize: "52px",
                }}
              >
                {pokemon.name}
              </Typography>
              <Button
                onClick={generateNewPokemon}
                sx={{ my: 3.9, mx: "auto", display: "block", backgroundColor: "#F0F0F0", borderRadius: "69px" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src="pokemon-cropped.svg" alt="pokemon icon" width="75px" height="75px" />
                  <Typography
                    variant="span"
                    sx={{
                      fontSize: "2rem",
                      fontWeight: "bold",
                      color: "#222224",
                      textTransform: "uppercase",
                      mx: 5,
                    }}
                  >
                    gotcha!
                  </Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item mt={13}>
              <Grid container rowSpacing={10} sx={{ ml: 9, flexWrap: "wrap" }}>
                <StatsCard title={pokemon.stats[0].base_stat} value="Hp" />
                <StatsCard title={pokemon.stats[4].base_stat} value="Special Defense" />
                <StatsCard title={pokemon.stats[3].base_stat} value="Sepcial Attack" />
                <StatsCard title={pokemon.stats[2].base_stat} value="Defense" />
                <StatsCard title={pokemon.stats[1].base_stat} value="Attack" />
                <StatsCard title={pokemon.stats[5].base_stat} value="Speed" />
              </Grid>
            </Grid>
            <LoopingText title={pokemon.name} bgColor={specieColor} />
          </Grid>
        )
      )}
    </>
  );
};

export default App;
