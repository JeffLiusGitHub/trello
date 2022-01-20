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
  index,
  columnId,
  deleteCurrentTask,
  handleEditOpen,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [invisible, setInvisible] = useState(null);
  useEffect(() => {
    setInvisible(Date.parse(formatDate(date)) < Date.parse(formatDate(new Date())));
    // console.log(date)
    // console.log(formatDate(date))
    //  console.log(Date.parse(date) < Date.parse(formatDate(new Date())))
  }, [date]);
 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Badge
            color="error"
            variant="standard"
            invisible={!invisible}
            sx={{ height: "5px", width: "5px" }}
            badgeContent={
              <CalendarTodayIcon sx={{ height: "15px", width: "10px" }} />
            }
          >
            <Avatar alt="Jeff, cool designer" src={image} overlap="circular" />
          </Badge>
        }
        title={title}
        subheader={formatDate(date)}
        titleTypographyProps={{
          align: "right",
          fontSize: { xs:"30px",sm: "13px", md: "16px", lg: "30px" },
          fontWeight: 400,
        }}
        subheaderTypographyProps={{
          align: "right",
          fontSize: { xs:'20px',sm: "8px", md: "9px", lg: "18px" },
          fontWeight: 200,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 0.5,
          
          mt:{xs:2.5,sm:3,md:1,lg:1},
          mr:2,
          mb:2,
          ml:1,
          borderRadius: 0,
        }}
      >
        <Stack spacing={{xs:3,sm:0.3, md: 0.7, lg: 1.6 }} direction="row">
          <Fab
            sx={{
              color: "white",
              background: " #3587cba1",
              height: { xs:'3px',md: "8px", lg: "40px" },
              width: { xs:'36px',md: "34px", lg: "40px" },
            }}
            aria-label="Delete card"
            color="primary"
            size="medium"
            onClick={(event) => deleteCurrentTask(index, columnId)}
          >
            <DeleteIcon />
          </Fab>

          <Fab
            sx={{
              color: "white",
              background: "#3d3dedac",
              // margin:'4px',
              // marginBotton:'10px',
              height: { xs:'3px', md: "8px", lg: "40px" },
              width: { xs:'36px',md: "34px", lg: "40px" },
            }}
            aria-label="Edit"
            color="primary"
            size="medium"
            onClick={(event) => handleEditOpen(index, columnId)}
          >
            <EditIcon />
          </Fab>
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
              fontFamily:"sans-serif",
              fontSize: { md: "20px",sm:"15px",xs:'18px'},
              fontWeight:300,
              tableLayout: "fixed",
              wordWrap: "break-word",
              textAlign: "justify",
              textJustify: "inter-ideograph",
              textIndent:'50px'
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
