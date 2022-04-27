import { Modal, Form, Input } from "antd";
const ModalWindow = ({ isAddEdit, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const onfinish = (values) => {};
  return (
    <div>
      <Modal
        visible={isAddEdit}
        title="Details"
        okText="Done"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();

              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          onFinish={onfinish}
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            type="text"
            rules={[{type:"string", required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            
            rules={[{type:"email", required: true, message: "Please input your Email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Budget"
            name="budget"
            rules={[{ required: true, 
              message: "A value must be numeric",
              pattern: new RegExp(/^[0-9]+$/)}]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalWindow;
