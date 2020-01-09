from flask_restplus import Namespace

from app.api.now_applications.resources.now_application_import_resource import NOWApplicationImportResource
from app.api.now_applications.resources.now_application_resource import NOWApplicationResource
from app.api.now_applications.resources.now_application_list_resource import NoticeOfWorkListResource
from app.api.now_applications.resources.now_activity_type_resource import NOWActivityTypeResource
from app.api.now_applications.resources.now_application_type_resource import NOWApplicationTypeResource
from app.api.now_applications.resources.now_application_status_code_resource import NOWApplicationStatusCodeResource
from app.api.now_applications.resources.unit_type_resource import UnitTypeResource
from app.api.now_applications.resources.now_application_document_type_resource import NOWApplicationDocumentTypeResource
from app.api.now_applications.resources.underground_exploration_type_resource import UndergroundExplorationTypeResource
from app.api.now_applications.resources.now_application_progress_resource import NOWApplicationProgressResource
from app.api.now_applications.resources.now_application_progress_status_resource import NOWApplicationProgressStatusResource
from app.api.now_applications.resources.now_application_document_resource import NOWApplicationDocumentResource
from app.api.now_applications.resources.now_application_permit_type_resource import NOWApplicationPermitTypeResource

api = Namespace('now-applications', description='Party related operations')

api.add_resource(NoticeOfWorkListResource, '')
api.add_resource(NOWApplicationImportResource, '/<string:now_application_guid>/import')
api.add_resource(NOWApplicationResource, '/<string:now_application_guid>')
api.add_resource(NOWApplicationProgressResource, '/<string:now_application_guid>/progress')
api.add_resource(NOWApplicationDocumentResource, '/<string:now_application_guid>/document')

# now static content
api.add_resource(NOWActivityTypeResource, '/activity-types')
api.add_resource(NOWApplicationTypeResource, '/application-types')
api.add_resource(NOWApplicationStatusCodeResource, '/application-status-codes')
api.add_resource(UnitTypeResource, '/unit-types')
api.add_resource(NOWApplicationDocumentTypeResource, '/application-document-types')
api.add_resource(UndergroundExplorationTypeResource, '/underground-exploration-types')
api.add_resource(NOWApplicationProgressStatusResource, '/application-progress-status-codes')
api.add_resource(NOWApplicationPermitTypeResource, '/application-permit-types')