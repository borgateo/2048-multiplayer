import Board from "./components/board";
import Restart from "./components/restart";
import Score from "./components/score";
import GameProvider from "./context/game-context";

function App(): JSX.Element {
  return (
    <GameProvider>
      <Score />
      <Restart />
      <Board />
    </GameProvider>
  );
}

export default App;
