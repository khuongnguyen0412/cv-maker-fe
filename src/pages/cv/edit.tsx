import "./index.css";
import moment from "moment";
import dayjs from "dayjs";
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
  notification,
} from "antd";
import MainLayout from "../../components/layout/MainLayout";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";
import cvService from "../../services/cv.service";
const { RangePicker } = DatePicker;

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    cvService.getById(Number(id)).then((res: any) => {
      if (res.data.success) {
        form.setFieldsValue(formatData(res.data.data));
      } else {
        notification.error({
          message: "Error while get data",
        });
      }
    });
  }, []);

  const formatData = (data: any) => {
    const certificationsFormat = data.certifications?.map((item: any) => {
      return { time: dayjs(item.time), name: item.name };
    });

    const experinceFormat = data.experince?.map((item: any) => {
      return {
        fromto: [dayjs(item.fromto[0]), dayjs(item.fromto[1])],
        position: item.position,
        companyName: item.companyName,
        description: item.description,
      };
    });

    const projectsFormat = data.projects?.map((item: any) => {
      return {
        fromto: [dayjs(item.fromto[0]), dayjs(item.fromto[1])],
        customer: item.customer,
        position: item.position,
        teamSize: item.teamSize,
        technology: item.technology,
        projectName: item.projectName,
      };
    });

    const dataFormat = {
      ...data,
      gender: data.gender.toString(),
      certifications: certificationsFormat,
      experince: experinceFormat,
      projects: projectsFormat,
    };

    return dataFormat;
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    // Prepare values
    const certifications: [] = values?.certifications?.map((item: any) => {
      return {
        time: moment(item.time.toString()).format("YYYY-MM-DD"),
        name: item.name,
      };
    });

    const experince: [] = values?.experince?.map((item: any) => {
      return {
        position: item.position,
        description: item.description,
        companyName: item.companyName,
        fromto: [
          moment(item.fromto[0].toString()).format("YYYY-MM"),
          moment(item.fromto[1].toString()).format("YYYY-MM"),
        ],
      };
    });

    const projects: [] = values?.projects?.map((item: any) => {
      return {
        position: item.position,
        projectName: item.projectName,
        fromto: [
          moment(item.fromto[0].toString()).format("YYYY-MM"),
          moment(item.fromto[1].toString()).format("YYYY-MM"),
        ],
        customer: item.customer,
        teamSize: item.teamSize,
        technology: item.technology,
      };
    });

    const valuesSubmit = {
      ...values,
      certifications,
      experince,
      projects,
      userId: Number((await authService.getUserInfo()).id),
      skills: values.skills.toString(),
      values: values.avatarNew ? values.avatarNew : values.avatar,
    };

    // Submit
    console.log("valuesSubmit", valuesSubmit);

    const result = await cvService.edit(Number(id), valuesSubmit);
    if (result.data.success) {
      setLoading(false);
      notification.success({
        message: "Saved CV Successfully!",
      });

      setTimeout(() => {
        navigate("/my-cv");
      }, 1500);
    } else {
      setLoading(false);
      notification.error({
        message: "Save CV Failed!",
      });
    }
  };

  return (
    <MainLayout>
      <div className="container">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
          onFinish={onFinish}
          form={form}
          initialValues={{
            gender: true,
          }}
        >
          <Row>
            <Col span={6}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Job Title"
                name="jobTitle"
                required
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                required
                rules={[{ required: true }]}
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
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
              >
                <TextArea autoSize={{ minRows: 2 }}></TextArea>
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                required
                rules={[{ required: true }]}
                // valuePropName="value"
              >
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
                          <Form.Item name={[field.name, "time"]}>
                            <DatePicker />
                          </Form.Item>
                          <Form.Item name={[field.name, "name"]}>
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
              <Form.Item
                label="Objective"
                name="objective"
                required
                rules={[{ required: true }]}
              >
                <TextArea autoSize={{ minRows: 4 }}></TextArea>
              </Form.Item>
              <Form.Item
                label="Skills"
                name="skills"
                required
                rules={[{ required: true }]}
              >
                <Select mode="tags" dropdownStyle={{ display: "none" }} />
              </Form.Item>
              <Form.Item label="Experince" name="experince">
                <Form.List name="experince">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <div key={field.key + "div"}>
                          <Space key={field.key} align="baseline">
                            <Form.Item name={[field.name, "position"]}>
                              <Input placeholder="Position" />
                            </Form.Item>
                            <Form.Item name={[field.name, "description"]}>
                              <Input placeholder="Description" />
                            </Form.Item>
                            <Form.Item name={[field.name, "companyName"]}>
                              <Input placeholder="Company Name" />
                            </Form.Item>
                          </Space>
                          <Space
                            key={field.key + "victor :)))"}
                            align="baseline"
                          >
                            <Form.Item name={[field.name, "fromto"]}>
                              <RangePicker picker="month" />
                            </Form.Item>
                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                              style={{}}
                            />
                          </Space>
                        </div>
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
                        <div key={field.key + "div"}>
                          <Space key={field.key} align="baseline">
                            <Form.Item name={[field.name, "position"]}>
                              <Input placeholder="Your Position" />
                            </Form.Item>
                            <Form.Item name={[field.name, "projectName"]}>
                              <Input placeholder="Project Name" />
                            </Form.Item>
                            <Form.Item name={[field.name, "fromto"]}>
                              <RangePicker picker="month" />
                            </Form.Item>
                          </Space>
                          <Space
                            key={field.key + "victor :)))"}
                            align="baseline"
                          >
                            <Form.Item name={[field.name, "customer"]}>
                              <Input placeholder="Customer" />
                            </Form.Item>
                            <Form.Item name={[field.name, "teamSize"]}>
                              <Input placeholder="Team Size" />
                            </Form.Item>
                            <Form.Item name={[field.name, "technology"]}>
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
                        </div>
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
              <Form.Item label="Avatar" name="avatar" valuePropName="src">
                <Avatar shape="square" size={164} />
              </Form.Item>
              <Form.Item
                label="Avatar Update"
                name="avatarNew"
                getValueFromEvent={({ file }) => file.originFileObj}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  accept="image/png, image/jpeg"
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item label="Actions">
                <Button
                  type="default"
                  style={{ right: 0 }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: "5px" }}
                  htmlType="submit"
                  loading={loading}
                >
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </MainLayout>
  );
}
