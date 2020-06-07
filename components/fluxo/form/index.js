import { useState } from "react";
import api from "../../../services/api";
import { useRouter } from "next/router";
import { TextField, Button } from "@material-ui/core";
import SeletorEstado from '../SeletorEstado'

export default (props) => {
    const router = useRouter();
    const { fluxo = {} } = props;
    const [nome, setNome] = useState();
    const [textoInicial, settextoInicial] = useState();
    const [textoFinal, settextoFinal] = useState();
    const [estadoInicial, setestadoInicial] = useState();

    const save = () => {
        if (!nome && !textoInicial && !textoFinal) return;
        if (fluxo._id) {
            api.put(`flux/${fluxo._id}`, {
                nome,
                textoInicial,
                textoFinal,
                estadoInicial
            }).then(() => {
                router.back()
            })
        } else {
            api.post('flux', {
                nome,
                textoInicial,
                textoFinal,
            }).then(() => {
                router.back()
            })
        }
    }
    return (
        <div>
            <form>
                <div>
                    <TextField label="Nome" onChange={e => setNome(e.target.value)} />
                </div>
                <div>
                    <TextField label="Texto Inicial" row={3} multiline onChange={e => settextoInicial(e.target.value)} />
                    <TextField label="Texto Final" row={3} multiline onChange={e => settextoFinal(e.target.value)} />
                </div>
                {fluxo._id && fluxo.estados ?
                    (<div>
                        <SeletorEstado text="Estado Inicial" 
                        estados={fluxo.estados} 
                        value={estadoInicial}
                        state={setestadoInicial}
                        />
                    </div>) :
                    (<div />)
                }
            </form>
            <Button onClick={e => save()}>Salvar</Button>
        </div>
    )
}