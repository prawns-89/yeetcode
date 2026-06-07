export function snippetKey(
  trackId: string,
  chapterId: string,
  snippetId: string,
): string {
  return `${trackId}/${chapterId}/${snippetId}`;
}
