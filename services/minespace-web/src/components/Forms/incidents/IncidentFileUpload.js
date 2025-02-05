import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { MINE_INCIDENT_DOCUMENT } from "@common/constants/API";
import FileUpload from "@/components/common/FileUpload";
import { DOCUMENT, EXCEL } from "@/constants/fileTypes";

const propTypes = {
  onFileLoad: PropTypes.func.isRequired,
  onRemoveFile: PropTypes.func.isRequired,
  mineGuid: PropTypes.string.isRequired,
  allowMultiple: PropTypes.bool.isRequired,
};

export const IncidentFileUpload = (props) => (
  <Form.Item>
    <Field
      id="fileUpload"
      name="fileUpload"
      component={FileUpload}
      uploadUrl={MINE_INCIDENT_DOCUMENT(props.mineGuid)}
      acceptedFileTypesMap={{ ...DOCUMENT, ...EXCEL }}
      onFileLoad={props.onFileLoad}
      onRemoveFile={props.onRemoveFile}
      allowRevert
      allowMultiple={props.allowMultiple}
    />
  </Form.Item>
);

IncidentFileUpload.propTypes = propTypes;

export default IncidentFileUpload;
