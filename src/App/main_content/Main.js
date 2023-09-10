import React from "react";
import "../css/App.css";
import "./css/MainContent.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.primary,
    background:
      "rgba(0, 54, 102, 0.16)" /* Brighter blue with the same transparency */,
  },
  image: {
    width: "100%",
    height: "auto",
    maxWidth: 400,
  },
  heading: {
    color: "#f39200", // University color
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Top Section */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom className={classes.heading}>
              Welcome to the MakeCode Extension Development Tool
            </Typography>
            <img
              className={classes.image}
              src="pictures/makecode_logo.png" // Replace with the actual file path
              alt="MakeCode Logo"
              style={{ width: "150px", margin: "1em auto" }}
            />
          </Paper>
        </Grid>

        {/* Description and References */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Bachelor Thesis
            </Typography>
            <Typography variant="h4" gutterBottom>
              Design and Implementation of a MakeCode Extension Development Tool
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              Description of Bachelor Thesis
            </Typography>
            <Typography variant="body1">
              The Microsoft Programming eXperience Toolkit (Microsoft PXT) is an
              open-source project that empowers beginners to create
              special-purpose, interactive, and engaging programming experiences
              using Static TypeScript. My Bachelor's thesis, conducted at the
              University of Innsbruck, focuses on extending the Microsoft
              MakeCode framework, based on Microsoft PXT, by adding custom
              blocks to existing MakeCode targets. This includes developing
              MakeCode extensions like pxt-micro:bit. Given the limitations of
              Microsoft's official MakeCode documentation for defining
              additional blocks, my thesis aims to provide a comprehensive and
              concise MakeCode extension development tool capable of
              auto-generating custom block annotations.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              References
            </Typography>
            <ul>
              <li>
                <a href="https://github.com/Microsoft/pxt">
                  Microsoft Programming eXperience Toolkit (Microsoft PXT)
                </a>
              </li>
              <li>
                <a href="https://github.com/microsoft/pxt-microbit">
                  pxt-micro:bit
                </a>
              </li>
              <li>
                <a href="https://makecode.com/defining-blocks">
                  MakeCode Documentation - Defining Blocks
                </a>
              </li>
            </ul>
          </Paper>
        </Grid>

        {/* About Me and Bachelor Thesis */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              About Me
            </Typography>
            <Typography variant="body1">
  Jonas Tscholl
  <br />
  <a href="mailto:jonas.tscholl@student.uibk.ac.at">jonas.tscholl@student.uibk.ac.at</a>
  <br />
  Matrikel NR.: 12026027
</Typography>

          </Paper>
        </Grid>

        {/* Footer */}
        <Grid item xs={12}>
          <div className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
              &copy; {new Date().getFullYear()} University of Innsbruck
              <br />
              MakeCode Extension Development Tool
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
