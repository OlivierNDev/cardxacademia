"""Excel and PDF export utilities for tour registrations."""

from io import BytesIO
from typing import Any, Dict, List

import pandas as pd
from fpdf import FPDF

from registration.fields import FIELD_LABELS, REGISTRATION_COLUMNS


def _row_values(doc: Dict[str, Any]) -> Dict[str, str]:
    """Map a registration document to labelled export columns."""
    row = {}
    for key, label, _ in REGISTRATION_COLUMNS:
        value = doc.get(key, "")
        if value is None:
            value = ""
        row[label] = str(value)
    row["Registration ID"] = doc.get("id", "")
    row["Submitted At"] = doc.get("created_at", "")
    return row


def registrations_to_dataframe(registrations: List[Dict[str, Any]]) -> pd.DataFrame:
    rows = [_row_values(doc) for doc in registrations]
    column_order = ["Registration ID", "Submitted At"] + [label for _, label, _ in REGISTRATION_COLUMNS]
    df = pd.DataFrame(rows)
    for col in column_order:
        if col not in df.columns:
            df[col] = ""
    return df[column_order]


def export_registrations_xlsx(registrations: List[Dict[str, Any]]) -> bytes:
    df = registrations_to_dataframe(registrations)
    buffer = BytesIO()
    with pd.ExcelWriter(buffer, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name="Registrations")
        worksheet = writer.sheets["Registrations"]
        for idx, col in enumerate(df.columns, start=1):
            max_len = max(df[col].astype(str).map(len).max(), len(col)) + 2
            col_letter = worksheet.cell(row=1, column=idx).column_letter
            worksheet.column_dimensions[col_letter].width = min(max_len, 40)
    buffer.seek(0)
    return buffer.getvalue()


class RegistrationPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 14)
        self.cell(0, 10, "CardX Academia - Tour Registration", ln=True, align="C")
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")


def _pdf_safe(text: str) -> str:
    """Replace characters that Helvetica cannot render."""
    return (
        str(text)
        .replace("\u2019", "'")
        .replace("\u2018", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .encode("latin-1", errors="replace")
        .decode("latin-1")
    )


def export_single_registration_pdf(doc: Dict[str, Any]) -> bytes:
    pdf = RegistrationPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Helvetica", "", 10)

    full_name = f"{doc.get('first_name', '')} {doc.get('last_name', '')}".strip()
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, _pdf_safe(full_name or "Registration"), ln=True)
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 6, _pdf_safe(f"ID: {doc.get('id', '')}"), ln=True)
    pdf.cell(0, 6, _pdf_safe(f"Submitted: {doc.get('created_at', '')}"), ln=True)
    pdf.ln(4)

    for key, label, _ in REGISTRATION_COLUMNS:
        value = doc.get(key, "") or "-"
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(0, 6, _pdf_safe(f"{label}:"), ln=True)
        pdf.set_font("Helvetica", "", 9)
        pdf.multi_cell(0, 5, _pdf_safe(str(value)))
        pdf.ln(1)

    return pdf.output()


def export_registrations_pdf(registrations: List[Dict[str, Any]]) -> bytes:
    pdf = RegistrationPDF()
    pdf.set_auto_page_break(auto=True, margin=15)

    for index, doc in enumerate(registrations):
        pdf.add_page()
        pdf.set_font("Helvetica", "B", 11)
        pdf.cell(
            0,
            8,
            _pdf_safe(f"Registration {index + 1} of {len(registrations)}"),
            ln=True,
        )
        pdf.set_font("Helvetica", "", 9)
        pdf.cell(0, 6, _pdf_safe(f"ID: {doc.get('id', '')}"), ln=True)
        pdf.cell(0, 6, _pdf_safe(f"Submitted: {doc.get('created_at', '')}"), ln=True)
        pdf.ln(3)

        for key, label, _ in REGISTRATION_COLUMNS:
            value = doc.get(key, "") or "-"
            pdf.set_font("Helvetica", "B", 8)
            pdf.cell(0, 5, _pdf_safe(f"{label}:"), ln=True)
            pdf.set_font("Helvetica", "", 8)
            pdf.multi_cell(0, 4, _pdf_safe(str(value)))

        if index < len(registrations) - 1:
            pdf.ln(4)
            pdf.set_draw_color(200, 200, 200)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())

    if not registrations:
        pdf.add_page()
        pdf.set_font("Helvetica", "", 11)
        pdf.cell(0, 10, "No registrations found.", ln=True)

    return pdf.output()
