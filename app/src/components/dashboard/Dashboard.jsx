import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Illustration from "../../assets/Illustration.png";
import Group from "../../assets/Group.png";
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
import { useEffect, useState } from "react";
import { fetchPokemon } from "../../services/api";

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
  const [pokemon, setPokemon] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const getPokemon = async () => {
      const data = await fetchPokemon(4);
      console.log(data);
      setPokemon(data);
    };
    getPokemon();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - Collapses to top on mobile */}
      <div className="w-full lg:w-64 bg-black text-white p-4 lg:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{user?.email || "Samantha"}</h3>
              <p className="text-sm text-gray-400">samantha@email.com</p>
            </div>
          </div>
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
            <a className="flex items-center px-4 lg:px-6 py-3 text-gray-400 hover:text-white whitespace-nowrap">
              Dashboard
            </a>
            <a className="flex items-center px-4 lg:px-6 py-3 text-white bg-gray-800 rounded-md whitespace-nowrap">
              Expenses
            </a>
            <a className="flex items-center px-4 lg:px-6 py-3 text-gray-400 hover:text-white whitespace-nowrap">
              Wallets
            </a>
            <a className="flex items-center px-4 lg:px-6 py-3 text-gray-400 hover:text-white whitespace-nowrap">
              Summary
            </a>
            <a className="flex items-center px-4 lg:px-6 py-3 text-gray-400 hover:text-white whitespace-nowrap">
              Accounts
            </a>
            <a className="flex items-center px-4 lg:px-6 py-3 text-gray-400 hover:text-white whitespace-nowrap">
              Settings
            </a>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="hidden lg:flex items-center text-gray-400 hover:text-white mt-4"
        >
          <LogOut className="w-5 h-5 mr-3" /> Logout
        </button>
      </div>
  
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">Expenses</h1>
            <p className="text-gray-500 mb-4 lg:mb-6">01 - 25 March, 2020</p>
          </div>
          <UserGroup />
        </div>
  
        {/* Bar Chart */}
        <div className="mb-6">
          <BarChartComponent />
        </div>
  
        {/* Transactions List */}
        <div className="bg-white shadow-lg p-4 lg:p-6 rounded-lg mb-6 lg:mb-0">
          <h2 className="text-lg lg:text-xl font-semibold mb-4">Today</h2>
          <div className="space-y-4">
            {pokemon.map((p, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 lg:p-4 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src={p.sprites.front_default}
                      alt={p.name}
                      className="w-full h-full object-cover transform scale-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold capitalize text-sm lg:text-base">{p.name}</h3>
                    <p className="text-gray-500 text-xs lg:text-sm">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - Base XP: {p.base_experience}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium text-sm lg:text-base">#{p.id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Right Sidebar */}
      <aside className="w-full lg:w-1/4 p-4 lg:p-6 bg-white shadow-lg">
        <h2 className="text-lg lg:text-xl font-semibold mb-4">Where your money go?</h2>
        {[
          "Food and Drinks",
          "Shopping",
          "Housing",
          "Transportation",
          "Vehicle",
        ].map((category, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between p-2 lg:p-3 text-gray-700">
              <span className="text-sm lg:text-base">{category}</span>
              <span className="font-semibold text-sm lg:text-base">
                {Math.floor(Math.random() * 1500)}.00
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full mt-1">
              <div className="h-1.5 bg-green-500 rounded-full w-1/4"></div>
            </div>
          </div>
        ))}
        
        <div className="bg-gray-100 p-4 lg:p-10 mt-6 rounded-lg relative">
          <div className="flex gap-4 lg:gap-20 justify-between mb-4">
            <img src={Illustration} alt="" className="w-1/2 object-contain" />
            <img src={Group} alt="" className="w-1/2 object-contain" />
          </div>
          <h4 className="text-sm lg:text-base font-medium">Save more money</h4>
          <p className="text-gray-600 text-xs lg:text-sm mt-2">
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
          </p>
          <button className="mt-4 bg-black text-white py-2 px-4 rounded text-sm lg:text-base w-full lg:w-auto">
            VIEW TIPS
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Dashboard;
