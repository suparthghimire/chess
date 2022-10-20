import { useEffect, useState } from "react";

import Board from "../models/Board";
import Cell from "../models/Cell";
import { COLORS, Flip, START_POSITION } from "../utils/Constants";
import Piece from "./Piece";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useGame } from "../hooks/GameContext";
import PromotionMenuComponent from "./PromotionMenuComponent";
import ModalComponent from "./Modal";
import { Pawn } from "../models/Piece";
import { TPiece } from "../@types";
export default function BoardComponent() {
  const { board, gameOver } = useGame();
  const { setFen, setGameOver } = useGame();
  const [state, setState] = useState(false);
  const [cell, setCell] = useState<Cell>();
  const [modelOpen, setModalOpen] = useState<boolean>(false);

  function PlaySound() {
    if (board.sound.checkmate) sounds.checkmate.play();
    else if (board.sound.draw) sounds.draw.play();
    else if (board.sound.check) sounds.check.play();
    else if (board.sound.castle) sounds.castle.play();
    else if (board.sound.capture) sounds.capture.play();
    else if (board.sound.move) sounds.move.play();
  }

  useEffect(() => {
    setModalOpen(
      (cell &&
        cell.piece &&
        cell.piece instanceof Pawn &&
        cell.piece.promotion) ||
        false
    );
  }, [
    cell && cell.piece && cell.piece instanceof Pawn && cell.piece.promotion,
  ]);
  useEffect(() => {
    setFen(board.fen || START_POSITION);
    setGameOver(board.game.gameOverInfo);
  }, [state]);

  const [sounds, setSounds] = useState({
    move: new Audio("/assets/sounds/move.mp3"),
    capture: new Audio("/assets/sounds/capture.mp3"),
    check: new Audio("/assets/sounds/check.mp3"),
    castle: new Audio("/assets/sounds/castle.mp3"),
    checkmate: new Audio("/assets/sounds/checkmate.mp3"),
    draw: new Audio("/assets/sounds/draw.mp3"),
  });

  return !board ? (
    <p>Loading</p>
  ) : (
    <div className="w-screen px-5 relative">
      <div
        style={{
          margin: "0 auto",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gridTemplateRows: "auto",
          maxWidth: "650px",
        }}
      >
        {board.board.map((rank: Cell[], x: number) => {
          return rank.map((cell: Cell, y) => {
            const cellColorClass =
              cell.color === COLORS.WHITE ? "white-cell" : "black-cell";
            const cellClass = function () {
              if (cell.validSq) return "valid-cell";
              else if (cell.activeSq && cell.piece !== null)
                return "active-cell";
              else if (cell.checkSq) return "check-cell";
              else {
                if (cell.color === COLORS.WHITE) return "white-cell";
                else return "black-cell";
              }
            };

            return (
              <div
                key={x + y}
                className={`pt-[100%] text-black font-bold relative overflow-hidden ${
                  cell.piece !== null && "cursor-grab hover:opacity-80"
                } ${cellColorClass} ${cellClass()}`}
                onMouseDown={() => {
                  if (!gameOver.status) {
                    board.PieceClick(cell, board.turn);
                    PlaySound();
                    setCell(cell);
                    setState(!state);
                  }
                }}
              >
                {/* <div className="absolute top-0 left-0">
                  {x}, {y}
                </div> */}
                <Piece sprite={cell.piece?.sprite} />
              </div>
            );
          });
        })}
        {cell &&
          cell.piece &&
          cell.piece instanceof Pawn &&
          cell.piece.promotion === true && (
            <ModalComponent setOpen={() => {}} openStatus={modelOpen}>
              <PromotionMenuComponent
                callBack={() => {
                  (cell.piece as Pawn).promotion = false;
                  PlaySound();
                  setState(!state);
                  // setModalOpen(false);
                }}
                cell={cell}
                pieceColor={cell.piece.color}
              />
            </ModalComponent>
          )}
      </div>
      {/* {board.currPiece.piece && ( */}

      {/* )} */}
    </div>
  );
}
