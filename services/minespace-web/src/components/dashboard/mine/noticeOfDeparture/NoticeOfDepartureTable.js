import React from "react";
import { Button, Row, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import CustomPropTypes from "@/customPropTypes";
import {
  EMPTY_FIELD,
  EDITABLE_NOTICE_OF_DEPARTURE_STATUS,
} from "@/constants/strings";

import {
  NOTICE_OF_DEPARTURE_TYPE,
  NOTICE_OF_DEPARTURE_STATUS
} from "@common/constants/strings"; 

import { formatDate } from "@/utils/helpers";
import { EditIcon } from "@/assets/icons";

const propTypes = {
  data: PropTypes.arrayOf(CustomPropTypes.noticeOfDeparture).isRequired,
  openViewNoticeOfDepartureModal: PropTypes.func.isRequired,
  openEditNoticeOfDepartureModal: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

const NoticeOfDepartureTable = (props) => {
  const handleOpenViewModal = (event, noticeOfDeparture) => {
    event.preventDefault();
    props.openViewNoticeOfDepartureModal(noticeOfDeparture);
  };

  const handleOpenEditModal = (event, noticeOfDeparture) => {
    event.preventDefault();
    props.openEditNoticeOfDepartureModal(noticeOfDeparture);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "nod_title",
      key: "nod_title",
      sorter: (a, b) => (a.nod_title > b.nod_title ? -1 : 1),
    },
    {
      title: "NOD #",
      dataIndex: "nod_no",
      key: "nod_no",
      sorter: (a, b) => (a.nod_no > b.nod_no ? -1 : 1),
    },
    {
      title: "Permit #",
      dataIndex: ["permit", "permit_no"],
      key: ["permit", "permit_no"],
      sorter: (a, b) => (a.permit.permit_no > b.permit.permit_no ? -1 : 1),
    },
    {
      title: "Submitted",
      dataIndex: "submitted_at",
      key: "submitted_at",
      sorter: (a, b) => (a.submitted_at > b.submitted_at ? -1 : 1),
    },
    {
      title: "Type",
      dataIndex: "nod_type",
      key: "nod_type",
      sorter: (a, b) => (a.nod_type > b.nod_type ? -1 : 1),
    },
    {
      title: "Status",
      dataIndex: "nod_status",
      key: "nod_status",
      sorter: (a, b) => (a.nod_status > b.nod_status ? -1 : 1),
    },
    {
      render: (text, record) => (
        <div title="" align="right">
          <Row>
            <Button type="primary" size="small" ghost>
              {!EDITABLE_NOTICE_OF_DEPARTURE_STATUS.includes(record.nod_status) ? (
                <EyeOutlined
                  onClick={(event) => handleOpenViewModal(event, record)}
                  className="icon-xs--darkestgrey"
                />
              ) : (
                <EditIcon
                  onClick={(event) => handleOpenEditModal(event, record)}
                  className="icon-xs--darkestgrey"
                />
              )}
            </Button>
          </Row>
        </div>
      ),
    },
  ];

  const transformRowData = (nods) =>
    nods.map(
      ({
        submission_timestamp,
        create_timestamp,
        update_timestamp,
        nod_guid,
        nod_no,
        nod_type,
        nod_status,
        ...other
      }) => ({
        ...other,
        key: nod_guid,
        nod_guid,
        nod_no,
        nod_status: NOTICE_OF_DEPARTURE_STATUS[nod_status] || EMPTY_FIELD,
        nod_type: NOTICE_OF_DEPARTURE_TYPE[nod_type] || EMPTY_FIELD,
        updated_at: formatDate(update_timestamp),
        submitted_at: formatDate(submission_timestamp) || formatDate(create_timestamp),
      })
    );

  return (
    <Table
      loading={!props.isLoaded}
      columns={columns}
      dataSource={transformRowData(props.data)}
      pagination={false}
      rowKey={(record) => record.key}
    />
  );
};

NoticeOfDepartureTable.propTypes = propTypes;

export default NoticeOfDepartureTable;
