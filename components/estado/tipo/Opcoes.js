import { Button, IconButton, ListItemText, TextField, ListItemSecondaryAction, ListItem, FormControl, List, MenuItem, ListSubheader, InputLabel, Select } from "@material-ui/core"
import { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete"

export default (props) => {
  const { opcoes, state, estados, intents } = props;
  const [input, setInput] = useState('');
  const statecopy = () => {
    return opcoes.slice(0)
  }
  const adicionarNovo = () => {
    const o = statecopy();
    o.push({
      text: '',
      validAnswers: [],
      state: undefined,
      validIntent: undefined
    })
    console.log(o)
    save(o)
  }
  const proximoEstado = (index, data) => {
    const o = statecopy();
    o[index].state = data;
    save(o);
  }
  const textoOpcao = (index, data) => {
    const o = statecopy();
    o[index].text = data;
    save(o);
  }
  const addRespostaValida = (index, texto) => {
    const o = statecopy(0);
    o[index].validAnswers.push(texto)
    save(o);
    setInput('');
  }
  const removeRespostaValida = (index, data) => {
    const o = statecopy();
    o[index].validAnswers.splice(data, 1)
    save(o);
  }
  const intencao = (index, data) => {
    const o = statecopy();
    o[index].validIntent = data;
    save(o);
  }
  const save = (o) => {
    state(o)
  }
  return (
    <div>
      <Button onClick={e => adicionarNovo()}>adicionar</Button>
      {
        opcoes.map((o, i) => (
          <div key={i}>
            <div>
              <TextField multiline label="Texto" value={o.text} rows={3} onChange={(e) => textoOpcao(i, e.target.value)} />
            </div>
            <div>
              <FormControl>
                <InputLabel>Proximo Estado</InputLabel>
                <Select
                  value={o.state}
                  onChange={(e) => proximoEstado(i, e.target.value)}
                >
                  <MenuItem value={null}>nenhum</MenuItem>
                  {estados.map((e) => (
                    <MenuItem value={e._id}>{e.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {intents ?
                <FormControl>
                  <InputLabel>intenção</InputLabel>
                  <Select
                    value={o.validIntent}
                    onChange={(e) => intencao(i, e.target.value)}
                  >
                    <MenuItem value={null}>nenhum</MenuItem>
                    {intents.map((e) => (
                      <MenuItem value={e._id}>{e.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                :
                <div />}
            </div>
            <div>
              <List subheader={
                <ListSubheader>Respostas Validas</ListSubheader>
              }>
                <ListItem>
                  <TextField value={input} label="texto" onChange={e => setInput(e.target.value)} />
                  <ListItemSecondaryAction>
                    <Button onClick={e => addRespostaValida(i, input)}>Criar</Button>
                  </ListItemSecondaryAction>
                </ListItem>
                {
                  o.validAnswers.map((r, y) => (
                    <ListItem>
                      <ListItemText>
                        {r}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton onClick={e => removeRespostaValida(i, y)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                }
              </List>
            </div>
          </div>
        ))
      }
    </div>
  )
}