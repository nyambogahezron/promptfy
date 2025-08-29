import { Prompt } from '@/types/prompt';

const STORAGE_KEY = 'ai-prompts';

export class StorageService {
  static getPrompts(): Prompt[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored).map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt)
      })) : [];
    } catch (error) {
      console.error('Error loading prompts:', error);
      return [];
    }
  }

  static savePrompts(prompts: Prompt[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
    } catch (error) {
      console.error('Error saving prompts:', error);
    }
  }

  static addPrompt(prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>): Prompt {
    const newPrompt: Prompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const prompts = this.getPrompts();
    prompts.unshift(newPrompt);
    this.savePrompts(prompts);
    
    return newPrompt;
  }

  static updatePrompt(id: string, updates: Partial<Prompt>): void {
    const prompts = this.getPrompts();
    const index = prompts.findIndex(p => p.id === id);
    
    if (index !== -1) {
      prompts[index] = {
        ...prompts[index],
        ...updates,
        updatedAt: new Date()
      };
      this.savePrompts(prompts);
    }
  }

  static deletePrompt(id: string): void {
    const prompts = this.getPrompts();
    const filtered = prompts.filter(p => p.id !== id);
    this.savePrompts(filtered);
  }

  static exportPrompts(format: 'json' | 'txt' | 'md'): string {
    const prompts = this.getPrompts();
    
    switch (format) {
      case 'json':
        return JSON.stringify(prompts, null, 2);
      
      case 'txt':
        return prompts.map(p => 
          `Title: ${p.title}\nCategory: ${p.category}\nTags: ${p.tags.join(', ')}\nContent:\n${p.content}\n\n---\n\n`
        ).join('');
      
      case 'md':
        return prompts.map(p => 
          `# ${p.title}\n\n**Category:** ${p.category}\n**Tags:** ${p.tags.join(', ')}\n**Created:** ${p.createdAt.toLocaleDateString()}\n\n## Content\n\n${p.content}\n\n---\n\n`
        ).join('');
      
      default:
        return JSON.stringify(prompts, null, 2);
    }
  }
}