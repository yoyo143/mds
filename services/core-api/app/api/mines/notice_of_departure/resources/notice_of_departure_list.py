import uuid
from flask_restplus import Resource, reqparse, inputs
from werkzeug.exceptions import NotFound
from app.extensions import api
from app.api.utils.resources_mixins import UserMixin
from app.api.utils.access_decorators import (requires_any_of, VIEW_ALL, MINESPACE_PROPONENT,
                                             EDIT_DO)
from app.api.mines.notice_of_departure.models.notice_of_departure import NoticeOfDeparture, NodType, NodStatus
from app.api.mines.response_models import NOD_MODEL, CREATE_NOD_MODEL
from app.api.mines.permits.permit.models.permit import Permit

from sqlalchemy.dialects.postgresql import dialect
from sqlalchemy.schema import CreateTable
from app.api.mines.notice_of_departure.models.notice_of_departure_document_xref import NoticeOfDepartureDocumentXref


class NoticeOfDepartureListResource(Resource, UserMixin):

    @api.doc(params={'mine_guid': 'Mine guid.'})
    @requires_any_of([VIEW_ALL, MINESPACE_PROPONENT])
    @api.marshal_with(NOD_MODEL, code=200, envelope='records')
    def get(self, mine_guid):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'permit_guid',
            type=str,
            help='Filter by permit',
            location='args',
            required=False,
            store_missing=False)
        args = parser.parse_args()

        nods = []

        permit_guid = args.get('permit_guid')
        if permit_guid:
            permit = Permit.find_by_permit_guid(permit_guid, mine_guid)
            if not permit:
                raise NotFound('Either permit does not exist or does not belong to the mine')
            nods = NoticeOfDeparture.find_all_by_permit_guid(permit_guid, mine_guid)
        else:
            nods = NoticeOfDeparture.find_all_by_mine_guid(mine_guid)
        return nods

    @requires_any_of([EDIT_DO, MINESPACE_PROPONENT])
    @api.expect(CREATE_NOD_MODEL)
    @api.marshal_with(NOD_MODEL, code=201)
    def post(self, mine_guid):
        parser = reqparse.RequestParser()
        parser.add_argument(
            'nod_title',
            type=inputs.regex('^.{1,50}$'),
            help='Notice of Departure title (50 chars max)',
            location='json',
            required=True,
            store_missing=False)
        parser.add_argument(
            'permit_guid',
            type=str,
            help='Permit identifier',
            location='json',
            required=True,
            store_missing=False)
        parser.add_argument(
            'nod_description',
            type=str,
            help='Notice of Departure description',
            location='json',
            required=True,
            store_missing=False)
        parser.add_argument(
            'nod_type',
            type=str,
            help='Notice of Departure type',
            location='json',
            required=True,
            store_missing=False)
        parser.add_argument(
            'nod_status',
            type=str,
            help='Notice of Departure Status',
            location='json',
            store_missing=False)
        data = parser.parse_args()

        permit_guid = data.get('permit_guid')

        permit = Permit.find_by_permit_guid(permit_guid, mine_guid)

        if not permit:
            raise NotFound('Either permit does not exist or does not belong to the mine')
        new_nod = NoticeOfDeparture.create(
            permit._context_mine,
            permit,
            nod_title=data.get('nod_title'),
            nod_description=data.get('nod_description'),
            nod_type=NodType[data.get('nod_type')],
            nod_status=NodStatus[data.get('nod_status')])
        new_nod.save()

        return new_nod