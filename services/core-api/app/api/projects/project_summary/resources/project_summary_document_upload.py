import pandas as pd

from werkzeug.exceptions import NotFound
from flask import request
from flask_restplus import Resource

from app.api.utils.custom_reqparser import CustomReqparser
from werkzeug.datastructures import FileStorage

from app.extensions import api
from app.api.utils.access_decorators import requires_any_of, MINE_EDIT, MINESPACE_PROPONENT
from app.api.utils.resources_mixins import UserMixin
from app.api.mines.mine.models.mine import Mine
from app.api.services.document_manager_service import DocumentManagerService


class ProjectSummaryDocumentUploadResource(Resource, UserMixin):

    # parser = CustomReqparser()
    # parser.add_argument(
    #     'file',
    #     location='files',
    #     type=FileStorage,
    #     required=False,
    # )

    @api.doc(
        description='Request a document_manager_guid for uploading a document',
        params={'project_guid': 'The GUID of the project the Project Summary Document belongs to.'})
    @requires_any_of([MINE_EDIT, MINESPACE_PROPONENT])
    def post(self, project_guid, project_summary_guid):
        mine_guid = request.args.get('mine_guid', type=str)
        mine = Mine.find_by_mine_guid(mine_guid)
        if not mine:
            raise NotFound('Mine not found')

        return DocumentManagerService.initializeFileUploadWithDocumentManager(
            request, mine, 'project_summaries')

    # @api.doc(
    #     description='Import IRT',
    #     params={'project_guid': 'The GUID of the project the Project Summary Document belongs to.'})
    # @requires_any_of([MINE_EDIT, MINESPACE_PROPONENT])
    # def put(self, project_guid, project_summary_guid):
    #     data = self.parser.parse_args()
