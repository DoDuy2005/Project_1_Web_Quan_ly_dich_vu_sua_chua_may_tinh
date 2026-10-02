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


# 1. thêm QLy sửa chữa

API:

``` http
POST http://localhost:8080/api/repair-tickets
```

Body:

``` json
{
  "customerId": 1,
  "device": "Dell Inspiron",
  "receivedDate": "2026-10-02",
  "status": "Đang sửa",
  "technicianId": 1
}
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "id": 1,
    "ticketCode": "PS00001",
    "customerId": 1,
    "customerName": "Tran Thi B",
    "device": "Dell Inspiron",
    "receivedDate": "2026-10-02",
    "status": "Đang sửa",
    "technicianId": 1,
    "technicianName": "Nguyen Van A"
}
```

------------------------------------------------------------------------
# 2. Lấy thông tin qly sửa chữa

API:

``` http
GET http://localhost:8080/api/repair-tickets
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
        "ticketCode": "PS00001",
        "customerId": 1,
        "customerName": "Tran Thi B",
        "device": "Dell Inspiron",
        "receivedDate": "2026-10-02",
        "status": "Đang sửa",
        "technicianId": 1,
        "technicianName": "Nguyen Van A"
    }
]
```

------------------------------------------------------------------------
# 3. Lấy thông tin qly sửa chữa theo id 

API:

``` http
GET http://localhost:8080/api/repair-tickets/1
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "id": 1,
    "ticketCode": "PS00001",
    "customerId": 1,
    "customerName": "Tran Thi B",
    "device": "Dell Inspiron",
    "receivedDate": "2026-10-02",
    "status": "Đang sửa",
    "technicianId": 1,
    "technicianName": "Nguyen Van A"
}
```

------------------------------------------------------------------------
# 4. sửa QLy sửa chữa theo id

API:

``` http
PUT http://localhost:8080/api/repair-tickets/1
```

Body:

``` json
{
  "customerId": 1,
  "device": "Dell Inspiron",
  "receivedDate": "2026-10-02",
  "status": "Đang sửa",
  "technicianId": 1
}
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "id": 1,
    "ticketCode": "PS00001",
    "customerId": 1,
    "customerName": "Tran Thi B",
    "device": "Dell Inspiron 2",
    "receivedDate": "2026-10-02",
    "status": "Đang sửa",
    "technicianId": 1,
    "technicianName": "Nguyen Van A"
}
```

------------------------------------------------------------------------


# 1. thêm Báo giá

API:

``` http
POST http://localhost:8080/api/repair-tickets/1/quote
```

Body:

``` json
{
  "items": [
    {
      "name": "Thay nguồn laptop",
      "quantity": 1,
      "unitPrice": 850000
    },
    {
      "name": "Vệ sinh máy",
      "quantity": 1,
      "unitPrice": 100000
    }
  ]
}
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ: 

``` json

```

------------------------------------------------------------------------
# 2. Lấy thông tin báo giá

API:

``` http
GET http://localhost:8080/api/repair-tickets/1/quote
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json
{
    "id": 1,
    "quoteCode": "BG000001",
    "repairTicketId": 1,
    "ticketCode": "PS00001",
    "customerName": "Tran Thi B",
    "items": [
        {
            "id": 1,
            "name": "Thay nguồn laptop",
            "quantity": 1,
            "unitPrice": 850000.00,
            "lineTotal": 850000.00
        },
        {
            "id": 2,
            "name": "Vệ sinh máy",
            "quantity": 1,
            "unitPrice": 100000.00,
            "lineTotal": 100000.00
        }
    ],
    "totalAmount": 950000.00,
    "status": "PAID",
    "createdAt": "2026-10-02T20:56:22.14782",
    "paidAt": "2026-10-02T20:58:27.346507"
}
```

------------------------------------------------------------------------
# 3. Hành động khách hàng 

API:

``` http
PATCH http://localhost:8080/api/quotes/1/decision
```

Body:

``` json
{
  "decision": "ACCEPTED" 
}
hoặc REJECTED
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:

``` json

```

------------------------------------------------------------------------
# 4. Chỉ sau khi báo giá được chấp nhận

API:

``` http
PATCH http://localhost:8080/api/quotes/1/payment
```

Body:

``` json
```

Backend trả về thông tin đăng nhập và JWT.

Ví dụ:
Gọi PATCH http://localhost:8080/api/quotes/1/payment sẽ đánh dấu báo giá là PAID trong hệ thống ngay lập tức, nếu báo giá đang ở trạng thái ACCEPTED.

``` json

```

------------------------------------------------------------------------



