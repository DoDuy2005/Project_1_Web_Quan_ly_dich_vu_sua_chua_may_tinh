# README - Hướng dẫn cài môi trường làm việc với Backend

## 1. Thông tin môi trường Backend

Backend sử dụng:

-   Java Spring Boot
-   Spring Security
-   JWT
-   Spring Data JPA / Hibernate
-   MySQL
-   RESTful API
-   JSON

Backend chạy tại:

``` text
http://localhost:8080
```

Frontend chỉ gọi API của Backend.

Frontend **không kết nối trực tiếp tới MySQL**.

------------------------------------------------------------------------

# 2. Hai cách chạy Backend

## Cách 1 - Backend chạy trực tiếp trên máy

Ví dụ chạy project Backend bằng IntelliJ IDEA.

``` text
Frontend
   |
   | HTTP API
   ↓
Spring Boot
localhost:8080
   |
   ↓
MySQL
```

Frontend sử dụng:

``` env
VITE_API_URL=http://localhost:8080
```

------------------------------------------------------------------------

## Cách 2 - Backend chạy bằng Docker

Backend được chạy trong Docker:

``` text
Docker
├── backend
│     └── Spring Boot :8080
│
└── mysql
      └── MySQL :3306
```

Nếu Docker đã map:

``` text
8080:8080
```

thì Frontend chạy trực tiếp trên máy vẫn gọi:

``` env
VITE_API_URL=http://localhost:8080
```

Frontend không cần biết Backend đang chạy trong Docker.

Frontend cũng **không cần cài MySQL** để gọi API.

------------------------------------------------------------------------

# 3. Cấu trúc làm việc

``` text
ReactJS
   |
   | REST API / JSON
   ↓
Spring Boot
   |
   | JPA / Hibernate
   ↓
MySQL
```

Frontend không truy cập:

``` text
MySQL :3306
```

Frontend chỉ truy cập:

``` text
Backend :8080
```

------------------------------------------------------------------------

# 4. Đăng ký tài khoản Customer

API:

``` http
POST http://localhost:8080/api/auth/register
```

Body:

``` json
{
  "email": "khach01@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "fullName": "Tran Thi B",
  "phone": "0912345678",
  "address": "Ha Noi"
}
```

Tài khoản đăng ký này là tài khoản khách hàng.

Sau khi đăng ký thành công, Frontend có thể chuyển người dùng tới trang
Login.

------------------------------------------------------------------------

# 5. Đăng nhập

API:

``` http
POST http://localhost:8080/api/auth/login
```

Body:

``` json
{
  "email": "khach01@gmail.com",
  "password": "123456"
}
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
  "id": 1,
  "email": "khach01@gmail.com",
  "role": "CUSTOMER",
  "token": "eyJhbGciOi..."
}
```

Frontend cần lưu `token` để sử dụng khi gọi các API yêu cầu xác thực.

------------------------------------------------------------------------

# 6. Gửi JWT khi gọi API

Với API cần đăng nhập, gửi:

``` http
Authorization: Bearer <token>
```

Ví dụ:

``` javascript
const token = localStorage.getItem("token");

fetch("http://localhost:8080/api/customers", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

Nếu dùng Axios:

``` javascript
const token = localStorage.getItem("token");

