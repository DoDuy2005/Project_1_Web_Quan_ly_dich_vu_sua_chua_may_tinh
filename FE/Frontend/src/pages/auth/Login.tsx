import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginApi({
                email,
                password,
            });

            // Lưu JWT
            localStorage.setItem("token", data.token);

            // Lưu thông tin user
            localStorage.setItem(
                "user",
                JSON.stringify(data)
            );

            // Chuyển trang theo role
            if (data.role === "CUSTOMER") {
                navigate("/customer");
            } else if (data.role === "EMPLOYEE") {
                navigate("/employee");
            } else if (data.role === "MANAGER") {
                navigate("/manager");
            } else {
                navigate("/");
            }
        } catch (error: any) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Email hoặc mật khẩu không chính xác."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Đăng nhập</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        placeholder="Nhập email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Mật khẩu
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                {error && (
                    <p>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Đang đăng nhập..."
                        : "Đăng nhập"}
                </button>
            </form>

            <p>
                Chưa có tài khoản?{" "}
                <Link to="/register">
                    Đăng ký
                </Link>
            </p>
        </div>
    );
}

export default Login;