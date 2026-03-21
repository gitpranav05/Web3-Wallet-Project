import MainLayout from "./ui/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="dark:bg-black dark:text-white text-black bg-white h-screen ">
      <Toaster position="bottom-right" />
      <MainLayout />
    </div>
  );
}

export default App;
