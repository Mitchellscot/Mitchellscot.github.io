export default function pageTitle(title?: string): string {
  if (!title) {
    return 'Mitchell Scott';
  }

  return `Mitchell Scott${title ? ` | ${title}` : ''}`;
}
