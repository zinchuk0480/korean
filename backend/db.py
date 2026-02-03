from sqlalchemy import create_engine, Integer, String
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker, Mapped, mapped_column

import settings


db_url = 'postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/postgres'


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
    translate:Mapped[str] = mapped_column(String)
    base_2:Mapped[str] = mapped_column(String)
    general_thema_en:Mapped[str] = mapped_column(String)
    general_thema_ru:Mapped[str] = mapped_column(String)
    main_thema_en:Mapped[str] = mapped_column(String)
    main_thema_ru:Mapped[str] = mapped_column(String)
    special_thema_en:Mapped[str] = mapped_column(String)
    special_thema_ru:Mapped[str] = mapped_column(String)
    part_of_speech:Mapped[str] = mapped_column(String)
    stage:Mapped[int] = mapped_column(Integer)
    lesson:Mapped[int] = mapped_column(Integer)
    text_type:Mapped[str] = mapped_column(String)
