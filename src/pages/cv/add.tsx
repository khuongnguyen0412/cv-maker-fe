import "./index.css";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import MainLayout from "../../components/layout/MainLayout";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function Add() {
  return (
    <MainLayout>
      <div className="container">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
        >
          <Row>
            <Col span={6}>
              <Form.Item label="Name" name="name" required>
                <Input />
              </Form.Item>
              <Form.Item label="Job Title" name="jobTitle" required>
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                required
                rules={[
                  {
                    type: "number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[
                  {
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Address" name="address" required>
                <TextArea autoSize={{ minRows: 2 }}></TextArea>
              </Form.Item>
              <Form.Item label="Gender">
                <Radio.Group>
                  <Radio value="1"> Male </Radio>
                  <Radio value="0"> Female </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Certifications" name="certifications">
                <Form.List name="certifications">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                          <Form.Item {...field} name={[field.name, "time"]}>
                            <DatePicker />
                          </Form.Item>
                          <Form.Item {...field} name={[field.name, "name"]}>
                            <Input placeholder="Name" />
                          </Form.Item>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                            style={{}}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={add}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add item
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Objective" name="objective" required>
                <TextArea autoSize={{ minRows: 4 }}></TextArea>
              </Form.Item>
              <Form.Item label="Skills">
                <Select mode="tags" dropdownStyle={{ display: "none" }} />
              </Form.Item>
              <Form.Item label="Experince" name="experince">
                <Form.List name="experince">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <>
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              {...field}
                              name={[field.name, "position"]}
                            >
                              <Input placeholder="Position" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "description"]}
                            >
                              <Input placeholder="Description" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "companyName"]}
                            >
                              <Input placeholder="Company Name" />
                            </Form.Item>
                          </Space>
                          <Space key={field.key} align="baseline">
                            <Form.Item {...field} name={[field.name, "fromto"]}>
                              <RangePicker picker="month" />
                            </Form.Item>
                          </Space>
                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                            style={{}}
                          />
                        </>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={add}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add item
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Projects" name="projects">
                <Form.List name="projects">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <>
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              {...field}
                              name={[field.name, "position"]}
                            >
                              <Input placeholder="Your Position" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "projectName"]}
                            >
                              <Input placeholder="Project Name" />
                            </Form.Item>
                            <Form.Item {...field} name={[field.name, "fromto"]}>
                              <RangePicker picker="month" />
                            </Form.Item>
                          </Space>
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              {...field}
                              name={[field.name, "customer"]}
                            >
                              <Input placeholder="Customer" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "timeSize"]}
                            >
                              <Input placeholder="Team Size" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, "technology"]}
                            >
                              <Select
                                mode="tags"
                                dropdownStyle={{ display: "none" }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                              style={{}}
                            />
                          </Space>
                        </>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={add}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add item
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>
              <Form.Item label="Avatar" valuePropName="fileList">
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  maxCount={1}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="Submit">
                <Button type="primary" style={{right : 0}}>Save</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </MainLayout>
  );
}