axios.get("http://localhost:8080/api/customers", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

------------------------------------------------------------------------

# 7. Thêm tài khoản nhân viên

API:

``` http
POST http://localhost:8080/api/employees
```

Body:

``` json
{
  "employeeCode": "NV001",
  "fullName": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nv.a@shop.com",
  "password": "123456"
}
```

Dữ liệu này dùng để tạo nhân viên theo cấu trúc API Backend hiện tại.

------------------------------------------------------------------------

# 8. Thêm khách hàng

API:

``` http
POST http://localhost:8080/api/customers
```

Body:

``` json
{
  "customerCode": "KH000002",
  "fullName": "Nguyen Van C",
  "email": "khach02@gmail.com",
  "password": "123456",
  "phone": "0987654321",
  "address": "Da Nang"
}
```

Sau khi tạo thành công, khách hàng có thể xuất hiện trong:

``` http
GET http://localhost:8080/api/customers
```

------------------------------------------------------------------------

# 9. API Quản lý khách hàng

## Lấy danh sách

``` http
GET /api/customers
```

Đầy đủ:

``` text
GET http://localhost:8080/api/customers
```

## Tìm kiếm

``` http
GET /api/customers?keyword=Nguyen
```

Có thể tìm theo:

-   Họ tên
-   Số điện thoại
-   Email

## Lọc trạng thái

``` http
GET /api/customers?status=ACTIVE
```

Hoặc:

``` http
GET /api/customers?status=LOCKED
```

## Xem chi tiết

``` http
GET /api/customers/{id}
```

Ví dụ:

``` text
GET http://localhost:8080/api/customers/1
```

## Sửa

``` http
PUT /api/customers/{id}
```

## Khóa / mở khóa

``` http
PATCH /api/customers/{id}/status
```

------------------------------------------------------------------------

# 10. API Quản lý nhân viên

## Lấy danh sách

``` http
GET /api/employees
```

## Tìm kiếm

``` http
GET /api/employees?keyword=Nguyen
```

## Xem chi tiết

``` http
GET /api/employees/{id}
```

## Thêm

``` http
POST /api/employees
```

Body:

``` json
{
  "employeeCode": "NV001",
  "fullName": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nv.a@shop.com",
  "password": "123456"
}
```

## Sửa

``` http
PUT /api/employees/{id}
```

## Khóa / mở khóa

``` http
PATCH /api/employees/{id}/status
```

------------------------------------------------------------------------

# 11. Các Method Frontend cần dùng

## GET

Lấy dữ liệu:

``` javascript
fetch(`${API_URL}/api/customers`)
```

## POST

Thêm dữ liệu:

``` javascript
fetch(`${API_URL}/api/customers`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
```

## PUT

Sửa dữ liệu:

``` javascript
fetch(`${API_URL}/api/customers/1`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
})
```

## PATCH

Thay đổi trạng thái:

``` javascript
fetch(`${API_URL}/api/customers/1/status`, {
    method: "PATCH"
})
```
------------------------------------------------------------------------


# 14. Cấu hình API URL cho Frontend

Nên tạo:

``` text
.env
```

Ví dụ khi Backend chạy trực tiếp hoặc Docker có map port:

``` env
VITE_API_URL=http://localhost:8080
```

Trong React:

``` javascript
const API_URL = import.meta.env.VITE_API_URL;
```

Ví dụ:

``` javascript
fetch(`${API_URL}/api/customers`)
```

Không nên viết cứng `localhost:8080` ở quá nhiều file.

------------------------------------------------------------------------
# 16. Khi Backend chạy trực tiếp

Backend:

``` text
http://localhost:8080
```

Frontend:

``` text
http://localhost:5173
```

Frontend:

``` env
VITE_API_URL=http://localhost:8080
```

------------------------------------------------------------------------

# 17. Khi Backend chạy Docker

Nếu Docker Backend có:

``` text
0.0.0.0:8080 -> 8080
```

Frontend vẫn dùng:

``` env
VITE_API_URL=http://localhost:8080
```

Sơ đồ:

``` text
React trên máy
      |
      ↓
localhost:8080
      |
      ↓
Backend Container
      |
      ↓
MySQL Container
```

Frontend không cần:

-   Cài Java
-   Cài Maven
-   Cài MySQL
-   Tạo database
-   Kết nối trực tiếp tới MySQL

------------------------------------------------------------------------

# 19. Dữ liệu mẫu để Test

## User Customer

``` json
{
  "email": "khach01@gmail.com",
  "password": "123456",
  "confirmPassword": "123456",
  "fullName": "Tran Thi B",
  "phone": "0912345678",
  "address": "Ha Noi"
}
```

## Employee

``` json
{
  "employeeCode": "NV001",
  "fullName": "Nguyen Van A",
  "phone": "0901234567",
  "email": "nv.a@shop.com",
  "password": "123456"
}
```

## Customer

``` json
{
  "customerCode": "KH000002",
  "fullName": "Nguyen Van C",
  "email": "khach02@gmail.com",
  "password": "123456",
  "phone": "0987654321",
  "address": "Da Nang"
}
```

------------------------------------------------------------------------

# 20. Thông tin Frontend cần nhớ

``` text
Backend:
http://localhost:8080

Frontend:
http://localhost:5173

API:
http://localhost:8080/api/...

Login:
POST /api/auth/login

Register:
POST /api/auth/register

JWT:
Authorization: Bearer <token>

Customer:
 /api/customers

Employee:
 /api/employees
```

