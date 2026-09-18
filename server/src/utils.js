export function parseJson(value, fallback = []) {
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(value) || typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function toProject(row) {
  return {
    ...row,
    tech_stack: parseJson(row.tech_stack, []),
    bullets: parseJson(row.bullets, [])
  };
}

export function toExperience(row) {
  return {
    ...row,
    bullets: parseJson(row.bullets, [])
  };
}
