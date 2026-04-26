export function yearsOfExperience(startDate: string): number {
  const [year, month] = startDate.split("-").map(Number);
  const start = new Date(year, month - 1);
  const now = new Date();
  const diff = now.getFullYear() - start.getFullYear();
  return now.getMonth() < start.getMonth() - 1 ? diff - 1 : diff;
}
