/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NavItem = ({ title, path, children, activeItem, onItemClicked }) => {
  const isActive = path === activeItem;
  const handleClick = () => {
    onItemClicked(path);
  };
  return (
    <li onClick={handleClick}>
      <Link
        to={path}
        className={`flex items-center p-2 mx-3 rtl:pl-20 ltr:pr-10 mb-1 text-[#3e4740] rounded-lg transition duration-300 hover:text-black focus:text-black hover:bg-primary focus:bg-primary ${isActive ? "bg-primary text-black" : ""}`}
      >
        {children}
        <span className="flex-1 ms-3 whitespace-nowrap text-lg">{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
