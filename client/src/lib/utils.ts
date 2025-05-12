import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Extract excerpt from a markdown text
export function extractExcerpt(markdown: string, maxLength: number = 160) {
  // Remove markdown formatting
  let text = markdown
    .replace(/#+\s+/g, '') // Remove headings
    .replace(/\*\*|\*|__|_/g, '') // Remove bold and italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just the text
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, '') // Remove images
    .replace(/`{1,3}[^`]+`{1,3}/g, '') // Remove code blocks
    .replace(/>\s+/g, '') // Remove blockquotes
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim();
  
  return truncateText(text, maxLength);
}
