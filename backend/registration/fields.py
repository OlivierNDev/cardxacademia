"""Registration form field definitions — shared by API, Excel, and PDF exports."""

REGISTRATION_COLUMNS = [
    ("first_name", "First Name", True),
    ("last_name", "Last Name", True),
    ("fathers_name", "Father's Name", True),
    ("date_of_birth", "Date Of Birth", True),
    ("gender", "Gender", True),
    ("passport_no", "Passport No", True),
    ("date_of_issue", "Date of Issue", True),
    ("valid_through", "Valid Through", True),
    ("mothers_name", "Mother's Name", True),
    ("grandfathers_name", "Grandfather's Name", True),
    ("marital_status", "Marital Status", True),
    ("occupation", "Occupation", True),
    ("religion", "Religion", True),
    ("tourist_birth_country", "Tourist Birth Country", True),
    ("country_of_present_residence", "Country of Present Residence", True),
    ("from_year", "From Year", False),
    ("telephone_number", "Telephone Number", True),
    ("email", "Email Address", True),
    ("visited_before_israel", "Visited Before in Israel?", True),
    ("year_of_last_visit", "Year of Last Visit", False),
    ("visited_other_countries", "Visited in Other Countries?", True),
    ("other_countries_visited", "What Other Countries Visited?", False),
    ("related_to_group_members", "Related to Any Other Group Members?", True),
    ("family_link_group_member_number", "Family Link to Group Member Number", False),
    ("relationship", "Relationship", False),
    ("is_related_to_other_group_members", "Is Related to Other Group Members?", False),
]

REQUIRED_FIELDS = [key for key, _, required in REGISTRATION_COLUMNS if required]
OPTIONAL_FIELDS = [key for key, _, required in REGISTRATION_COLUMNS if not required]
FIELD_LABELS = {key: label for key, label, _ in REGISTRATION_COLUMNS}
