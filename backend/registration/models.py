from datetime import datetime
from typing import Literal, Optional
import uuid

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


YesNo = Literal["yes", "no"]


class RegistrationCreate(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    fathers_name: str = Field(..., min_length=1, max_length=100)
    date_of_birth: str = Field(..., min_length=4, max_length=20)
    gender: str = Field(..., min_length=1, max_length=50)
    passport_no: str = Field(..., min_length=1, max_length=50)
    date_of_issue: str = Field(..., min_length=4, max_length=20)
    valid_through: str = Field(..., min_length=4, max_length=20)
    mothers_name: str = Field(..., min_length=1, max_length=100)
    grandfathers_name: str = Field(..., min_length=1, max_length=100)
    marital_status: str = Field(..., min_length=1, max_length=50)
    occupation: str = Field(..., min_length=1, max_length=100)
    religion: str = Field(..., min_length=1, max_length=100)
    tourist_birth_country: str = Field(..., min_length=1, max_length=100)
    country_of_present_residence: str = Field(..., min_length=1, max_length=100)
    telephone_number: str = Field(..., min_length=5, max_length=30)
    email: EmailStr
    visited_before_israel: YesNo
    visited_other_countries: YesNo
    related_to_group_members: YesNo
    from_year: Optional[str] = Field(None, max_length=10)
    year_of_last_visit: Optional[str] = Field(None, max_length=10)
    other_countries_visited: Optional[str] = Field(None, max_length=500)
    family_link_group_member_number: Optional[str] = Field(None, max_length=50)
    relationship: Optional[str] = Field(None, max_length=100)
    is_related_to_other_group_members: Optional[str] = Field(None, max_length=200)

    @field_validator(
        "first_name",
        "last_name",
        "fathers_name",
        "mothers_name",
        "grandfathers_name",
        "occupation",
        "religion",
        "tourist_birth_country",
        "country_of_present_residence",
        mode="before",
    )
    @classmethod
    def strip_and_validate_required_text(cls, value: str) -> str:
        if value is None:
            raise ValueError("Field is required")
        cleaned = str(value).strip()
        if not cleaned:
            raise ValueError("Field cannot be empty")
        return cleaned

    @field_validator(
        "from_year",
        "year_of_last_visit",
        "other_countries_visited",
        "family_link_group_member_number",
        "relationship",
        "is_related_to_other_group_members",
        mode="before",
    )
    @classmethod
    def strip_optional_text(cls, value):
        if value is None:
            return None
        cleaned = str(value).strip()
        return cleaned or None


class Registration(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    fathers_name: str
    date_of_birth: str
    gender: str
    passport_no: str
    date_of_issue: str
    valid_through: str
    mothers_name: str
    grandfathers_name: str
    marital_status: str
    occupation: str
    religion: str
    tourist_birth_country: str
    country_of_present_residence: str
    from_year: Optional[str] = None
    telephone_number: str
    email: EmailStr
    visited_before_israel: YesNo
    year_of_last_visit: Optional[str] = None
    visited_other_countries: YesNo
    other_countries_visited: Optional[str] = None
    related_to_group_members: YesNo
    family_link_group_member_number: Optional[str] = None
    relationship: Optional[str] = None
    is_related_to_other_group_members: Optional[str] = None
    status: Literal["submitted"] = "submitted"
    created_at: datetime
    updated_at: datetime
    email_sent: bool = False
    customer_email_sent: bool = False
    admin_email_sent: bool = False

    @classmethod
    def from_create(cls, data: RegistrationCreate, created_at: datetime) -> "Registration":
        payload = data.model_dump()
        return cls(**payload, created_at=created_at, updated_at=created_at)
