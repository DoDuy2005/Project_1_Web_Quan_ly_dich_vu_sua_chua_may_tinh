# Project_1_Web_Quan_ly_dich_vu_sua_chua_may_tinh
# README - Hướng dẫn Frontend làm việc với Backend đọc ở readme trong phần Quản Lý Thông Tin

------------------------------------------------------------------------

# 1. thêm categories

API:

``` http
POST http://localhost:8080/api/categories
```

Body:

``` json
{
  "name": "Dịch vụ 1"
}
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "id": 4,
    "name": "Dịch vụ 1",
    "status": "ACTIVE"
}
```

------------------------------------------------------------------------
