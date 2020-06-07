import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Link } from "next/link";
import api from "../../../services/api";
import {
  Typography,
  ListSubheader,
  List,
  ListItem,
  Paper,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";

export default () => {
  const router = useRouter();
  const { id } = router.query;
  const [fluxo, setFluxo] = useState({ states: [] });
  const Load = () => {
    api
      .get(`flux/${id}`)
      .then((res) => setFluxo(res.data))
      .catch((e) => e);
  };
  const criarEstado = () => {
    router.push(`/fluxo/${id}/estado`)
  }
  const editarEstado = (idEstado) => {
    router.push(`/fluxo/${id}/estado/${idEstado}`)
  }
  useEffect(Load, [id]);
  return (
    <div>
      <Typography variant="h5">{fluxo.nome}</Typography>
      <Typography>{fluxo.textoInicial}</Typography>
      <Typography>{fluxo.textoFalha}</Typography>
      <Typography>{fluxo.estadoInicial}</Typography>
      <Paper elevation={2}>
        <List subheader={
          <ListSubheader>Estados
            <Button onClick={e => criarEstado()}>Criar</Button>
          </ListSubheader>
        }>
          {fluxo.states.length ? fluxo.states.map((e) => (
            <ListItem button key={e._id} onClick={event => editarEstado(e._id)}>
              <ListItemText>{e.name}</ListItemText>
              <ListItemSecondaryAction>
                <Button>editar</Button>
              </ListItemSecondaryAction>
            </ListItem>
          )) : <div />}
        </List>
      </Paper>
    </div>
  );
};
