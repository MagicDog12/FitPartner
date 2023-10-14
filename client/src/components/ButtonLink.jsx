import { Link } from 'react-router-dom';

export const ButtonLink = ({ to, children, tailwind }) => {
  return <Link to={to}><button className={tailwind} >{children}</button></Link>;
};