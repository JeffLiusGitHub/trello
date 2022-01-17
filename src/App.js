import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatDate from "./Component/FormatDate";
import Header from "./Component/Header";
import Button from "@mui/material/Button";
import ModalComponent from "./Component/ModalComponent";
import Card from "./Component/CardComponent";
import ModalEdit from "./Component/ModalEdit";
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
  { id: uuidv4(), title: "3 task", content: "third task", date: new Date() },
  { id: uuidv4(), title: "4 task", content: "fourth task", date: new Date() },
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
  const [editOpen, setEditOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const [index,setIndex] = useState();
  const[columnId,setColumnId]=useState();
  const [currentColumn, setCurrentColumn] = useState({});
  const [date, setDate] = useState(new Date());

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditOpen = (index,columnId) => {
    setIndex(index);
    setColumnId(columnId);
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const editCurrentTask = (index,columnId)=>{
    const { [columnId]: columnValue } = columns;
    const { name, items } = columnValue;
    items[index]={
      title: title,
      content: contents,
      date: date,
    }
    let newColumns = { ...columns };
    newColumns[columnId] = { name: name, items: items };
    setColumns(newColumns);
    handleEditClose()
  }

  const deleteCurrentTask = (index, columnId) => {
    const { [columnId]: columnValue } = columns;
    const { name, items } = columnValue;
    items.splice(index, 1);
    let newColumns = { ...columns };
    newColumns[columnId] = { name: name, items: items };
    setColumns(newColumns);
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
    handleClose()
  };

  // console.log({ title, contents, date });
  // console.log(columns);
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
      ></ModalComponent>

<ModalEdit
        open={editOpen}
        handleClose={handleEditClose}
        date={date}
        setDate={setDate}
        title={title}
        setTitle={setTitle}
        contents={setContents}
        setContents={setContents}
        editCurrentTask={()=>editCurrentTask(index,columnId)}
      ></ModalEdit>
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

                  {/* <Button onClick={() => deleteCurrentTask()} variant="contained">
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
                            padding: 8,
                            margin: 3,
                            width: "18vw",
                            minHeight: 500,
                            height: "50vh",
                            overflow: "scroll",
                          }}
                        >
                          {/* {id} */}
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                id={id}
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
                                        index={index}
                                        columnId={id}
                                        deleteCurrentTask={deleteCurrentTask}
                                        handleEditOpen={handleEditOpen}
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
