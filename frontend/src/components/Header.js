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
                <Link
                  to="/admin-panel/all-products"
                  className="whitespace-nowrap block hover:bg-slate-100 p-2"
                  onClick={() => setMenuDisplay(false)}
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Cart Icon */}
      <Link to="/cart" className="text-2xl relative">
        <FaShoppingCart />
        {context?.cartProductCount > 0 && (
          <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
            <p className="text-sm">{context?.cartProductCount}</p>
          </div>
        )}
      </Link>

      {/* Logout Button */}
      <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
        Logout
      </button>
    </>
  ) : (
    <Link to="/login" className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
  )}
</div>
