import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setActiveBoard } from '../../store/reducers/OptionsSlice';

const Reminder = () => {
  const { billing, lang } = useAppSelector((state) => ({
    billing: state.options.billing,
    lang: state.options.lang?.price
  }));
  const dispatch = useAppDispatch();

  const showDemoNotice = billing?.demo && !billing.paidDays;
  const showExpireNotice =
    !billing?.demo &&
    billing?.paidDays &&
    billing?.paidDays > 0 &&
    billing?.paidDays <= 3;

  return (
    <>
      {showDemoNotice && (
        <div className="fixed z-[1000] flex bottom-11 w-full bg-red-400/20 px-2 text-red-700 tablet:bottom-0">
          {lang[35]} {billing?.demoDays} {lang[36]}.
          <button
            className="bg-sky-400 text-white px-2 ml-2"
            onClick={() => dispatch(setActiveBoard('settings'))}
          >
            {lang[32]}
          </button>
        </div>
      )}

      {showExpireNotice && (
        <div className="fixed z-[1000] flex bottom-11 w-full bg-yellow-300/20 px-2 text-yellow-800 tablet:bottom-0">
          {lang[45]} {billing.paidDays} {lang[36]}.
          <button
            className="bg-sky-400 text-white px-2 ml-2"
            onClick={() => dispatch(setActiveBoard('settings'))}
          >
            {lang[32]}
          </button>
        </div>
      )}
    </>
  );
};

export default Reminder;
