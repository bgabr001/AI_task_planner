# apps/api/app/services/priority.py
from __future__ import annotations

from datetime import datetime, timezone
from typing import Optional


def compute_priority(
    *,
    importance: int,
    urgency: int,
    effort: int,
    due_date: Optional[datetime] = None,
) -> float:
    """
    Higher score = higher priority.

    Params are ints (ex: 1–5). due_date is optional.
    """
    score = 0.0
    score += importance * 3
    score += urgency * 2
    score -= effort * 1

    if due_date is not None:
        now = datetime.now(timezone.utc)
        if due_date.tzinfo is None:
            due_date = due_date.replace(tzinfo=timezone.utc)

        days_until_due = (due_date - now).total_seconds() / 86400.0
        if days_until_due <= 1:
            score += 5
        elif days_until_due <= 3:
            score += 3
        elif days_until_due <= 7:
            score += 1

    return score
