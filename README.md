# Project_1_Web_Quan_ly_dich_vu_sua_chua_may_tinh
# README - Hướng dẫn cài môi trường làm việc với Backend đọc ở readme trong phần Quản Lý Thông Tin

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
# 2. Lấy categories

API:

``` http
GET http://localhost:8080/api/categories
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
[
    {
        "id": 1,
        "name": "Sửa chữa laptop",
        "status": "ACTIVE"
    },
    {
        "id": 2,
        "name": "Sửa chữa PC",
        "status": "ACTIVE"
    },
    {
        "id": 3,
        "name": "Cài đặt phần mềm",
        "status": "ACTIVE"
    },
    {
        "id": 4,
        "name": "Dịch vụ 1",
        "status": "ACTIVE"
    }
]
```

------------------------------------------------------------------------

# 3. thêm services

API:

``` http
POST http://localhost:8080/api/services
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
    "category": {
        "id": 1,
        "name": "Sửa chữa laptop",
        "status": "ACTIVE"
    },
    "description": "Thay quạt laptop",
    "id": 2,
    "name": "Thay quạt tản nhiệt",
    "price": 150000,
    "serviceCode": "DV02",
    "status": "ACTIVE"
}
```

------------------------------------------------------------------------

# 4. Lấy services

API:

``` http
GET http://localhost:8080/api/services
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
[
    {
        "category": {
            "id": 1,
            "name": "Sửa chữa laptop",
            "status": "ACTIVE"
        },
        "description": "Thay quạt laptop",
        "id": 1,
        "name": "Thay quạt tản nhiệt",
        "price": 150000,
        "serviceCode": "DV01",
        "status": "ACTIVE"
    },
    {
        "category": {
            "id": 1,
            "name": "Sửa chữa laptop",
            "status": "ACTIVE"
        },
        "description": "Thay quạt laptop",
        "id": 2,
        "name": "Thay quạt tản nhiệt",
        "price": 150000,
        "serviceCode": "DV02",
        "status": "ACTIVE"
    }
]
```

------------------------------------------------------------------------

# 1. thêm đặt lịch

API:

``` http
POST http://localhost:8080/api/appointments
```

Body:

``` json
{
  "device": "Laptop Dell Inspiron",
  "serviceId": 1,
  "appointmentDate": "2026-10-03",
  "appointmentTime": "09:30:00",
  "serviceMethod": "STORE_DROP_OFF",
  "contactPhone": "0901234567",
  "problemDescription": "Máy không lên nguồn",
  "pickupAddress": null
}

```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "appointmentDate": "2026-10-03",
    "appointmentTime": "09:30:00",
    "contactPhone": "0901234567",
    "createdAt": "2026-10-02T19:25:02.0987932",
    "device": "Laptop Dell Inspiron",
    "id": 1,
    "pickupAddress": null,
    "problemDescription": "Máy không lên nguồn",
    "service": {
        "category": {
            "id": 1,
            "name": "Sửa chữa laptop",
            "status": "ACTIVE"
        },
        "description": "Thay quạt laptop",
        "id": 1,
        "name": "Thay quạt tản nhiệt",
        "price": 150000,
        "serviceCode": "DV01",
        "status": "ACTIVE"
    },
    "serviceMethod": "STORE_DROP_OFF",
    "status": "PENDING"
}
```

------------------------------------------------------------------------
# 2. Lấy thông tin đặt lịch

API:

``` http
GET http://localhost:8080/api/appointments
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
[
    {
        "appointmentDate": "2026-10-03",
        "appointmentTime": "09:30:00",
        "contactPhone": "0901234567",
        "createdAt": "2026-10-02T19:25:02.098793",
        "device": "Laptop Dell Inspiron",
        "id": 1,
        "pickupAddress": null,
        "problemDescription": "Máy không lên nguồn",
        "service": {
            "category": {
                "id": 1,
                "name": "Sửa chữa laptop",
                "status": "ACTIVE"
            },
            "description": "Thay quạt laptop",
            "id": 1,
            "name": "Thay quạt tản nhiệt",
            "price": 150000,
            "serviceCode": "DV01",
            "status": "ACTIVE"
        },
        "serviceMethod": "STORE_DROP_OFF",
        "status": "PENDING"
    }
]
```

------------------------------------------------------------------------
