import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/customer"
                    element={
                        <h1>
                            Customer Dashboard
                        </h1>
                    }
                />

                <Route
                    path="/employee"
                    element={
                        <h1>
                            Employee Dashboard
                        </h1>
                    }
                />

                <Route
                    path="/manager"
                    element={
                        <h1>
                            Manager Dashboard
                        </h1>
                    }
                />

                <Route
                    path="*"
                    element={
                        <h1>
                            404 - Không tìm thấy trang
                        </h1>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;