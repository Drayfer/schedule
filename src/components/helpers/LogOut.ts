import { useAppDispatch } from './../../hooks/redux';
import { resetDiscipline } from '../../store/reducers/DisciplineSlice';
import { resetLesson } from '../../store/reducers/LessonSlice';
import { resetOpions } from '../../store/reducers/OptionsSlice';
import { resetStudent } from '../../store/reducers/StudentSlice';
import { resetUser } from '../../store/reducers/UserSlice';

export const useLogOut = () => {
  const dispatch = useAppDispatch();
  const logOut = () => {
    dispatch(resetUser());
    dispatch(resetStudent());
    dispatch(resetLesson());
    dispatch(resetDiscipline());
    dispatch(resetOpions());
    if (window.navigator.userAgent.toLowerCase().includes('wv')) {
      window.ReactNativeWebView.postMessage('exit');
    }
  };

  return logOut;
};
