import React from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm, Button } from "antd";
import { formatDate, dateSorter, nullableStringSorter } from "@common/utils/helpers";
import DocumentLink from "@/components/common/DocumentLink";
import { some } from "lodash";
import { TRASHCAN } from "@/constants/assets";
import CustomPropTypes from "@/customPropTypes";

const propTypes = {
  documents: PropTypes.arrayOf(CustomPropTypes.documentRecord),
  isViewOnly: PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  removeDocument: PropTypes.func,
};

const defaultProps = {
  documents: [],
  isViewOnly: false,
  removeDocument: () => {},
};

export const DocumentTable = (props) => {
  let columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: nullableStringSorter("name"),
      render: (text, record) => (
        <div key={record.key} title="Name">
          <DocumentLink
            documentManagerGuid={record.document_manager_guid}
            documentName={record.name}
            truncateDocumentName={false}
          />
        </div>
      ),
    },
    {
      title: "Dated",
      key: "dated",
      dataIndex: "dated",
      sorter: dateSorter("dated"),
      defaultSortOrder: "descend",
      render: (text) => <div title="Dated">{formatDate(text)}</div>,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      sorter: nullableStringSorter("category"),
      render: (text) => <div title="Category">{text}</div>,
    },
    {
      title: "Uploaded",
      key: "uploaded",
      dataIndex: "uploaded",
      sorter: dateSorter("uploaded"),
      defaultSortOrder: "descend",
      render: (text) => <div title="Uploaded">{formatDate(text)}</div>,
    },
    {
      key: "remove",
      className: props.isViewOnly || !props.removeDocument ? "column-hide" : "",
      render: (text, record) => (
        <div
          align="right"
          className={props.isViewOnly || !props.removeDocument ? "column-hide" : ""}
        >
          <Popconfirm
            placement="topLeft"
            title={`Are you sure you want to delete ${record.name}?`}
            onConfirm={(event) => props.removeDocument(event, record.key)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button ghost type="primary" size="small">
              <img src={TRASHCAN} alt="Remove" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  if (!some(props.documents, "dated")) {
    columns = columns.filter((column) => column.key !== "dated");
  }

  return (
    <Table
      align="left"
      pagination={false}
      columns={columns}
      locale={{ emptyText: "No Data Yet" }}
      dataSource={props.documents}
    />
  );
};

DocumentTable.propTypes = propTypes;
DocumentTable.defaultProps = defaultProps;

export default DocumentTable;
