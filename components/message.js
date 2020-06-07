import { Box, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    width: "20vw",
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
}));
export default (props) => {
  const { text, enviadoPelo } = props;
  console.log(props)
  const classes = useStyles();
  const direction = (enviadoPelo) => {
    if (enviadoPelo == 'bot') {
      return "row";
    }
    return "row-reverse";
  };
  return (
    <Box display="flex" flexDirection={direction(enviadoPelo)}>
      <Box>
        <Paper className={classes.paper}>
          <Typography>
              {text}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};
