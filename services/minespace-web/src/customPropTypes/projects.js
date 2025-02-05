import { PropTypes, shape } from "prop-types";
import { mineDocument } from "@/customPropTypes/documents";

export const projectSummary = shape({
  project_summary_id: PropTypes.number,
  project_summary_guid: PropTypes.string,
  status_code: PropTypes.string,
  submission_date: PropTypes.string,
  project_summary_description: PropTypes.string,
  documents: PropTypes.arrayOf(mineDocument),
});

export const irt_requirements_xref = shape({
  irt_requirements_xref_guid: PropTypes.string,
  requirement_guid: PropTypes.string,
  deleted_ind: PropTypes.boolean,
  comment: PropTypes.string,
  methods: PropTypes.boolean,
  required: PropTypes.boolean,
});

export const informationRequirementsTable = shape({
  information_requirements_table_guid: PropTypes.string,
  information_requirements_table_id: PropTypes.number,
  project_guid: PropTypes.string,
  requirements: PropTypes.arrayOf(irt_requirements_xref),
  status_code: PropTypes.string,
});

export const subRequirements = shape({
  comment: PropTypes.string,
  methods: PropTypes.boolean,
  required: PropTypes.boolean,
  deleted_ind: PropTypes.boolean,
  description: PropTypes.string,
  display_order: PropTypes.number,
  parent_requirement_id: PropTypes.number,
  requirement_guid: PropTypes.string,
  requirement_id: PropTypes.number,
  step: PropTypes.string,
});

export const requirements = shape({
  deleted_ind: PropTypes.boolean,
  description: PropTypes.string,
  display_order: PropTypes.number,
  parent_requirement_id: PropTypes.number,
  requirement_guid: PropTypes.string,
  requirement_id: PropTypes.number,
  step: PropTypes.string,
  sub_requirements: PropTypes.arrayOf(subRequirements),
});

export const project = shape({
  project_id: PropTypes.number,
  project_guid: PropTypes.string,
  mine_guid: PropTypes.string,
  project_title: PropTypes.string,
  project_summary: projectSummary,
  information_requirements_table: informationRequirementsTable,
  contacts: PropTypes.arrayOf(mineDocument),
});
