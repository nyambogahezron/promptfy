"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Prompt } from '@/types/prompt';
import { Heart, Copy, Edit, Trash2, Star, Calendar } from 'lucide-react';
import { categories } from '@/lib/templates';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface PromptCardProps {
  prompt: Prompt;
  onFavorite: (id: string) => void;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
}

export function PromptCard({ prompt, onFavorite, onEdit, onDelete }: PromptCardProps) {
  const category = categories.find(c => c.id === prompt.category);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success('Prompt copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy prompt');
    }
  };

  const handleEdit = () => {
    onEdit(prompt);
  };

  const handleDelete = () => {
    onDelete(prompt.id);
  };

  const handleFavorite = () => {
    onFavorite(prompt.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {prompt.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className={`shrink-0 transition-all duration-200 ${
                prompt.isFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart 
                className="h-4 w-4" 
                fill={prompt.isFavorite ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <Badge variant="outline" className="text-xs">
                <div className={`w-2 h-2 rounded-full ${category.color} mr-1`} />
                {category.name}
              </Badge>
            )}
            
            {prompt.score && (
              <Badge variant="secondary" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                {prompt.score}/100
              </Badge>
            )}
            
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {prompt.createdAt.toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-4">
              {prompt.content}
            </p>
          </div>
          
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {prompt.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {prompt.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{prompt.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              {prompt.content.length} chars • {prompt.content.trim().split(/\s+/).length} words
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8 transition-colors duration-200"
                title="Copy prompt"
              >
                <Copy className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEdit}
                className="h-8 w-8 transition-colors duration-200"
                title="Edit prompt"
              >
                <Edit className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors duration-200"
                title="Delete prompt"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}