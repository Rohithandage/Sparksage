import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q");
  const [search, setSearch] = useState(searchQuery || "");

  useEffect(() => {
    setSearch(searchQuery || "");
  }, [searchQuery]);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      setMenuDisplay(false); // Close menu on logout
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value.trim()) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <Link to="/">
          <Logo w={150} h={150} />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* Right Section: User, Cart, Logout */}
        <div className="flex items-center gap-7">
          {user?._id ? (
            <>
              {/* User Avatar & Menu */}
              <div className="relative flex justify-center">
                <div className="text-3xl cursor-pointer" onClick={() => setMenuDisplay((prev) => !prev)}>
                  {user?.profilePic ? (
                    <img src={user.profilePic} className="w-10 h-10 rounded-full" alt={user.name} />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
                {menuDisplay && (
                  <div className="absolute right-0 bg-white top-12 h-fit p-2 shadow-lg rounded">
                    <nav>
                      {user?.role === ROLE.ADMIN && (
                        <Link to="/admin-panel/all-products" className="whitespace-nowrap block hover:bg-slate-100 p-2">
                          Admin Panel
                        </Link>
                      )}
                    </nav>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="text-2xl relative">
                <FaShoppingCart />
                {context?.cartProductCount > 0 && (
                  <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>

              {/* Logout */}
              <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
