import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import EstadoForm from "../../../../components/estado/form";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../../../services/api";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EstadoPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [fluxo, setFluxo] = useState();

  const loadFluxo = () => {
    api.get(`flux/${id}`).then((res) => {
      setFluxo(res.data);
    }).catch();
  };

  useEffect(loadFluxo, [id]);

  return (<div>
    {fluxo? <EstadoForm Fluxo={fluxo}/>:<p/>}
  </div>)
}
