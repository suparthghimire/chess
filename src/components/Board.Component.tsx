import { CSSProperties, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Board from "../models/Board";
import Cell from "../models/Cell";
import { COLORS } from "../utils/Constants";
import Piece from "./Piece";

export default function BoardComponent({ board }: { board: Board }) {
  const [state, setState] = useState(false);
  return !board ? (
    <div>Loading...</div>
  ) : (
    <DragDropContext onDragEnd={(dropData) => board.PieceDragEnd(dropData)}>
      <div className="grid w-[600px] grid-rows-8 grid-cols-8">
        {board.board.map((rank: Cell[], x) => {
          return rank.map((cell: Cell, y) => {
            const color = cell.color === COLORS.WHITE ? "#EBECD0" : "#769556";
            return (
              <Droppable
                droppableId={`${cell.location.x}-${cell.location.y}`}
                key={`${cell.location.x}-${cell.location.y}`}
              >
                {(provided, snapshot) => {
                  const cellStyle = function () {
                    if (cell.validSq)
                      return {
                        background: "#D6C407",
                        border: "2px solid #2a2a2a",
                      };
                    else if (cell.activeSq && cell.piece !== null)
                      return {
                        background: "#D6A707",
                        border: "2px solid #2a2a2a",
                      };
                    else if (snapshot.isDraggingOver && cell.validSq)
                      return {
                        background: "pink",
                        border: "2px solid #2a2a2a",
                      };
                    else if (cell.checkSq)
                      return {
                        background: "red",
                        border: "2px solid #2a2a2a",
                      };
                    else return { background: color };
                  };
                  return (
                    <div
                      className={`w-[75px] h-[75px] text-black font-bold relative overflow-hidden ${
                        cell.piece !== null && "cursor-grab hover:opacity-80"
                      }`}
                      style={{
                        borderCollapse: "collapse",
                        ...cellStyle(),
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      onMouseDown={() => {
                        board.PieceClick(cell);
                        setState(!state);
                      }}
                    >
                      <div className="absolute">
                        {x}, {y}
                      </div>
                      <Draggable
                        draggableId={`${cell.location.x}-${cell.location.y}`}
                        index={cell.location.x * 8 + cell.location.y}
                        key={`${cell.location.x}-${cell.location.y}`}
                      >
                        {(provided) => (
                          <div
                            className="w-[100%] h-[100%] overflow-hidden"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Piece sprite={cell.piece?.sprite} />
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          });
        })}
      </div>
    </DragDropContext>
  );
}