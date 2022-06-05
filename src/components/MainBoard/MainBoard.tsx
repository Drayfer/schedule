import { useAppSelector } from '../../hooks/redux';
import Disciplines from '../Disciplines/Disciplines';
import Schedule from '../Schedule/Schedule';
import Settings from '../Settings/Settings';
import Statistics from '../Statistics/Statistics';
import Students from '../Students/Students';

const MainBoard = () => {
  const { activeBoard } = useAppSelector((state) => ({
    activeBoard: state.options.activeBoard
  }));

  switch (activeBoard) {
    case 'schedule':
      return <Schedule />;
    case 'students':
      return <Students />;
    case 'statistics':
      return <Statistics />;
    case 'settings':
      return <Settings />;
    case 'disciplines':
      return <Disciplines />;
    default:
      return <>Not Found...</>;
  }
};

export default MainBoard;
