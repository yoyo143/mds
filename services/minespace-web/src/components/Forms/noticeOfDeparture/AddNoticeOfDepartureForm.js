import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { Button, Col, Popconfirm, Row, Typography } from "antd";
import { Form } from "@ant-design/compatible";
import { maxLength, required, requiredList, validateSelectOptions } from "@common/utils/Validate";
import { resetForm } from "@common/utils/helpers";
import { renderConfig } from "@/components/common/config";
import * as FORM from "@/constants/forms";
import CustomPropTypes from "@/customPropTypes";

const propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  permits: PropTypes.arrayOf(CustomPropTypes.permit).isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const AddNoticeOfDepartureForm = (props) => {
  const { permits, onSubmit, closeModal, handleSubmit } = props;
  const [submitting, setSubmitting] = useState(false);
  const [permitOptions, setPermitOptions] = useState([]);

  useEffect(() => {
    if (permits.length > 0) {
      setPermitOptions(
        permits.map((permit) => ({
          label: permit.permit_no,
          value: permit.permit_guid,
        }))
      );
    }
  }, []);

  const handleNoticeOfDepartureSubmit = (values) => {
    setSubmitting(true);
    const { permitNumber } = values;
    onSubmit(permitNumber, values)
      .then(() => closeModal())
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <Form layout="vertical" onSubmit={handleSubmit(handleNoticeOfDepartureSubmit)}>
        <Typography.Text>
          Please complete the following form to submit your notice of departure and any relevant
          supporting documents. For more information on the purpose and intent of a notice of
          departure click here.
        </Typography.Text>
        <Typography.Title level={4}>Basic Information</Typography.Title>
        <Typography.Text>
          Enter the following information about your notice of departure.
        </Typography.Text>
        <Form.Item label="Project Title">
          <Field
            id="nodTitle"
            name="nod_title"
            placeholder="Departure Project Title"
            component={renderConfig.FIELD}
            validate={[required, maxLength(50)]}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Permit #">
              <Field
                id="permitGuid"
                name="permit_guid"
                placeholder="Select Permit #"
                component={renderConfig.SELECT}
                validate={[requiredList, validateSelectOptions(permitOptions)]}
                data={permitOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Field
          id="nod_description"
          name="nod_description"
          label="Description"
          component={renderConfig.AUTO_SIZE_FIELD}
          validate={[maxLength(3000), required]}
        />
        <div className="ant-modal-footer">
          <Popconfirm
            placement="top"
            title="Are you sure you want to cancel?"
            okText="Yes"
            cancelText="No"
            onConfirm={closeModal}
            disabled={submitting}
          >
            <Button disabled={submitting}>Cancel</Button>
          </Popconfirm>
          <Button
            disabled={submitting}
            type="primary"
            className="full-mobile margin-small"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

AddNoticeOfDepartureForm.propTypes = propTypes;

export default reduxForm({
  form: FORM.ADD_NOTICE_OF_DEPARTURE,
  onSubmitSuccess: resetForm(FORM.ADD_NOTICE_OF_DEPARTURE),
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  touchOnBlur: true,
})(AddNoticeOfDepartureForm);
