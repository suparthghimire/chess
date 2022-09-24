import { useEffect, useState } from "react";
import { AVAILABLE_FENS, START_POSITION } from "../utils/Constants";
import { toast } from "react-toastify";
function FenComponent({ updateFen }: { updateFen: Function }) {
  const [fenString, setFenString] = useState(START_POSITION);

  return (
    <div className="grid w-[320px]">
      <div className="p-5 bg-neutral-900 rounded-lg">
        <div>
          <h2 className="font-bold mb-3 text-lg">
            Set Board Position{" "}
            <a
              className="italic text-sm underline"
              href="https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation"
              target="_blank"
            >
              What is Fen?
            </a>
          </h2>

          <div>
            <label htmlFor="fen-text">Enter Fen String</label>
            <textarea
              rows={6}
              className={`resize-none  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-2`}
              name="fen-text"
              id="fen-text"
              value={fenString}
              onChange={(e) => setFenString(e.target.value)}
              placeholder="Enter Valid FEN String"
            />
          </div>
          <p>OR</p>
          <div>
            <label htmlFor="fen-select">Select From Available Games</label>
            <select
              name="fen-select"
              id="fen-select"
              value={fenString}
              onChange={(e) => setFenString(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none cursor-pointer"
            >
              {AVAILABLE_FENS.map((fen, idx) => {
                return (
                  <option value={fen} key={`fen-${idx}`}>
                    Fen {idx}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updateFen(fenString)}
              className="mt-3 w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Apply Fen
            </button>
            <button
              className="mt-3 w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setFenString(START_POSITION);
                updateFen(START_POSITION);
              }}
            >
              Reset Board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FenComponent;