export function getReadTime(body: string): string {
  const words = body.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}
