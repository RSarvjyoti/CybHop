import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LogOut, Home, Wallet, PieChart, Settings, User } from "lucide-react";
import { logout } from "../../features/auth/authSlice";
import BarChartComponent from "../BarChartComponent";
import UserGroup from "../UserGroup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-black text-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user?.email || "Samantha"}</h3>
              <p className="text-sm text-gray-400">samantha@email.com</p>
            </div>
          </div>
          <nav>
            <a className="flex items-center px-6 py-3 text-gray-400 hover:text-white">
              <Home className="w-5 h-5 mr-3" /> Dashboard
            </a>
            <a className="flex items-center px-6 py-3 text-white bg-gray-800 rounded-md">
              <PieChart className="w-5 h-5 mr-3" /> Expenses
            </a>
            <a className="flex items-center px-6 py-3 text-gray-400 hover:text-white">
              <Wallet className="w-5 h-5 mr-3" /> Wallets
            </a>
            <a className="flex items-center px-6 py-3 text-gray-400 hover:text-white">
              <User className="w-5 h-5 mr-3" /> Accounts
            </a>
            <a className="flex items-center px-6 py-3 text-gray-400 hover:text-white">
              <Settings className="w-5 h-5 mr-3" /> Settings
            </a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-400 hover:text-white"
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>

      <div className="flex-1 p-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            <p className="text-gray-500 mb-6">01 - 25 March, 2020</p>
          </div>
          <UserGroup />
        </div>
        {/* Bar */}
        <BarChartComponent />

        <div className="bg-white shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Today</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div>
                  <h3 className="font-semibold">Grocery</h3>
                  <p className="text-gray-500 text-sm">
                    5:12 pm - Belanja di pasar
                  </p>
                </div>
              </div>
              <p className="text-red-500">-326.800</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
                <div>
                  <h3 className="font-semibold">Transportation</h3>
                  <p className="text-gray-500 text-sm">Naik bus umum</p>
                </div>
              </div>
              <p className="text-red-500">-15.000</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Monday, 23 March 2020</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div>
                  <h3 className="font-semibold">Grocery</h3>
                  <p className="text-gray-500 text-sm">
                    5:12 pm - Belanja di pasar
                  </p>
                </div>
              </div>
              <p className="text-red-500">-326.800</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
                <div>
                  <h3 className="font-semibold">Transportation</h3>
                  <p className="text-gray-500 text-sm">Naik bus umum</p>
                </div>
              </div>
              <p className="text-red-500">-15.000</p>
            </div>
          </div>
        </div>
      </div>

      <aside className="w-1/4 p-6 bg-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Where your money go?</h2>
        {[
          "Food and Drinks",
          "Shopping",
          "Housing",
          "Transportation",
          "Vehicle",
        ].map((category, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between text-gray-700">
              <span>{category}</span>
              <span className="font-semibold">
                {Math.floor(Math.random() * 1500)}.00
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div className="h-2 bg-green-500 rounded-full w-3/4"></div>
            </div>
          </div>
        ))}
        <div className="bg-gray-100 p-4 mt-6 rounded-lg text-center">
          <p className="text-sm text-gray-600">Save more money</p>
          <button className="mt-2 bg-black text-white py-2 px-4 rounded">
            VIEW TIPS
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
