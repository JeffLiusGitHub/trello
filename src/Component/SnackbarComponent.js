import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackbarsComponent = ({deleteOpen,setDeleteOpen,message,severity}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setDeleteOpen(false)
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={deleteOpen}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <MuiAlert severity={severity} sx={{ width: '100%',height:'100%',color:'white', fontSize:'20px',borderRadius:'10px',backgroundColor:'#2a9d8f'}}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
export default SnackbarsComponent;
