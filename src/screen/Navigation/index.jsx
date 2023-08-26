import { Link, Outlet } from "react-router-dom"


export const Navigation =  () =>{
return (
    <div>
    <nav className="flex justify-end pr-4 md:pr-16 pt-5 bg-gradient-to-r from-blue-500 to-green-500 h-16">
      <ul className="flex space-x-7 text-lg font-bold text-white">
        <li className="hover:text-gray-500">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-gray-500"><Link to="/books">Books</Link></li>
        <li className="hover:text-gray-500"><Link to="/signin">Sign in</Link></li>
      </ul>
    </nav>
    <Outlet />

  </div>
)
}