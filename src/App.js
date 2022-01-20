import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatDate from "./Component/FormatDate";
import Header from "./Component/Header";
import ModalComponent from "./Component/ModalComponent";
import Card from "./Component/CardComponent";
import ModalEdit from "./Component/ModalEdit";
import classes from "./App.module.css";
import SnackbarsComponent from "./Component/SnackbarComponent";

const itemsFromBackend = [
  {
    id: uuidv4(),
    title: "Introduction",
    content: "This app is based on the react and material UI",
    date: new Date(),
  },
  {
    id: uuidv4(),
    title: "Manual",
    content:
      "User can add, delete and edit new task on the website. User can set title, content and date on each card. User can also drag and drop the card to the next section if you finish it. Have fun!!! ",
    date: new Date(),
  },

  {
    id: uuidv4(),
    title: "Deadline",
    content: "If a card is overdue, a badge will appear on the top left.",
    date: new Date(1577797200000),
  },
  {
    id: uuidv4(),
    title: "Hints",
    content: "Feel free to delete the existing card and add your own one!",
    date: new Date(),
  },
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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [index, setIndex] = useState();
  const [columnId, setColumnId] = useState();
  const [date, setDate] = useState(new Date());
  const [titleIsInvalid, setTitleIsInvalid] = useState(false);
  const [contentIsInvalid, setContentIsInvalid] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTitleIsInvalid(false);
    setContentIsInvalid(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditOpen = (index, columnId) => {
    const { [columnId]: columnValue } = columns;
    const { items } = columnValue;
    const { title, content, date } = items[index];
    setTitle(title);
    setContents(content);
    setDate(date);
    setIndex(index);
    setColumnId(columnId);
    setEditOpen(true);
    setTitleIsInvalid(false);
    setContentIsInvalid(false);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const editCurrentTask = (index, columnId) => {
    const { [columnId]: columnValue } = columns;
    const { name, items } = columnValue;
    const id = items[index].id;
    if (
      (title.toString().trim() === "" && contents.toString().trim() === "") ===
      false
    ) {
      items[index] = {
        id: id,
        title: title,
        content: contents,
        date: date,
      };
      let newColumns = { ...columns };
      newColumns[columnId] = { name: name, items: items };
      setColumns(newColumns);
      setTitle("");
      setContents("");
      setDate(new Date());
      handleEditClose();
    } else {
      setTitleIsInvalid(title.toString().trim() === "");
      setContentIsInvalid(contents.toString().trim() === "");
      return;
    }
  };

  const deleteCurrentTask = (index, columnId) => {
    const { [columnId]: columnValue } = columns;
    const { name, items } = columnValue;
    items.splice(index, 1);
    let newColumns = { ...columns };
    newColumns[columnId] = { name: name, items: items };
    setColumns(newColumns);
    setDeleteOpen(true);
  };

  const addNewTaskToUnSchedule = () => {
    let unScheduledId, unScheduledColumn;
    [unScheduledId, unScheduledColumn] = Object.entries(columns)[0];
    if (
      (title.toString().trim() === "" && contents.toString().trim() === "") ===
      false
    ) {
      unScheduledColumn.items.push({
        id: uuidv4(),
        title: title,
        content: contents,
        date: date,
      });
      setColumns({
        ...columns,
        [unScheduledId]: {
          ...unScheduledColumn,
        },
      });
      handleClose();
      setTitle("");
      setContents("");
      setDate(new Date());
    } else {
      setTitleIsInvalid(title.toString().trim() === "");
      setContentIsInvalid(contents.toString().trim() === "");
      return;
    }
  };

  return (
    <div className={classes.container}>
      <SnackbarsComponent
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        message={"Card already deleted!"}
        severity={"success"}
      />
      <ModalComponent
        titleIsInvalid={titleIsInvalid}
        contentIsInvalid={contentIsInvalid}
        open={open}
        handleClose={handleClose}
        date={date}
        setDate={setDate}
        title={title}
        setTitle={setTitle}
        contents={contents}
        setContents={setContents}
        addNewTaskToUnSchedule={addNewTaskToUnSchedule}
      ></ModalComponent>

      <ModalEdit
        open={editOpen}
        handleEditClose={handleEditClose}
        date={date}
        setDate={setDate}
        title={title}
        setTitle={setTitle}
        contents={contents}
        setContents={setContents}
        titleIsInvalid={titleIsInvalid}
        contentIsInvalid={contentIsInvalid}
        editCurrentTask={() => editCurrentTask(index, columnId)}
      ></ModalEdit>
      <Header handleOpen={() => handleOpen()} />
      <div className={classes.column}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className={classes.taskContainer}>
                <h1 className={classes.columnName}>{column.name}</h1>
                <div style={{ margin: "8px" }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          key={id}
                          className={classes.columnContainer}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#c4d2ffa7"
                              : "#1c78c362",
                          }}
                        >
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
                                      className={classes.cardContainer}
                                      key={item.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#5671c9a3"
                                          : "#ebf0ffa7",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <Card
                                        key={item.id}
                                        title={item.title}
                                        date={Date.parse(item.date)}
                                        content={item.content}
                                        id={item.id}
                                        index={index}
                                        columnId={id}
                                        deleteCurrentTask={deleteCurrentTask}
                                        handleEditOpen={handleEditOpen}
                                      />
                                      {/* </div> */}
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
    </div>
  );
}

export default App;
