"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Save, Sparkles, Eye, EyeOff } from 'lucide-react';
import { Prompt } from '@/types/prompt';
import { categories } from '@/lib/templates';
import { motion, AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';

interface PromptEditorProps {
  prompt?: Prompt;
  onSave: (prompt: Omit<Prompt, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onEnhance?: (content: string) => void;
  isEnhancing?: boolean;
}

export function PromptEditor({ prompt, onSave, onEnhance, isEnhancing }: PromptEditorProps) {
  const [title, setTitle] = useState(prompt?.title || '');
  const [content, setContent] = useState(prompt?.content || '');
  const [category, setCategory] = useState(prompt?.category || '');
  const [tags, setTags] = useState<string[]>(prompt?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const wordCount = content.trim().split(/\s+/).length;
  const charCount = content.length;

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !category) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      isFavorite: prompt?.isFavorite || false
    });
  };

  const handleEnhance = () => {
    if (onEnhance && content.trim()) {
      onEnhance(content.trim());
    }
  };

  const isValid = title.trim() && content.trim() && category;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {prompt ? 'Edit Prompt' : 'Create New Prompt'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isPreview ? 'Preview mode - see how your prompt will appear' : 'Create and optimize your AI prompts'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
            className="transition-all duration-200"
          >
            {isPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          {onEnhance && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEnhance}
              disabled={!content.trim() || isEnhancing}
              className="transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
            </Button>
          )}
          <Button 
            onClick={handleSave} 
            disabled={!isValid}
            className="transition-all duration-200"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Prompt
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!isPreview ? (
              <motion.div
                key="editor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter prompt title..."
                    className="transition-all duration-200 focus:ring-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                              {cat.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        ref={tagInputRef}
                        id="tags"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Add tags..."
                        className="transition-all duration-200"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="transition-all duration-200 hover:bg-destructive hover:text-destructive-foreground group cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        {tag}
                        <X className="h-3 w-3 ml-1 group-hover:text-destructive-foreground" />
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Prompt Content</Label>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{charCount} characters</span>
                      <span>{wordCount} words</span>
                    </div>
                  </div>
                  <TextareaAutosize
                    ref={contentRef}
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your prompt here..."
                    minRows={10}
                    maxRows={20}
                    className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 w-full"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2 border-dashed border-muted-foreground/25">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {title || 'Untitled Prompt'}
                      {category && (
                        <Badge variant="outline">
                          {categories.find(c => c.id === category)?.name}
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="prose dark:prose-invert max-w-none">
                        <pre className="whitespace-pre-wrap text-sm font-mono bg-muted p-4 rounded-lg">
                          {content || 'No content provided'}
                        </pre>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground border-t pt-4">
                        <span>{charCount} characters • {wordCount} words</span>
                        <span>Preview Mode</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Writing Effective Prompts:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Be specific and clear about your desired outcome</li>
                  <li>• Include context and background information</li>
                  <li>• Use examples when possible</li>
                  <li>• Specify the format you want for the response</li>
                  <li>• Test and iterate on your prompts</li>
                </ul>
              </div>
              
              {content.length > 0 && (
                <div className="space-y-2 border-t pt-3">
                  <p className="text-sm font-medium">Your Prompt Stats:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-muted p-2 rounded">
                      <p className="font-medium">{charCount}</p>
                      <p className="text-muted-foreground">Characters</p>
                    </div>
                    <div className="bg-muted p-2 rounded">
                      <p className="font-medium">{wordCount}</p>
                      <p className="text-muted-foreground">Words</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}