import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ReplayIcon from "@material-ui/icons/Replay";
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
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: "#fff"
  },
  content: {
    height: "60vh",
    overflow: "auto",
  },
  inputTexto: {
    display: "flex",
    justifyContent: "space-between",
  },
  flex:{
    flexGrow:1,
  }
}));

export default function Variants() {
  const classes = useStyles();
  const [chat, setChat] = useState({ _id: null });
  const [texto, setTexto] = useState(null);
  const [sending, setSending] = useState(false);
  const messageEndRef = React.useRef(null)
  const scroll = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const handleTextChange = (e) => {
    setTexto(e.target.value);
  };

  const iniciarChat = async () => {
    const { data } = await api.post("converse/helloworld");
    if (data) {
      setChat(data);
    }
  };
  const inputCheck = () => {
    return (!chat._id || sending || chat.isClosed)
  }
  const conversar = () => {
    setSending(true);
    api.post(`converse/helloworld/${chat._id}`, { text: texto })
      .then(res => {
        if (res.data) {
          setChat(res.data);
          setTexto("");
          setSending(false);
          scroll()
        }
      })
  }

  return (
    <Card>
      <CardHeader 
      title="Pbot Demo - UI" 
      className={classes.title} 
      action={
        chat.isClosed?<IconButton onClick={iniciarChat}>
          <ReplayIcon/>
        </IconButton>:<div/>
      }/>
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
        <div ref={messageEndRef} />
      </CardContent>
      <CardActions className={classes.inputTexto}>
        <TextField
          id="outlined-basic"
          label="Nova mensagem"
          variant="outlined"
          fullWidth
          autoFocus
          value={texto}
          disabled={inputCheck()}
          onChange={handleTextChange}
          onKeyPress={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`);
            if (ev.key === 'Enter') {
              conversar()
              ev.preventDefault();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          endIcon={<SendIcon />}
          disabled={inputCheck()}
          onClick={conversar}
        >
          Enviar
        </Button>
      </CardActions>
    </Card>
  );
}
