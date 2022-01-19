import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import image from "../image/avatar.jpg";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import formatDate from "./FormatDate";

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
  const [invisible, setInvisible] = useState(true);
  useEffect(() => {
    setInvisible(Date.parse(date) < Date.parse(formatDate(new Date())));
  },[date]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        // avatar={ <Badge color="error" variant="dot"invisible={!invisible}>
        //     <Avatar alt="cool designer Jeff" src={image} overlap="circular"/>
        //     </Badge>
        //     }
        avatar={
          <Badge
            color="error"
            variant="standard"
            invisible={!invisible}
            sx={{height:'5px',width:'5px'}}
            badgeContent={<CalendarTodayIcon sx={{height:'15px',width:'10px'}}/>}
          >
            <Avatar alt="Jeff, cool designer" src={image} overlap="circular" />
          </Badge>
        }
        title={title}
        subheader={date}
        titleTypographyProps={{
          align: "right",
          fontSize: { sm: "30px", md: "16px", lg: "30px" },
          fontWeight: 400,
        }}
        subheaderTypographyProps={{
          align: "right",
          fontSize: { sm: "30px", md: "9px", lg: "18px" },
          fontWeight: 200,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 0.5,
          m: 0.5,
          borderRadius: 0,
        }}
      >
        <Stack spacing={{ md: -1.5, lg: 1.6 }} direction="row">
          <IconButton
            aria-label="Delete card"
            color="primary"
            size="medium"
            onClick={(event) => deleteCurrentTask(index, columnId)}
          >
            <Fab
              sx={{
                color: "white",
                background: " #3587cba1",
                height: { md: "8px", lg: "40px" },
                width: { md: "34px", lg: "40px" },
              }}
              size="small"
              aria-label="add"
            >
              <DeleteIcon />
            </Fab>
          </IconButton>
          <IconButton
            aria-label="Edit"
            color="primary"
            size="medium"
            onClick={(event) => handleEditOpen(index, columnId)}
          >
            <Fab
              sx={{
                color: "white",
                background: "#3d3dedac",
                height: { md: "8px", lg: "40px" },
                width: { md: "34px", lg: "40px" },
              }}
              size="small"
              aria-label="add"
            >
              <EditIcon />
            </Fab>
          </IconButton>
        </Stack>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          size="large"
          sx={{
            height: "40px",
            width: "40px",
            marginRight: "10px",
            color: "#4a4e69",
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              fontSize: { md: "15px" },
              tableLayout: "fixed",
              wordWrap: "break-word",
              textAlign: "justify",
              textJustify: "inter-ideograph",
            }}
            color="text.secondary"
            fontWeight={400}
          >
            {content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default CardComponent;
