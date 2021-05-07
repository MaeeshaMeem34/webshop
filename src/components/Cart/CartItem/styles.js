import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    card:{
        width:"90%",
        margin:"20px"
       

    },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));