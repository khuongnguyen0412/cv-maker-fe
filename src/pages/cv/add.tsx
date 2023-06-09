import "./index.css";
import moment from "moment";
import {
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
  Steps,
  Tooltip,
  Upload,
  notification,
} from "antd";
import MainLayout from "../../components/layout/MainLayout";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import cvService from "../../services/cv.service";
import Meta from "antd/es/card/Meta";
import templateService from "../../services/template.service";
const { RangePicker } = DatePicker;

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(-1);
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<[]>();

  useEffect(() => {
    templateService.getAll().then((res) => {
      if (res.data.success) {
        setTemplates(res.data.data.list);
      } else {
        notification.error({
          message: "Load template failed!",
        });
      }
    });
  }, []);

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
    };

    // Submit
    console.log("valuesSubmit", valuesSubmit);
    setStep(0);

    const result = await cvService.add(valuesSubmit);
    if (result.data.success) {
      setStep(1);
      setLoading(false);
      notification.success({
        message: "Saved CV Successfully!",
      });

      const generatePDFRes = await cvService.generatePDF(
        Number(result.data.data.id)
      );
      if (generatePDFRes.data.success) {
        setLoading(false);
        setStep(2);
        notification.success({
          message: "Generate PDF Successfully!",
        });

        setTimeout(() => {
          navigate("/my-cv");
        }, 2000);
      } else {
        setLoading(false);
        setStep(0);
        notification.error({
          message: "Save CV Failed!",
        });
      }
    }
  };

  return (
    <div className="container">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        onFinish={onFinish}
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
                        <Form.Item
                          name={[field.name, "time"]}
                          rules={[{ required: true }]}
                        >
                          <DatePicker />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, "name"]}
                          rules={[{ required: true }]}
                        >
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
                          <Form.Item
                            name={[field.name, "position"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Position" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "description"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Description" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "companyName"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Company Name" />
                          </Form.Item>
                        </Space>
                        <Space key={field.key + "victor :)))"} align="baseline">
                          <Form.Item
                            name={[field.name, "fromto"]}
                            rules={[{ required: true }]}
                          >
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
                          <Form.Item
                            name={[field.name, "position"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Your Position" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "projectName"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Project Name" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "fromto"]}
                            rules={[{ required: true }]}
                          >
                            <RangePicker picker="month" />
                          </Form.Item>
                        </Space>
                        <Space key={field.key + "victor :)))"} align="baseline">
                          <Form.Item
                            name={[field.name, "customer"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Customer" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "teamSize"]}
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="Team Size" />
                          </Form.Item>
                          <Form.Item
                            name={[field.name, "technology"]}
                            rules={[{ required: true }]}
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
            <Form.Item
              label="Avatar"
              name="avatar"
              getValueFromEvent={({ file }) => file.originFileObj}
              required
              rules={[{ required: true }]}
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
            <Form.Item
              label="Templates"
              name="templateId"
              rules={[{ required: true }]}
            >
              <Radio.Group className="templates">
                {templates?.map((template: ITemplate) => {
                  return (
                    <Radio value={template.id} key={template.id}>
                      <Tooltip
                        className="template-card"
                        getPopupContainer={(trigger) => {
                          return trigger;
                        }}
                        title={
                          <Card
                            hoverable
                            style={{ width: 300 }}
                            cover={
                              <img alt={template.name} src={template.image} />
                            }
                          >
                            <Meta title={template.name} />
                          </Card>
                        }
                        placement="right"
                      >
                        <Card
                          hoverable
                          style={{ width: 120, height: 220 }}
                          cover={
                            <img alt={template.name} src={template.image} />
                          }
                        >
                          <Meta title={template.name} />
                        </Card>
                      </Tooltip>
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Process">
              <Steps
                current={step}
                status="process"
                items={[
                  {
                    title: "Save",
                  },
                  {
                    title: "Generate PDF",
                  },
                  {
                    title: "Done",
                  },
                ]}
              />
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
  );
}
