FIXHUB - Frontend

Frontend của hệ thống quản lý và đặt dịch vụ sửa chữa máy tính.

1. Công nghệ

React

TypeScript

Vite

Axios

React Router DOM

Lucide React

2. Yêu cầu môi trường

Node.js

npm

Docker Desktop

Git

Kiểm tra:

node -v
npm -v
docker -v
git --version

3. Chạy Backend bằng Docker

Backend cần chạy trước khi chạy Frontend.

Clone BE vào thư mục Project 1_Web_Quan_ly_dich_vu_sua_chua_may_tinh-BE trước

Di chuyển vào thư mục Backend:

cd "...\Project 1_Web_Quan_ly_dich_vu_sua_chua_may_tinh-BE"

Kiểm tra Docker Desktop đang chạy, sau đó chạy:

docker compose up -d

Kiểm tra container:

docker ps

Backend sử dụng:

http://localhost:8080

MySQL sử dụng port:

3307

Xem log Backend:

docker logs repair-backend

Dừng Backend:

docker compose down

4. Cài đặt Frontend

Di chuyển vào thư mục Frontend:

cd "...\Project_1_Web_Quan_ly_dich_vu_sua_chua_may_tinh\FE\Frontend"

Cài các package:

npm install

5. Cấu hình Frontend

Tạo file .env trong thư mục Frontend:

VITE_API_URL=http://localhost:8080

Frontend sẽ sử dụng Backend tại:

http://localhost:8080

6. Chạy Frontend

Sau khi Backend đã chạy:

npm run dev

Frontend mặc định chạy tại:

http://localhost:5173

Mở trình duyệt:

http://localhost:5173
