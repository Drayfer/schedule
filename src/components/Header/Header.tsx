import React from 'react';
import Notifications from '../Notifications/Notifications';
import Language from './Language';

const Header = () => {
  return (
    // <div className="h-1 bg-slate-100 sticky top-0 left-0 w-full z-50">
    //   123 fjkdhfdkf jdkfjh dkfh kdfh dkfjh dkjfh
    // </div>
    <div className="h-10 w-full bg-slate-100 absolute top-0 left-0 z-40">
      <Notifications />
      <Language />
    </div>
  );
};

export default Header;
