import { useAppSelector } from '../../hooks/redux';
import Schedule from '../Schedule/Schedule';
import Students from '../Students/Students';
// import Students from '../Students/Students';

const MainBoard = () => {
  const { activeBoard } = useAppSelector((state) => ({
    activeBoard: state.options.activeBoard
  }));

  switch (activeBoard) {
    case 'schedule':
      return <Schedule />;
    case 'students':
      return <Students />;
    default:
      return <>Loading...</>;
  }
};

export default MainBoard;
// return <Students />;
