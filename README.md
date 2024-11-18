# Product Management

## Công nghệ sử dụng
* NodeJs
* Express
* MongoDB
* SocketIO
* Pug

## Thông tin ứng dụng

Ứng dụng quản lý sản phẩm xây dựng theo mô hình MVC

# Tính năng phát triển cho trang web quản lý sản phẩm

## Quản lý sản phẩm
- **Trang chi tiết sản phẩm** cho client và admin.
- **Tìm kiếm**, lọc theo trạng thái, phân trang.
- **Thay đổi** thứ tự, trạng thái sản phẩm.
- **Tạo mới**, chỉnh sửa, xóa (hỗ trợ tạo nhiều sản phẩm đồng thời).

## Quản lý danh mục
- **Quản lý danh mục sản phẩm**.
- Tích hợp **trình soạn thảo văn bản TinyMCE**.

## Quản lý người dùng và quyền
- **Đăng nhập, đăng xuất**.
- **Phân quyền người dùng**.
- Thêm **middleware** cho các route yêu cầu bảo mật (private routes).
- Tích hợp **authorization**.

## Giao diện và trải nghiệm người dùng
- Hiển thị **thông báo (notifications)**.
- **Trang thanh toán**, giỏ hàng.
- Giao diện **chat** (đang hoàn thiện).

## Cài đặt

1. Clone repository về máy của bạn:

```bash
git clone https://github.com/username/repository.git
```
2. Cài đặt các phụ thuộc
```bash
npm install
```
3. Chạy ứng dụng
```bash
npm start
```
4. Truy cập ứng dụng tại
[http://localhost:3000/](http://localhost:3000/)
