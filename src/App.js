import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import ModalComponent from "./Component/ModalComponent";

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const itemsFromBackend = [
  { id: uuidv4(), title: "1 task", content: "First task" },
  { id: uuidv4(), title: "2 task", content: "Second task" },
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
  // console.log(result);
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    // console.log({ sourceColumn });
    const SourceCopiedItems = [...sourceColumn.items];
    // console.log(SourceCopiedItems);
    const [SourceRemoved] = SourceCopiedItems.splice(source.index, 1);
    // console.log(SourceRemoved);
    // console.log(SourceCopiedItems);
    const destColumn = columns[destination.droppableId];
    // console.log({ destColumn });
    const destCopiedItems = [...destColumn.items];
    // console.log({ destCopiedItems });
    destCopiedItems.splice(destination.index, 0, SourceRemoved);
    // console.log({ destCopiedItems });
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
    // console.log(columns);
    const column = columns[source.droppableId];
    // console.log(column);
    const copiedItems = [...column.items];
    console.log(copiedItems);
    const [removed] = copiedItems.splice(source.index, 1);
    // console.log(removed);
    copiedItems.splice(destination.index, 0, removed);

    // console.log(column);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
    // console.log(columns);
  }
};

function App() {
  const [columns, setColumns] = useState(columnFromBackend);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    console.log(columns);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
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

                <ModalComponent
                open={open}
                handleClose={handleClose}
                addNewTask={addNewTask.bind(null,column, id)}
                column = {column}
               
                id={id}
              ></ModalComponent>
              <h2>
                {column.name}
                <Button onClick={handleOpen} variant="contained">
                  add new task
                </Button>
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
                            ? "lightblue"
                            : "lightgrey",
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
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                    <p>{item.title}</p>
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
  );
}

export default App;
