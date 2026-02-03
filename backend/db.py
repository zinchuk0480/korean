import logging

from sqlalchemy import create_engine, select, Integer, String
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker, Mapped, mapped_column

import settings


logging.basicConfig(
	level=logging.INFO, 
	format="%(asctime)s | %(levelname)-8s | %(name)-20s | %(message)s",
    datefmt="%H:%M:%S",
)


db_url = f'postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/postgres'


class SessionFactory:
    def __init__(self, db_url: str):
        self.engine = create_engine(db_url)
        self.SessionLocal = sessionmaker(bind=self.engine)

    def create_session(self) -> Session:
        return self.SessionLocal


factory = SessionFactory(db_url)
session = factory.create_session()


class Base(DeclarativeBase):
    pass


class KoreanWords(Base):
    __tablename__ = "words"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    original:Mapped[str] = mapped_column(String)
    translate:Mapped[str] = mapped_column(String, nullable=True)
    base_2:Mapped[str] = mapped_column(String, nullable=True)
    general_thema_en:Mapped[str] = mapped_column(String, nullable=True)
    general_thema_ru:Mapped[str] = mapped_column(String, nullable=True)
    main_thema_en:Mapped[str] = mapped_column(String, nullable=True)
    main_thema_ru:Mapped[str] = mapped_column(String, nullable=True)
    special_thema_en:Mapped[str] = mapped_column(String, nullable=True)
    special_thema_ru:Mapped[str] = mapped_column(String, nullable=True)
    part_of_speech:Mapped[str] = mapped_column(String, nullable=True)
    stage:Mapped[int] = mapped_column(Integer, nullable=True)
    lesson:Mapped[int] = mapped_column(Integer, nullable=True)
    text_type:Mapped[str] = mapped_column(String, nullable=True)


Base.metadata.create_all(bind=factory.engine)


def query_words():
    stmt = select(KoreanWords).order_by(KoreanWords.general_thema_ru)
    with session() as s:
        result = s.scalars(stmt).all()

    data_to_json = [
        {
            "original": data.original,
            "translate": data.translate,
            "base_2": data.base_2,
            "general_thema_en": data.general_thema_en,
            "general_thema_ru": data.general_thema_ru,
            "main_thema_en": data.main_thema_en,
            "main_thema_ru": data.main_thema_ru,
            "special_thema_en": data.special_thema_en,
            "special_thema_ru": data.special_thema_ru,
            "part_of_speech": data.part_of_speech,
            "stage": data.stage,
            "lesson": data.lesson,
            "text_type": data.text_type,
        } 
        for data in result
    ]



    ready_data_json = []
    for i in data_to_json:
        ready_data_json.append(i['general_thema_en']) 

    obj = {}
    for i in ready_data_json:
        obj.setdefault(i, [])

    for i in data_to_json:
        for key, val in obj.items():
            if key == i['general_thema_en']:
                obj[key].append(i)

    return obj
