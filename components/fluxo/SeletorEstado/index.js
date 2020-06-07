import { useState } from "react";

export default (props) =>{
    const { text, estados,value, state} = props;
    return(
        <FormControl>
          <InputLabel>{text}</InputLabel>
          <Select
            value={value}
            onChange={(e) => state(e.target.value)}
          >
            <MenuItem value={null}>nenhum</MenuItem>
            {estados.map((e) => (
              <MenuItem value={e._id}>{e.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
    )
}