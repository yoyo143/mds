from sqlalchemy.schema import FetchedValue

from app.api.utils.models_mixins import SoftDeleteMixin, AuditMixin, Base
from app.extensions import db


class ExplosivesPermitMagazine(SoftDeleteMixin, AuditMixin, Base):
    __tablename__ = 'explosives_permit_magazine'

    explosives_permit_magazine_id = db.Column(
        db.Integer, primary_key=True, server_default=FetchedValue())
    explosives_permit_id = db.Column(
        db.Integer, db.ForeignKey('explosives_permit.explosives_permit_id'), nullable=False)
    explosives_permit_magazine_type_code = db.Column(
        db.String,
        db.ForeignKey('explosives_permit_magazine_type.explosives_permit_magazine_type_code'),
        nullable=False)

    type_no = db.Column(db.String, nullable=False)
    tag_no = db.Column(db.String, nullable=False)
    construction = db.Column(db.String)
    latitude = db.Column(db.Numeric(9, 7))
    longitude = db.Column(db.Numeric(11, 7))
    length = db.Column(db.Numeric)
    width = db.Column(db.Numeric)
    height = db.Column(db.Numeric)
    quantity = db.Column(db.Integer)
    distance_road = db.Column(db.Numeric)
    distance_dwelling = db.Column(db.Numeric)
    detonator_type = db.Column(db.String)

    def __repr__(self):
        return f'<{self.__class__.__name__} {self.explosives_permit_magazine_id}>'

    def update_from_data(self, data):
        return self.update(
            explosives_permit_magazine_type_code=self.explosives_permit_magazine_type_code,
            type_no=data.get('type_no'),
            tag_no=data.get('tag_no'),
            construction=data.get('construction'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            length=data.get('length'),
            width=data.get('width'),
            height=data.get('height'),
            quantity=data.get('quantity'),
            distance_road=data.get('distance_road'),
            distance_dwelling=data.get('distance_dwelling'),
            detonator_type=data.get('detonator_type'))

    def update(self,
               explosives_permit_magazine_type_code,
               type_no,
               tag_no,
               construction,
               latitude,
               longitude,
               length,
               width,
               height,
               quantity,
               distance_road,
               distance_dwelling,
               detonator_type,
               add_to_session=True):
        self.explosives_permit_magazine_type_code = explosives_permit_magazine_type_code
        self.type_no = type_no
        self.tag_no = tag_no
        self.construction = construction
        self.latitude = latitude
        self.longitude = longitude
        self.length = length
        self.width = width
        self.height = height
        self.quantity = quantity
        self.distance_road = distance_road
        self.distance_dwelling = distance_dwelling
        self.detonator_type = detonator_type

        if add_to_session:
            self.save(commit=False)

    @classmethod
    def create_from_data(cls, type, data):
        return cls.create(
            explosives_permit_magazine_type_code=type,
            type_no=data.get('type_no'),
            tag_no=data.get('tag_no'),
            construction=data.get('construction'),
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            length=data.get('length'),
            width=data.get('width'),
            height=data.get('height'),
            quantity=data.get('quantity'),
            distance_road=data.get('distance_road'),
            distance_dwelling=data.get('distance_dwelling'),
            detonator_type=data.get('detonator_type'))

    @classmethod
    def create(cls,
               explosives_permit_magazine_type_code,
               type_no,
               tag_no,
               construction,
               latitude,
               longitude,
               length,
               width,
               height,
               quantity,
               distance_road,
               distance_dwelling,
               detonator_type,
               add_to_session=True):
        explosives_permit_magazine = cls(
            explosives_permit_magazine_type_code=explosives_permit_magazine_type_code,
            type_no=type_no,
            tag_no=tag_no,
            construction=construction,
            latitude=latitude,
            longitude=longitude,
            length=length,
            width=width,
            height=height,
            quantity=quantity,
            distance_road=distance_road,
            distance_dwelling=distance_dwelling,
            detonator_type=detonator_type)

        if add_to_session:
            explosives_permit_magazine.save(commit=False)
        return explosives_permit_magazine

    @classmethod
    def find_by_explosives_permit_magazine_id(cls, explosives_permit_magazine_id):
        return cls.query.filter_by(
            explosives_permit_magazine_id=explosives_permit_magazine_id,
            deleted_ind=False).one_or_none()
