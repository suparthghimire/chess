import { useEffect, useState } from "react";

import Board from "../models/Board";
import Cell from "../models/Cell";
import { COLORS } from "../utils/Constants";
import Piece from "./Piece";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export default function BoardComponent({
  board,
  setGameOver,
}: {
  board: Board;
  setGameOver: Function;
}) {
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);
  const [state, setState] = useState(false);
  const [sounds, setSounds] = useState({
    move: new Audio("/assets/sounds/move.mp3"),
    capture: new Audio("/assets/sounds/capture.mp3"),
    check: new Audio("/assets/sounds/check.mp3"),
    castle: new Audio("/assets/sounds/castle.mp3"),
  });
  useEffect(() => {
    if (board.game.gameOverStatus) {
      setGameOver(true);
    } else setGameOver(false);
  }, [state]);
  return !board ? (
    <div>Loading...</div>
  ) : (
    <div ref={parent} className="grid w-[600px] grid-rows-8 grid-cols-8">
      {board.board.map((rank: Cell[], x) => {
        return rank.map((cell: Cell, y) => {
          const color = cell.color === COLORS.WHITE ? "#EBECD0" : "#769556";
          const cellStyle = function () {
            if (cell.validSq)
              return {
                background: "#D6C407",
                border: "1px solid #2a2a2a",
              };
            else if (cell.activeSq && cell.piece !== null)
              return {
                background: "#D6A707",
                border: "1px solid #2a2a2a",
              };
            else if (cell.validSq)
              return {
                background: "pink",
                border: "1px solid #2a2a2a",
              };
            else if (cell.checkSq)
              return {
                background: "red",
                border: "1px solid #2a2a2a",
              };
            else return { background: color };
          };
          return (
            <div
              key={x + y}
              className={`w-[75px] h-[75px] text-black font-bold relative overflow-hidden ${
                cell.piece !== null && "cursor-grab hover:opacity-80"
              }`}
              style={{
                borderCollapse: "collapse",
                ...cellStyle(),
              }}
              onMouseDown={() => {
                board.PieceClick(cell, board.turn);
                setState(!state);
                if (board.sound.capture) sounds.capture.play();
                else if (board.sound.check) sounds.check.play();
                else if (board.sound.castle) sounds.castle.play();
                else if (board.sound.move) sounds.move.play();
              }}
            >
              {/* <div className="absolute">
                {x}, {y}
              </div> */}
              <div className="w-[100%] h-[100%] overflow-hidden">
                <Piece sprite={cell.piece?.sprite} />
              </div>
            </div>
          );
        });
      })}
    </div>
  );
}
