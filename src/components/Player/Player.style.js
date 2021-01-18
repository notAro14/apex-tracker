import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  header: {
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    '& .MuiCardHeader-action': {
      marginTop: 'auto',
      marginBottom: 'auto',
    },
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 350,
    marginBottom: theme.spacing(4),
  },
  content: {
    height: 200,
    overflow: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  grid: {
    flexGrow: 1,
  },
}));

export default useStyles;
