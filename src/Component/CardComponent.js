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
import { light } from "@mui/material/styles/createPalette";
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
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Delete card"
          onClick={(event) => deleteCurrentTask(index, columnId)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="Edit"
          onClick={(event) => handleEditOpen(index, columnId)}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default CardComponent;
