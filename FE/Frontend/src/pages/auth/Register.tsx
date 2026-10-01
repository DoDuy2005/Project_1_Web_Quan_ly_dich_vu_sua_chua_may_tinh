import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../api/authApi";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);

        try {
            await registerApi(form);

            alert("Đăng ký tài khoản thành công.");

            navigate("/login");
        } catch (error: any) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Đăng ký thất bại."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Đăng ký</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ và tên</label>

                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Nhập họ và tên"
                        required
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Nhập email"
                        required
                    />
                </div>

                <div>
                    <label>Số điện thoại</label>

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại"
                        required
                    />
                </div>

                <div>
                    <label>Địa chỉ</label>

                    <input
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ"
                        required
                    />
                </div>

                <div>
                    <label>Mật khẩu</label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                <div>
                    <label>Xác nhận mật khẩu</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Nhập lại mật khẩu"
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
                        ? "Đang đăng ký..."
                        : "Đăng ký"}
                </button>
            </form>

            <p>
                Đã có tài khoản?{" "}
                <Link to="/login">
                    Đăng nhập
                </Link>
            </p>
        </div>
    );
}

export default Register;