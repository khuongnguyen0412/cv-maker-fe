import { Button, Checkbox, Form, Input } from "antd";

export default function Login() {
  return (
    <div className="login-container">
      <div className="title-login">CV Maker</div>
      <Form className="login-form">
        <Form.Item>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
