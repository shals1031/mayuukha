import './App.css';
import { Route, Routes } from 'react-router-dom';
import UniNavbar from './components/uninavbar';
import Home from './components/home';  // Your Home component
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import Products from './components/products';


function App() {
    return (
        <div style={{ marginLeft: '5%', marginTop: '5%', marginRight: '5%' }}>
            {/* UniNavbar should appear on all pages */}
            <UniNavbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products containername="" foldername="" />} />
                <Route path="*" element={<Home />} />
            </Routes>

        </div>
    );
}

export default App;