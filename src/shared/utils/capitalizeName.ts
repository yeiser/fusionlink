export const capitalizeName = (name: string): string => {
  if (!name) return "";

  return name
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};