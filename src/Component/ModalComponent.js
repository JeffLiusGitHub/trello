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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalComponent = ({
  open,
  handleClose,
  addNewTaskToUnSchedule,
  date,
  setDate,
  title,
  setTitle,
  contents,
  setContents,
}) => {
  // console.log({column},{id})
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Set new card
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          please set title content and deadline of the card
        </Typography>
        <Stack spacing={3}>
          <TextField
            id="outlined-required"
            label="Title"
            size="normal"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          {/* <TextField
            id="outlined-required"
            label="test"
            multiline
            rows={5}
            size="normal"
            value={contents}
            onChange={(event) => setContents(event.target.value)}
          /> */}
          <TextField
            id="outlined-required"
            label="Content"
            multiline
            rows={5}
            size="normal"
            // value={contents}
            onChange={(event) => setContents(event.target.value)}
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

        <Button variant="contained" onClick={()=>addNewTaskToUnSchedule()}>
          confirm
        </Button>
      </Box>
    </Modal>
  );
};
export default ModalComponent;
