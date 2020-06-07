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
import api from "../services/api";
import MessageContent from "../src/message";

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
  const [sending, setSending] = useState(false);

  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };
  const iniciarChat = async () => {
    const { data } = await api.post("converse/helloworld");
    if (data) {
      setChat(data);
    }
  };

  const conversar = () => {
    setSending(true);
    api.post(`converse/helloworld/${chat._id}`, { text: texto })
      .then(res=>{
        if(res.data){
          setChat(res.data);
          setTexto("");
          setSending(false);
        }
      })
    }

  return (
    <Card>
      <CardHeader title="Chat Bot Demo" className={classes.title} />
      <CardContent className={classes.content}>
        {chat._id ? (
          chat.messages.map((m) => (
            <MessageContent text={m.text} enviadoPelo={m.isFrom} />
          ))
        ) : (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Button variant="contained"
                color="primary"
                size="large"
                onClick={iniciarChat}
                >
                Iniciar conversa
                </Button>
            </div>
          )}
      </CardContent>
      <CardActions className={classes.inputTexto}>
        <TextField
          id="outlined-basic"
          label="Nova mensagem"
          variant="outlined"
          fullWidth
          value={texto}
          disabled = {!chat._id || sending }
          onChange={handleTextChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          endIcon={<SendIcon />}
          disabled={!chat._id || sending }
          onClick={conversar}
        >
          Enviar
        </Button>
      </CardActions>
    </Card>
  );
}
