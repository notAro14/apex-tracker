import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@material-ui/core';
import useStyles from './SearchForm.style';

const SearchForm = ({ onSubmit }) => {
  const { paper, form } = useStyles();
  const [formState, setFormState] = useState({
    platform: 'psn',
    gamertag: '',
  });
  const { platform, gamertag } = formState;
  const onChange = evt => {
    setFormState({ ...formState, [evt.target.name]: evt.target.value });
  };

  return (
    <Paper className={paper} elevation={3}>
      <form className={form} onSubmit={onSubmit}>
        <FormControl>
          <InputLabel id="platform-label">Plateforme de jeu</InputLabel>
          <Select
            labelId="platform-label"
            id="platform"
            name="platform"
            value={platform}
            onChange={onChange}
          >
            <MenuItem value="psn">Playstation</MenuItem>
            <MenuItem value="xbl">Xbox</MenuItem>
            <MenuItem value="origin">PC</MenuItem>
          </Select>
        </FormControl>
        <TextField
          required
          id="gamertag"
          name="gamertag"
          label="Gamertag ou Id"
          value={gamertag}
          onChange={onChange}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={!platform || !gamertag}
        >
          Chercher
        </Button>
      </form>
    </Paper>
  );
};

export default SearchForm;
