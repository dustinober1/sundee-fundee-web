#!/usr/bin/env python3
"""
Generate the printable PDF for a weekly compound strength workout.

Usage:
    .venv/bin/python scripts/generate_weekly_printable.py [path/to/week.json]

With no argument, the most recently started week in
src/lib/compound-strength/weekly/ is used. Output lands in
public/workout-plans/compound-strength-week-<weekId>.pdf, which inherits the
site's long-cache header rule for /workout-plans/*.pdf.
"""

from __future__ import annotations

import json
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
WEEKLY_DIR = ROOT / "src" / "lib" / "compound-strength" / "weekly"
OUT_DIR = ROOT / "public" / "workout-plans"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")

PAGE_W, PAGE_H = 1275, 1650
MARGIN_L, MARGIN_R, MARGIN_T, MARGIN_B = 72, 72, 62, 90
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

NAVY = (13, 26, 64)
GOLD = (212, 165, 32)
ORANGE = (242, 115, 25)
CREAM = (244, 240, 223)
PAPER = (255, 253, 245)
MUTED = (89, 97, 122)
BORDER = (212, 212, 212)
LINE = (196, 200, 212)


def _font(filename: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / filename), size=size)


F_DISPLAY = _font("Georgia Bold.ttf", 52)
F_H2 = _font("Georgia Bold.ttf", 34)
F_H3 = _font("Georgia Bold.ttf", 28)
F_LABEL = _font("Arial Bold.ttf", 17)
F_BODY = _font("Arial.ttf", 22)
F_BODY_SM = _font("Arial.ttf", 19)
F_BODY_BOLD = _font("Arial Bold.ttf", 22)
F_ITALIC = _font("Arial Italic.ttf", 20)


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_w: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        if not words:
            lines.append("")
            continue
        current = words[0]
        for word in words[1:]:
            candidate = f"{current} {word}"
            if draw.textlength(candidate, font=font) <= max_w:
                current = candidate
            else:
                lines.append(current)
                current = word
        lines.append(current)
    return lines


class Flow:
    """Sequential painter with automatic page breaks.

    Always access the page through `flow.draw`: a page break swaps the
    underlying image, so a cached ImageDraw handle would paint on a page
    that has already been filed away.
    """

    def __init__(self) -> None:
        self.pages: list[Image.Image] = []
        self._image: Image.Image | None = None
        self._draw: ImageDraw.ImageDraw | None = None
        self.y = MARGIN_T
        self.page_number = 0

    @property
    def draw(self) -> ImageDraw.ImageDraw:
        assert self._draw is not None, "call start() before drawing"
        return self._draw

    def _stamp_footer(self) -> None:
        footer = "sundee-fundee.com · Compound Strength weekly workout"
        self._draw.text((MARGIN_L, PAGE_H - 52), footer, font=F_BODY_SM, fill=MUTED)
        page_label = f"Page {self.page_number}"
        width = self._draw.textlength(page_label, font=F_BODY_SM)
        self._draw.text(
            (PAGE_W - MARGIN_R - width, PAGE_H - 52),
            page_label,
            font=F_BODY_SM,
            fill=MUTED,
        )

    def start(self) -> None:
        self.page_number += 1
        self._image = Image.new("RGB", (PAGE_W, PAGE_H), PAPER)
        self._draw = ImageDraw.Draw(self._image)
        self.y = MARGIN_T
        self.pages.append(self._image)

    def _new_page(self) -> None:
        self._stamp_footer()
        self.start()

    def ensure(self, height: int) -> None:
        if self.y + height > PAGE_H - MARGIN_B:
            self._new_page()

    def finish(self) -> None:
        self._stamp_footer()


def draw_cover_banner(flow: Flow, week: dict) -> None:
    banner_h = 210
    draw = flow.draw
    draw.rectangle([0, 0, PAGE_W, banner_h], fill=NAVY)
    draw.rectangle([0, banner_h, PAGE_W, banner_h + 10], fill=GOLD)
    draw.text(
        (MARGIN_L, 42),
        "SUNDEE FUNDEE  ·  COMPOUND STRENGTH",
        font=F_LABEL,
        fill=GOLD,
    )
    draw.text((MARGIN_L, 78), "Weekly Workout", font=F_DISPLAY, fill=CREAM)
    range_label = f"Week of {week['_range']}"
    width = draw.textlength(range_label, font=F_BODY_BOLD)
    draw.text(
        (PAGE_W - MARGIN_R - width, 58), range_label, font=F_BODY_BOLD, fill=CREAM
    )
    theme_label = f"Theme: {week['weekTheme']}"
    width = draw.textlength(theme_label, font=F_BODY_SM)
    draw.text(
        (PAGE_W - MARGIN_R - width, 96),
        theme_label,
        font=F_BODY_SM,
        fill=(200, 205, 225),
    )
    flow.y = banner_h + 10 + 40


def draw_title_and_intro(flow: Flow, week: dict) -> None:
    for line in wrap(flow.draw, week["title"], F_H2, CONTENT_W):
        flow.ensure(60)
        flow.draw.text((MARGIN_L, flow.y), line, font=F_H2, fill=NAVY)
        flow.y += 48
    flow.y += 10
    for line in wrap(flow.draw, week["intro"], F_BODY, CONTENT_W):
        flow.ensure(36)
        flow.draw.text((MARGIN_L, flow.y), line, font=F_BODY, fill=MUTED)
        flow.y += 32
    flow.y += 18


