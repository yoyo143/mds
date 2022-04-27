import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { connect } from "react-redux";
import { formatDate } from "@common/utils/helpers";
import * as Strings from "@common/constants/strings";
import CustomPropTypes from "@/customPropTypes";
import CoreTable from "@/components/common/CoreTable";

const NoticeOfDepartureType = {
  non_substantial: "Non Substantial",
  potentially_substantial: "Potentially Substantial",
};

const NoticeOfDepartureStatus = {
  pending_review: "Pending Preview",
  in_review: "In Review",
  self_authorized: "Self Authorized",
};

const propTypes = {
  nods: PropTypes.arrayOf(CustomPropTypes.noticeOfDeparture).isRequired,
  openViewNodModal: PropTypes.func.isRequired,
  isDashboardView: PropTypes.bool,
  sortField: PropTypes.string,
  sortDir: PropTypes.string,
  isLoaded: PropTypes.bool,
  isPaginated: PropTypes.bool,
};

const defaultProps = {
  isLoaded: false,
  isDashboardView: false,
  sortField: undefined,
  sortDir: undefined,
  isPaginated: false,
};

const applySortIndicator = (_columns, field, dir) =>
  _columns.map((column) => ({
    ...column,
    sortOrder: dir && column.sortField === field ? dir.concat("end") : false,
  }));

export class MineNoticeOfDepartureTable extends Component {
  transformRowData = (nods) =>
    nods.map(
      ({
        submission_timestamp,
        create_timestamp,
        update_timestamp,
        nod_guid,
        nod_type,
        nod_status,
        ...other
      }) => ({
        ...other,
        key: nod_guid,
        nod_id: nod_guid,
        nod_status: NoticeOfDepartureStatus[nod_status] || Strings.EMPTY_FIELD,
        nod_type: NoticeOfDepartureType[nod_type] || Strings.EMPTY_FIELD,
        updated_at: formatDate(update_timestamp),
        submitted_at: formatDate(submission_timestamp) || formatDate(create_timestamp),
      })
    );

  render() {
    const columns = [
      {
        title: "Project Title",
        dataIndex: "nod_title",
        sortField: "nod_title",
        sorter: (a, b) => (a.nod_title > b.nod_title ? -1 : 1),
        render: (text) => <div title="Code">{text || Strings.EMPTY_FIELD}</div>,
      },
      {
        title: "NOD",
        dataIndex: "nod_id",
        sortField: "nod_id",
        render: (text) => <div title="Id">{text}</div>,
      },
      {
        title: "Permit",
        dataIndex: ["permit", "permit_no"],
        key: ["permit", "permit_no"],
      },
      {
        title: "Type",
        dataIndex: "nod_type",
        sortField: "nod_type",
        sorter: (a, b) => (a.nod_type > b.nod_type ? -1 : 1),
        render: (text) => <div title="Type">{text || Strings.EMPTY_FIELD}</div>,
      },
      {
        title: "Status",
        dataIndex: "nod_status",
        sortField: "nod_status",
        sorter: (a, b) => (a.nod_status > b.nod_status ? -1 : 1),
        render: (text) => <div title="Status">{text || Strings.EMPTY_FIELD}</div>,
      },
      {
        title: "Submitted",
        dataIndex: "submitted_at",
        sortField: "submitted_at",
        sorter: (a, b) => (a.submitted_at > b.submitted_at ? -1 : 1),
        render: (text) => <div title="Submission Date">{text || Strings.EMPTY_FIELD}</div>,
      },
      {
        title: "Updated",
        dataIndex: "updated_at",
        sortField: "updated_at",
        sorter: (a, b) => (a.updated_at > b.updated_at ? -1 : 1),
        render: (text) => <div title="Update Date">{text || Strings.EMPTY_FIELD}</div>,
      },
      {
        dataIndex: "actions",
        render: (text, record) =>
          record.key && (
            <div className="btn--middle flex">
              <Button
                type="primary"
                onClick={(event) => this.props.openViewNodModal(event, record)}
              >
                Open
              </Button>
            </div>
          ),
      },
    ];

    return (
      <CoreTable
        condition={this.props.isLoaded}
        columns={
          this.props.isDashboardView
            ? applySortIndicator(columns, this.props.sortField, this.props.sortDir)
            : columns
        }
        dataSource={this.transformRowData(this.props.nods)}
        tableProps={{
          align: "left",
          pagination: this.props.isPaginated,
        }}
      />
    );
  }
}

MineNoticeOfDepartureTable.propTypes = propTypes;
MineNoticeOfDepartureTable.defaultProps = defaultProps;

export default connect()(MineNoticeOfDepartureTable);
