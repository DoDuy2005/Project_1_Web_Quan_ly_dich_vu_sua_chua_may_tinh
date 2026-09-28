# Project_1_Web_Quan_ly_dich_vu_sua_chua_may_tinh
# README - Hướng dẫn Frontend làm việc với Backend đọc ở readme trong phần Quản Lý Thông Tin

------------------------------------------------------------------------

# 1. thêm categories

API:

``` http
POST [http://localhost:8080/api/auth/login](http://localhost:8080/api/categories)
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
