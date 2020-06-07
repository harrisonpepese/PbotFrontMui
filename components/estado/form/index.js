import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import Dado from '../tipo/Dado'
import Opcoes from '../tipo/Opcoes'
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/router'
import api from "../../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EstadoPage(props) {
  const { Fluxo, estado = {} } = props;
  const router = useRouter();
  const classes = useStyles();
  const [nome, setNome] = useState(estado.name);
  const [estados] = useState(Fluxo.states || [])
  const [textoInicial, setTextoInicial] = useState(estado.text || null);
  const [textoFalha, setTextoFalha] = useState(estado.tryFailText || null);
  const [Tipo, setTipo] = useState(estado.type || '');
  const [tipoEntrada, setTipoEntrada] = useState(estado.inputType || '');
  const [proximoEstado, setProximoEstado] = useState(
    estado.nextState || null
  );
  const [maxTryes,setMaxTryes] = useState(estado.maxTryes || 1);
  const [estadoFalha, setEstadoFalha] = useState(estado.erroState || null);
  const [campo, setCampo] = useState(estado.field);
  const [opcoes, setOpcoes] = useState(estado.options || []);
  const Submit = () => {
    if (estado._id) {
      api
        .put(`flux/${Fluxo._id}/state/${estado._id}`, {
          name:nome,
          text:textoInicial,
          tryFailText:textoFalha,
          type: Tipo,
          inputType:tipoEntrada,
          nextState:proximoEstado,
          erroState:estadoFalha,
          field:campo,
          options:opcoes,
          maxTryes
        })
        .then((res) => {
          router.back()
        });
    } else {
      api
        .post(`flux/${Fluxo._id}/state`, {
          name:nome,
          text:textoInicial,
          tryFailText:textoFalha,
          type: Tipo,
          inputType:tipoEntrada,
          nextState:proximoEstado,
          erroState:estadoFalha,
          field:campo,
          options:opcoes,
          maxTryes
        })
        .then((res) => {
          router.back()
        });
    }
  };
  const tipoSwitch = (tipo) => {
    switch (tipo) {
      case 'validation':
      case 'input':
        return (
          <Dado campo={campo} state={setCampo}/>
        )
      case 'question':
        return (
          <Opcoes opcoes={opcoes} state={updateopcao} estados={estados} />
        )
      case 'integracao':
        break;
    }
  }

  const updateopcao = (opcao) => {
    setOpcoes(opcao);
  }
  return (
    <form>
      <div className={classes.root}>
        <TextField label="Nome" value={nome}
          onChange={(e) => setNome(e.target.value)}></TextField>
        <FormControl>
          <InputLabel>Tipo Entrada</InputLabel>
          <Select
            value={tipoEntrada}
            onChange={(e) => setTipoEntrada(e.target.value)}
          > 
          <MenuItem value='any'>qualquer</MenuItem>
            <MenuItem value='text'>texto</MenuItem>
            <MenuItem value='number'>numero</MenuItem>
            <MenuItem value='phone'>telefone</MenuItem>
            <MenuItem value='email'>email</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <TextField
          label="texto inicial"
          multiline
          rows={3}
          value={textoInicial}
          onChange={(e) => setTextoInicial(e.target.value)}
        ></TextField>
        <TextField
          label="texto falha"
          multiline
          rows={3}
          value={textoFalha}
          onChange={(e) => setTextoFalha(e.target.value)}
        ></TextField>
      </div>
      <div className={classes.root}>
        <FormControl>
          <InputLabel>Proximo Estado</InputLabel>
          <Select
            value={proximoEstado}
            onChange={(e) => setProximoEstado(e.target.value)}
          >
            <MenuItem value={null}>nenhum</MenuItem>
            {estados.map((e) => (
              <MenuItem value={e._id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Estado Falha</InputLabel>
          <Select
            value={estadoFalha}
            onChange={(e) => setEstadoFalha(e.target.value)}
          >
            <MenuItem value={null}>nenhum</MenuItem>
            {estados.map((e) => (
              <MenuItem value={e._id}>{e.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl>
          <InputLabel>Tipo Estado</InputLabel>
          <Select value={Tipo} onChange={(e) => setTipo(e.target.value)}>
            <MenuItem value={"info"}>info</MenuItem>
            <MenuItem value={"input"}>dado</MenuItem>
            <MenuItem value={"question"}>pergunta</MenuItem>
            <MenuItem value={"validation"}>validação</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Tentativas" type="number" value={maxTryes} onChange={e=>setMaxTryes(e.target.value)}></TextField>
      </div>
      <div>
        {tipoSwitch(Tipo)}
      </div>
      <div>
        <Button onClick={Submit}>{estado._id ? 'Salvar' : 'Criar'}</Button>
      </div>
    </form>
  );
}
