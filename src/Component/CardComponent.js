import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { lightBlue } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { light } from "@mui/material/styles/createPalette";
import Fab from '@mui/material/Fab';
import image from "../image/avatar.jpg";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardComponent = ({
  title,
  content,
  date,
  id,
  index,
  columnId,
  deleteCurrentTask,
  handleEditOpen,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardHeader
        avatar={<Avatar alt="cool designer Jeff" src={image} />}
        title={title}
        subheader={date}
        titleTypographyProps={{
          align: "right",
          fontSize: "30px",
          fontWeight: 400,
        }}
        subheaderTypographyProps={{
          align: "right",
          fontSize: "18px",
          fontWeight: 200,
        }}
      />

      <CardContent>
        <Typography variant="h5" color="text.secondary" fontWeight={400}>
          {content}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          m: 1,
          borderRadius: 0,
        }}
      >
        <Stack spacing={1.6} direction="row">
          <IconButton
            aria-label="Delete card"
            color="primary"
            size="large"
            // edge='end'
            onClick={(event) => deleteCurrentTask(index, columnId)}
          >
              <Fab sx={{color:'white',background:' #3587cba1'}}  size="small" aria-label="add">
                 <DeleteIcon />
                
              </Fab>
           
          </IconButton>
          <IconButton
            aria-label="Edit"
            color="primary"
            size="large"
            // edge='end'
            onClick={(event) => handleEditOpen(index, columnId)}
          >
              <Fab sx={{color:'white',background:'#3d3dedac'}} size="small" aria-label="add">
                 <EditIcon />
              </Fab>
           
          </IconButton>
        </Stack>
      </Box>
    </Card>
  );
};
export default CardComponent;
