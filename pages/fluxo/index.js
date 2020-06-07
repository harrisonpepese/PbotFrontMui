import {
  Paper,
  TextField,
  ListItemSecondaryAction,
  Button,
  List,
  ListItem,
  Typography,
  ListItemText,
} from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));
export default () => {
  const classes = useStyles();
  const [fluxos, setFluxos] = useState([]);
  const Load = () => {
    api
      .get("flux")
      .then((res) => {
        setFluxos(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(Load, []);

  return (
    <div>
      <List>
        <ListItem id="header">
          <TextField label="Busca" variant="outlined" />
          <ListItemSecondaryAction>
            <Button
              edge="end"
              variant="contained"
              color="secondary"
              size="large"
            >
              Novo
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        {fluxos.map((f) => (
          <ListItem id={f._id} button>
            <Link href={`/fluxo/${f._id}`}>
              <ListItemText primary="helloworld"></ListItemText>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
