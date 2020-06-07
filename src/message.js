import { Box, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    maxWidth:{
      xs:'30vw',
    }
  },
  left:{
    textAlign:'left'
  },
  right:{
    textAlign:'right'
  }
}));
export default (props) => {
  const { text, enviadoPelo } = props;
  const classes = useStyles();
  const displayText = () => {
    const data = text.replace(/[\n\r]/g, '#').split('#')
    return data.map(element => (<Typography>{element}</Typography>));
  }
  const direction = (enviadoPelo) => {
    if (enviadoPelo == 'bot') {
      return "row";
    }
    return "row-reverse";
  };
  return (
    <Grid container direction={direction(enviadoPelo)}>
      <Grid item className={enviadoPelo == 'bot'?classes.left:classes.right}>
        <Paper className={classes.paper}>
          {displayText()}
        </Paper>
      </Grid>
    </Grid>
  );
};
