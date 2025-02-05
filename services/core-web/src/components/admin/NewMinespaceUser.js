import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMineNames } from "@common/selectors/mineSelectors";
import { fetchMineNameList } from "@common/actionCreators/mineActionCreator";

import CustomPropTypes from "@/customPropTypes";
import AddMinespaceUser from "@/components/Forms/AddMinespaceUser";

const propTypes = {
  fetchMineNameList: PropTypes.func.isRequired,
  mines: PropTypes.arrayOf(CustomPropTypes.mineName),
  minespaceUserEmailHash: PropTypes.objectOf(PropTypes.any),
  handleSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  mines: [],
  minespaceUserEmailHash: {},
};

export class NewMinespaceUser extends Component {
  componentDidMount() {
    this.props.fetchMineNameList();
  }

  handleSearch = (name) => {
    if (name.length > 0) {
      this.props.fetchMineNameList({ name });
    }
  };

  handleChange = () => {
    this.props.fetchMineNameList();
  };

  render() {
    return (
      <div>
        <h3>Create Proponent</h3>
        {this.props.mines && (
          <AddMinespaceUser
            mines={this.props.mines.map((mine) => ({
              value: mine.mine_guid,
              label: `${mine.mine_name} - ${mine.mine_no}`,
            }))}
            minespaceUserEmailHash={this.props.minespaceUserEmailHash}
            onSubmit={this.props.handleSubmit}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mines: getMineNames(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMineNameList,
    },
    dispatch
  );

NewMinespaceUser.propTypes = propTypes;
NewMinespaceUser.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewMinespaceUser);
