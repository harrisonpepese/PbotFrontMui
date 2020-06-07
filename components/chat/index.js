import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import api from "../../services/api";
import MessageContent from "../message";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: "center",
    padding: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    background: "#009688",
  },
  content: {
    height: "60vh",
    overflow: "auto",
  },
  inputTexto: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Variants() {
  const classes = useStyles();
  const [chat, setChat] = useState({ _id: null });
  const [texto, setTexto] = useState(null);

  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };
  const iniciarChat = async () => {
    const { data } = await api.post("converse/helloworld");
    if (data) {
      setChat(data);
      console.log(data);
    }
  };

  const conversar = async () => {
    const { data } = await api.post(`converse/helloworld/${chat._id}`, { text: texto });
    if (data) {
      setChat(data);
      console.log(data);
    }
    setTexto("");
  };

  return (
    <Card>
      <CardHeader title="Chat Demo" className={classes.title} />
      <CardContent className={classes.content}>
        {chat._id ? (
          chat.messages.map((m) => (
            <MessageContent text={m.text} enviadoPelo={m.isFrom} />
          ))
        ) : (
          <div />
        )}
      </CardContent>
      <CardActions className={classes.inputTexto}>
        <TextField
          id="outlined-basic"
          label="Nova mensagem"
          variant="outlined"
          fullWidth
          value={texto}
          onChange={handleTextChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={chat._id ? conversar : iniciarChat}
        >
          Enviar
        </Button>
      </CardActions>
    </Card>
  );
}
