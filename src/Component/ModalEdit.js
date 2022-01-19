import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  
  width: {xs:"80%",md:400},
  bgcolor: "background.paper",
  border: "2px solid rgba(61, 61, 237, 0.249)",
  boxShadow: 24,
  borderRadius:'5px',
  p: 4,
};
const ModalEdit = ({
  open,
  handleEditClose,
  editCurrentTask,
  date,
  setDate,
  title,
  setTitle,
  contents,
  setContents,
   titleIsInvalid,
  contentIsInvalid,
}) => {

  return (
    <Modal
      open={open}
      onClose={handleEditClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Edit the exist card
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 ,mb:2}}>
          please modify title content and deadline of the card
        </Typography>
        <Stack spacing={3}>
          <TextField
            id="outlined-required"
            required='true'
            label="Title"
            size="normal"
            error={titleIsInvalid}            
            helperText={titleIsInvalid?"title cannot be empty":null}           
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <TextField
            id="outlined-required"
            required='true'
            label="Content"
            multiline
            rows={5}
            size="normal"
            placeholder='set content here'
            error={contentIsInvalid}            
            helperText={contentIsInvalid?"content cannot be empty":null}
            value={contents.toString()}
            onChange={(event) => {setContents(event.target.value)}}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Deadline"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            m: 1,
            borderRadius: 0,
          }}
        >
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => editCurrentTask()}>
              confirm
            </Button>
            <Button variant="outlined" onClick={() => handleEditClose()}>
              cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};
export default ModalEdit;
