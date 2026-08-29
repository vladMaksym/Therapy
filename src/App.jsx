import { useGame } from "./context/GameContext";
import Start from "./pages/Start";
import Reading from "./pages/Reading";
import RedFlag from "./pages/RedFlag";
import Alternative from "./pages/Alternative";
import Judgment from "./pages/Judgment";
import Final from "./pages/Final";
import Discussion from "./pages/Discussion";

function App() {
  const { stage } = useGame();

  switch (stage) {
    case 0:
      return <Start />;

    case 1:
      return <Reading />;

    case 2:
      return <RedFlag />;

    case 3:
      return <Alternative />;

    case 4:
      return <Judgment />;

    case 5:
      return <Final />;

    case 6:
      return <Discussion />;

    default:
      return <Start />;
  }
}

export default App;