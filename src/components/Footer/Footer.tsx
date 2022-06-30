import React from 'react';
import FooterMenu from '../SidebarMenu/FooterMenu';

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="-bottom-1 border-t-1 h-12 fixed left-0 w-full z-50 border-slate-700 tablet:hidden">
      <FooterMenu />
    </div>
  );
};

export default Footer;
