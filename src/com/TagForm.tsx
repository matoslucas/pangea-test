import { useState } from "react";
import { Form, Input, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type TagFormPropsType = {
  onSubmit: (values: string) => void;
  list: string[];
};

type validateStatusType = {
  status: "" | "error" | "success" | "warning" | "validating" | undefined;
};

const TagForm = ({ onSubmit, list }: TagFormPropsType) => {
  const [validateStatus, setValidateStatus] = useState<validateStatusType>();
  const [help, setHelp] = useState("");

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let e: validateStatusType;
    if (list.includes(values.tagName)) {
      e = { status: "error" };
      setValidateStatus(e);
      setHelp("This Tag is already included.");
    } else if (!values.tagName) {
      e = { status: "error" };
      setValidateStatus(e);
      setHelp("Tag is required.");
    } else {
      e = { status: "" };
      setValidateStatus(e);
      setHelp("");
      onSubmit(values.tagName);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={"form-conatiner"}>
      <Form
        form={form}
        layout={"inline"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label=""
          name="tagName"
          validateStatus={validateStatus?.status}
          help={help}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            shape="circle"
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default TagForm;
