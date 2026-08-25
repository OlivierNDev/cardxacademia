/** Tour registration form field definitions — mirrors backend columns. */

export const REGISTRATION_STEPS = [
  {
    id: 1,
    title: 'Personal Details',
    description: 'Basic information about you',
    fields: [
      'first_name',
      'last_name',
      'fathers_name',
      'date_of_birth',
      'gender',
      'marital_status',
      'occupation',
      'religion',
    ],
  },
  {
    id: 2,
    title: 'Passport & Family',
    description: 'Travel document and family names',
    fields: [
      'passport_no',
      'date_of_issue',
      'valid_through',
      'mothers_name',
      'grandfathers_name',
    ],
  },
  {
    id: 3,
    title: 'Location & Contact',
    description: 'Where you live and how to reach you',
    fields: [
      'tourist_birth_country',
      'country_of_present_residence',
      'from_year',
      'telephone_number',
      'email',
    ],
  },
  {
    id: 4,
    title: 'Travel & Group',
    description: 'Travel history and group connections',
    fields: [
      'visited_before_israel',
      'year_of_last_visit',
      'visited_other_countries',
      'other_countries_visited',
      'related_to_group_members',
      'family_link_group_member_number',
      'relationship',
      'is_related_to_other_group_members',
    ],
  },
];

export const FIELD_CONFIG = {
  first_name: { label: 'First Name', type: 'text', required: true, placeholder: 'Enter first name' },
  last_name: { label: 'Last Name', type: 'text', required: true, placeholder: 'Enter last name' },
  fathers_name: { label: "Father's Name", type: 'text', required: true, placeholder: "Enter father's name" },
  date_of_birth: { label: 'Date Of Birth', type: 'date', required: true },
  gender: {
    label: 'Gender',
    type: 'select',
    required: true,
    options: ['Male', 'Female', 'Other'],
  },
  passport_no: { label: 'Passport No', type: 'text', required: true, placeholder: 'Passport number' },
  date_of_issue: { label: 'Date of Issue', type: 'date', required: true },
  valid_through: { label: 'Valid Through', type: 'date', required: true },
  mothers_name: { label: "Mother's Name", type: 'text', required: true, placeholder: "Enter mother's name" },
  grandfathers_name: { label: "Grandfather's Name", type: 'text', required: true, placeholder: "Enter grandfather's name" },
  marital_status: {
    label: 'Marital Status',
    type: 'select',
    required: true,
    options: ['Single', 'Married', 'Divorced', 'Widowed'],
  },
  occupation: { label: 'Occupation', type: 'text', required: true, placeholder: 'Your occupation' },
  religion: { label: 'Religion', type: 'text', required: true, placeholder: 'Your religion' },
  tourist_birth_country: { label: 'Tourist Birth Country', type: 'text', required: true, placeholder: 'Country of birth' },
  country_of_present_residence: { label: 'Country of Present Residence', type: 'text', required: true, placeholder: 'Current country of residence' },
  from_year: { label: 'From Year', type: 'text', required: false, placeholder: 'Year you moved (optional)' },
  telephone_number: { label: 'Telephone Number', type: 'tel', required: true, placeholder: '+250 788 000 000' },
  email: { label: 'Email Address', type: 'email', required: true, placeholder: 'your.email@example.com' },
  visited_before_israel: { label: 'Visited Before in Israel?', type: 'yesno', required: true },
  year_of_last_visit: { label: 'Year of Last Visit', type: 'text', required: false, placeholder: 'e.g. 2023' },
  visited_other_countries: { label: 'Visited in Other Countries?', type: 'yesno', required: true },
  other_countries_visited: { label: 'What Other Countries Visited?', type: 'textarea', required: false, placeholder: 'List countries (optional)' },
  related_to_group_members: { label: 'Related to Any Other Group Members?', type: 'yesno', required: true },
  family_link_group_member_number: { label: 'Family Link to Group Member Number', type: 'text', required: false, placeholder: 'Member number (optional)' },
  relationship: { label: 'Relationship', type: 'text', required: false, placeholder: 'e.g. Spouse, sibling (optional)' },
  is_related_to_other_group_members: { label: 'Is Related to Other Group Members?', type: 'text', required: false, placeholder: 'Additional details (optional)' },
};

export const INITIAL_FORM_DATA = Object.keys(FIELD_CONFIG).reduce((acc, key) => {
  acc[key] = '';
  return acc;
}, {});

export const YES_NO_FIELDS = [
  'visited_before_israel',
  'visited_other_countries',
  'related_to_group_members',
];
