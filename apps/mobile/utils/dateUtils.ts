export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  // Check if the date is today
  if (date.toDateString() === now.toDateString()) {
    return `Today at ${formatTime(date)}`;
  }
  
  // Check if the date is yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${formatTime(date)}`;
  }
  
  // Otherwise, return full date
  return `${date.toLocaleDateString()} at ${formatTime(date)}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}