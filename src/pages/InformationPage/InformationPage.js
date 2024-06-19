import { Button, Card, Form, Input, Radio, message, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, getUserById } from "../../services/UserService";

const InformationPage = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    id_user: "",
  });
  const [validEmail, setValidEmail] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Sử dụng useCallback để bao bọc hàm fetchUser
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUserById(user._id);
      setUserList([data]);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error);
      setLoading(false);
    }
  }, [user._id]); // Thêm user._id vào danh sách dependency

  useEffect(() => {
    fetchUser(); // Gọi fetchUser từ trong useEffect
  }, [fetchUser]); // Thêm fetchUser vào danh sách dependency của useEffect

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleRadioChange = (e) => {
    setUserData({ ...userData, sex: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    // Kiểm tra giá trị nhập vào để đảm bảo số điện thoại bắt đầu từ số 0 và không chứa chữ cái
    if (/^0[0-9]*$/.test(value) || value === "") {
      setUserData({ ...userData, phone: value });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      setValidEmail(isValidEmail);
    } else if (name === "phone") {
      // Lọc bỏ các ký tự không phải số và giới hạn độ dài không quá 10
      const cleanedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      // Cập nhật state
      setUserData({ ...userData, [name]: cleanedValue });
      // Kiểm tra nếu chiều dài cleanedValue lớn hơn 10, hiển thị thông báo lỗi
      if (value.length > 10) {
        message.error("Số điện thoại không được quá 10 chữ số!");
      } else {
        setPhoneError(""); // Xóa thông báo lỗi nếu đã nhập đúng
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handlePhoneChange = (e) => {
  const value = e.target.value.replace(/[^0-9]/g, "");
  if (value.length <= 10) {
    setUserData({ ...userData, phone: value });
  }
};


  const handleEditUser = async () => {
    try {
      const isValidEmail = /\S+@\S+\.\S+/.test(userData.email);
      if (!isValidEmail) {
        message.error("Vui lòng nhập địa chỉ email hợp lệ!");
        return;
      }
      if (phoneError) {
        message.error(phoneError);
        return;
      }
      const isValidCCCD = /^[0-9]{12}$/.test(userData.cccd);
      if (!isValidCCCD) {
        message.error("CCCD phải có đúng 12 chữ số!");
        return;
      }

      setLoading(true);
      await editUser(user._id, userData);
      setEditing(false);
      fetchUser();
      setLoading(false);
      message.success("Chỉnh sửa thông tin thành công!");
    } catch (error) {
      console.error("Lỗi chỉnh sửa thông tin người dùng:", error);
      setLoading(false);
    }
  };




  const handleChangePassword = async () => {
    try {
      if (!currentPassword) {
        alert("Vui lòng nhập mật khẩu hiện tại!");
        return;
      }

      if (currentPassword !== user.password) {
        alert("Mật khẩu hiện tại không đúng!");
        return;
      }

      await editUser(user._id, { ...userData, password });
      setChangingPassword(false);
      fetchUser();
      setLoading(false);

      navigate("/login");
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      setLoading(false);
    }
  };

  const handleCloseChangePassword = () => {
    // Đặt lại state của changingPassword về false để đóng form đổi mật khẩu
    setChangingPassword(false);
    // Đặt lại giá trị của password và currentPassword về rỗng để làm sạch form
    setPassword("");
    setCurrentPassword("");
  };

  if (!user) {
    return (
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        No user information available.
      </div>
    );
  }

  return (
    <Content style={{ minHeight: 600 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#1677FF",
          }}
        >
          Thông tin người dùng
        </h2>
        <Card style={{ border: "2px solid #CCD3D8" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            userList.map((user, index) => (
              <Form key={index}>
                <Form.Item
                  label="Tên tài khoản"
                  name="username"
                  initialValue={user.username}
                >
                  {editing ? (
                    <Input
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.username}</span>
                  )}
                </Form.Item>

                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  initialValue={user.fullName}
                >
                  {editing ? (
                    <Input
                      name="fullName"
                      value={userData.fullName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.fullName}</span>
                  )}
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  initialValue={user.email}
                  validateStatus={!validEmail ? "error" : ""}
                  help={
                    !validEmail ? "Vui lòng nhập địa chỉ email hợp lệ!" : ""
                  }
                  rules={[
                    {
                      type: "email",
                      message: "Vui lòng nhập địa chỉ email hợp lệ!",
                    },
                  ]}
                >
                  {editing ? (
                    <Input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </Form.Item>

                <Form.Item label="Mã nhân viên">
                  <span>{user.id_user}</span>
                </Form.Item>

                <Form.Item
                  label="CCCD"
                  name="cccd"
                  initialValue={user.cccd}
                  rules={[
                    {
                      message: "Vui lòng nhập CCCD!",
                    },
                    {
                      pattern: /^[0-9]{12}$/,
                      message: "CCCD phải có đúng 12 chữ số!",
                    },
                  ]}
                >
                  {editing ? (
                    <Input
                      name="cccd"
                      value={userData.cccd}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{user.cccd}</span>
                  )}
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  initialValue={user.phone}
                  rules={[
                    {
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: /^0[0-9]{9}$/,
                      message:
                        "Số điện thoại phải bắt đầu từ số 0 và có đúng 10 chữ số!",
                    },
                  ]}
                >
                  {editing ? (
                    <Input
                      name="phone"
                      value={userData.phone}
                      onChange={handlePhoneChange}
                    />
                  ) : (
                    <span>{user.phone}</span>
                  )}
                </Form.Item>

                <Form.Item label="Giới tính" name="sex" initialValue={user.sex}>
                  {editing ? (
                    <Radio.Group
                      name="sex"
                      value={userData.sex}
                      onChange={handleInputChange}
                    >
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  ) : (
                    <span>{user.sex ? "Nam" : "Nữ"}</span>
                  )}
                </Form.Item>

                <Form.Item>
                  {editing ? (
                    <Button
                      type="primary"
                      onClick={handleEditUser}
                      style={{ marginRight: 5 }}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => setEditing(true)}
                      style={{ marginRight: 5 }}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                  <Button onClick={() => setChangingPassword(true)}>
                    Đổi mật khẩu
                  </Button>
                </Form.Item>

                {changingPassword && (
                  <div>
                    <Form.Item
                      label="Mật khẩu hiện tại"
                      name="currentPassword"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu hiện tại!",
                        },
                      ]}
                    >
                      <Input.Password
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleCurrentPasswordChange}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Mật khẩu mới"
                      name="password"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu mới!",
                        },
                        {
                          min: 6,
                          message: "Mật khẩu phải có ít nhất 6 ký tự!",
                        },
                        {
                          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                          message:
                            "Mật khẩu phải chứa ít nhất một chữ cái và một chữ số!",
                        },
                      ]}
                    >
                      <Input.Password
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={handleChangePassword}
                        style={{ marginRight: 5 }}
                      >
                        Lưu mật khẩu
                      </Button>
                      <Button onClick={handleCloseChangePassword}>
                        Hủy bỏ
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form>
            ))
          )}
        </Card>
      </div>
    </Content>
  );
};

export default InformationPage;
