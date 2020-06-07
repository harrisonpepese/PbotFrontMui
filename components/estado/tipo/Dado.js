import { Button, TextField } from "@material-ui/core"

export default (props) => {
    const {campo, state} = props;
    const save = (data) =>{
        state(data);
    }

    return(
        <TextField label="Campo" value={campo} onChange={e=>save(e.target.value)}></TextField>
    )
}