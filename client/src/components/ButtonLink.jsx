import { Link } from 'react-router-dom';

export const ButtonLink = ({ to, children }) => {
  return <Link to={to}><button>{children}</button></Link>;
};