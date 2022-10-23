import React from 'react';
import Notifications from '../Notifications/Notifications';
import CornerButtons from '../Schedule/CornerButtons';
import Guide from './Guide';
import Language from './Language';

const Header = () => {
  return (
    <div className="h-10 w-full bg-slate-100 absolute top-0 left-0 z-[50]">
      <CornerButtons />
      <Guide />
      <Notifications />
      <Language />
    </div>
  );
};

export default Header;
