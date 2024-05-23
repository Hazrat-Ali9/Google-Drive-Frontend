import { Outlet } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import DefaultFetch from './Components/DefaultFetch';
// import Swiper JS
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
  const { user } = useSelector(state => state.user)

  return (
    <div>
      <DefaultFetch />
      <Toaster />
      <Outlet />

    </div>
  );
};

export default App;