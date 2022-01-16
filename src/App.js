import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatDate from "./Component/FormatDate";
import Header from "./Component/Header";
import Button from "@mui/material/Button";
import ModalComponent from "./Component/ModalComponent";
import Card from "./Component/CardComponent";
//
// import { useDispatch } from "react-redux";
// import { cardActions } from "./store/card-slice";

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

const itemsFromBackend = [
  { id: uuidv4(), title: "1 task", content: "First task", date: new Date() },
  { id: uuidv4(), title: "2 task", content: "Second task", date: new Date() },
];

const columnFromBackend = {
  [uuidv4()]: { name: "Unscheduled", items: itemsFromBackend },
  [uuidv4()]: { name: "Todo", items: [] },
  [uuidv4()]: { name: "In progress", items: [] },
  [uuidv4()]: { name: "Done", items: [] },
};
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const SourceCopiedItems = [...sourceColumn.items];
    const [SourceRemoved] = SourceCopiedItems.splice(source.index, 1);
    const destColumn = columns[destination.droppableId];
    const destCopiedItems = [...destColumn.items];
    destCopiedItems.splice(destination.index, 0, SourceRemoved);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: SourceCopiedItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destCopiedItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    console.log(copiedItems);
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnFromBackend);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contents, setContents] = useState("");
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [currentColumn, setCurrentColumn] = useState();
  const [date, setDate] = useState(new Date());

  const handleOpen = () => {
    setOpen(true);
    // setCurrentColumn(column);
    // setCurrentId(id);
  };
  const handleClose = () => setOpen(false);
  // const titleInputEvent = event => {
  //   setTitle(event.target.value);
  // };
  // const contentInputEvent = event => {
  //   setContent(event.target.value);
  // };
  const addNewTask = (column, id) => {
    column.items.push({
      id: uuidv4(),
      title: "7 task",
      content: "fourth task",
    });
    setColumns({
      ...columns,
      [id]: {
        ...column,
      },
    });

    console.log(column);
  };

  const addNewTaskToUnSchedule = () => {
    let unScheduledId, unScheduledColumn;
    [unScheduledId, unScheduledColumn] = Object.entries(columns)[0];
    unScheduledColumn.items.push({
      id: uuidv4(),
      title: title,
      content: contents,
      date: date,
    });
    console.log(unScheduledColumn);
    setColumns({
      ...columns,
      [unScheduledId]: {
        ...unScheduledColumn,
      },
    });
  };

  console.log({ title, contents, date });
  console.log(columns);
  return (
    <>
      <ModalComponent
        open={open}
        handleClose={handleClose}
        date={date}
        setDate={setDate}
        title={title}
        setTitle={setTitle}
        contents={setContents}
        setContents={setContents}
        addNewTaskToUnSchedule={addNewTaskToUnSchedule}
        // titleInputEvent={titleInputEvent}
        // contentInputEvent={contentInputEvent}
      ></ModalComponent>
      <Header handleOpen={() => handleOpen()} />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h2>
                  {column.name}

                  {/* <Button onClick={() => handleOpen()} variant="contained">
                    add new task
                  </Button> */}
                </h2>

                <div style={{ margin: "8px" }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#1c78c362"
                              : "#39a8db72",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      key={item.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 8,
                                        margin: "0 0 4px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#ac8cb133"
                                          : "#a9a9a933",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <Card
                                        title={item.title}
                                        date={formatDate(item.date)}
                                        content={item.content}
                                        id={item.id}
                                        
                                      />
                                      {/* Title: {item.title}
                                      <p> Content: {item.content}</p>
                                      <p>Deadline: {formatDate(item.date)}</p> */}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