def draw_coach_notes(flow: Flow, week: dict) -> None:
    lines: list[tuple[str, object]] = [("COACH NOTES", F_LABEL)]
    for note in week["coachNotes"]:
        lines.extend(
            (item, F_BODY)
            for item in wrap(flow.draw, f"–  {note}", F_BODY, CONTENT_W - 48)
        )
    block_h = 20 + sum(34 if font is F_BODY else 30 for _, font in lines) + 20
    flow.ensure(block_h + 10)

    draw = flow.draw
    draw.rounded_rectangle(
        [MARGIN_L, flow.y, PAGE_W - MARGIN_R, flow.y + block_h],
        radius=18,
        fill=CREAM,
        outline=BORDER,
        width=2,
    )
    inner_y = flow.y + 20
    for text, font in lines:
        color = ORANGE if font is F_LABEL else NAVY
        draw.text((MARGIN_L + 24, inner_y), text, font=font, fill=color)
        inner_y += 34 if font is F_BODY else 30
    flow.y += block_h + 28


def draw_day(flow: Flow, day: dict) -> None:
    header_lines = wrap(flow.draw, day["focus"], F_BODY_SM, CONTENT_W - 260)
    header_h = 56 + len(header_lines) * 28
    flow.ensure(header_h + 30)

    draw = flow.draw
    draw.text((MARGIN_L, flow.y), day["day"].upper(), font=F_H3, fill=ORANGE)
    for offset, line in enumerate(header_lines):
        draw.text(
            (MARGIN_L + 240, flow.y + 6 + offset * 28),
            line,
            font=F_BODY_SM,
            fill=MUTED,
        )
    flow.y += header_h - 4
    draw.line([MARGIN_L, flow.y, PAGE_W - MARGIN_R, flow.y], fill=LINE, width=2)
    flow.y += 10
    if day.get("structure"):
        draw.text(
            (MARGIN_L, flow.y), day["structure"].upper(), font=F_LABEL, fill=MUTED
        )
        flow.y += 32

    for index, exercise in enumerate(day.get("exercises", []), start=1):
        name_lines = wrap(
            flow.draw, f"{index}. {exercise['name']}", F_BODY_BOLD, CONTENT_W - 30
        )
        bb_lines = wrap(
            flow.draw,
            f"Barbell:  {exercise['barbell']}",
            F_BODY_SM,
            CONTENT_W - 60,
        )
        db_lines = wrap(
            flow.draw,
            f"Dumbbell:  {exercise['dumbbell']}",
            F_BODY_SM,
            CONTENT_W - 60,
        )
        note_lines = (
            wrap(flow.draw, exercise["note"], F_ITALIC, CONTENT_W - 60)
            if exercise.get("note")
            else []
        )
        block_h = 30 + (len(name_lines) - 1) * 30
        block_h += (len(bb_lines) + len(db_lines)) * 28
        block_h += len(note_lines) * 27 + 18
        flow.ensure(block_h)

        draw = flow.draw
        draw.text(
            (MARGIN_L + 10, flow.y), exercise["pattern"].upper(), font=F_LABEL, fill=ORANGE
        )
        flow.y += 30
        for line in name_lines:
            draw.text((MARGIN_L + 10, flow.y), line, font=F_BODY_BOLD, fill=NAVY)
            flow.y += 30
        for line in bb_lines:
            draw.text((MARGIN_L + 30, flow.y), line, font=F_BODY_SM, fill=MUTED)
            flow.y += 28
        for line in db_lines:
            draw.text((MARGIN_L + 30, flow.y), line, font=F_BODY_SM, fill=MUTED)
            flow.y += 28
        for line in note_lines:
            draw.text((MARGIN_L + 30, flow.y), line, font=F_ITALIC, fill=MUTED)
            flow.y += 27
        flow.y += 8

    if flow.y < PAGE_H - MARGIN_B - 140:
        draw = flow.draw
        notes_top = flow.y + 6
        draw.line([MARGIN_L, notes_top, PAGE_W - MARGIN_R, notes_top], fill=LINE, width=1)
        draw.line(
            [MARGIN_L, notes_top + 44, PAGE_W - MARGIN_R, notes_top + 44],
            fill=LINE,
            width=1,
        )
        flow.y = notes_top + 60

    flow.y += 22


def date_range_label(start_iso: str) -> str:
    start = datetime.fromisoformat(start_iso).date()
    end = start + timedelta(days=6)
    return f"{start.strftime('%B %-d')} – {end.strftime('%B %-d, %Y')}"


def pick_week_file(argv: list[str]) -> Path:
    if len(argv) > 1:
        return Path(argv[1])
    candidates = sorted(WEEKLY_DIR.glob("*.json"))
    if not candidates:
        raise SystemExit(f"No weekly JSON files found in {WEEKLY_DIR}")
    return max(
        candidates,
        key=lambda path: json.loads(path.read_text())["startDate"],
    )


def main() -> None:
    week_path = pick_week_file(sys.argv)
    week = json.loads(week_path.read_text())
    week["_range"] = date_range_label(week["startDate"])
    print(f"Generating PDF for {week['weekId']} from {week_path.name}")

    flow = Flow()
    flow.start()
    draw_cover_banner(flow, week)
    draw_title_and_intro(flow, week)
    draw_coach_notes(flow, week)
    for day in week["days"]:
        draw_day(flow, day)
    flow.finish()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_path = OUT_DIR / f"compound-strength-week-{week['weekId']}.pdf"
    flow.pages[0].save(
        out_path,
        save_all=True,
        append_images=flow.pages[1:],
        resolution=150.0,
    )
    print(f"Wrote {out_path.relative_to(ROOT)} ({len(flow.pages)} pages)")


if __name__ == "__main__":
    main()
