import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(4),
    maxWidth: 350,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: 200,
    },
  },
}));
