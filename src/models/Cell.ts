import Board from "./Board";
import Piece from "./Piece";

export default class Cell {
  constructor(
    private m_row: number,
    private m_col: number,
    public Piece: Piece | null,
    private m_marked: boolean = false,
    private m_validCellMark: boolean = false,
    private m_checkCellMark: boolean = false
  ) {}
  public static NotOutOfBounds(row: number, col: number) {
    const NotOutOfBounds = row >= 0 && row <= 7 && col >= 0 && col <= 7;
    return {
      outOfBounds: NotOutOfBounds,
      hasPiece: false,
      oppositeColor: false,
    };
  }
  public static IsValidCell(
    board: Cell[][],
    currColor: string,
    row: number,
    col: number
  ) {
    if (!Cell.NotOutOfBounds(row, col))
      return {
        outOfBounds: true,
        hasPiece: false,
        oppositeColor: false,
      };
    const piece = board[col][row].Piece;
    if (piece === null) {
      return { outOfBounds: false, hasPiece: false, oppositeColor: false };
    } else {
      // if opposite color is seen
      if (piece.GetColor() !== currColor) {
        return { outOfBounds: false, hasPiece: true, oppositeColor: true };
      }
      return { outOfBounds: false, hasPiece: true, oppositeColor: false };
    }
  }
  public GetRow() {
    return this.m_row;
  }
  public GetCol() {
    return this.m_col;
  }
  public GetValidCellMark() {
    return this.m_validCellMark;
  }
  public SetValidCellMark(status: boolean) {
    console.log(status);
    this.m_validCellMark = status;
  }
  public SetCheckCellMark(status: boolean) {
    this.m_checkCellMark = status;
  }
  public GetCheckCellMark() {
    return this.m_checkCellMark;
  }
  public SetMarked(status: boolean) {
    this.m_marked = status;
  }
  public GetMarked() {
    return this.m_marked;
  }
}
