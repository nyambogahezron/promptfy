"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { AIEnhancement } from '@/types/prompt';
import { Sparkles, Copy, Check, RefreshCw, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface AIEnhancementPanelProps {
  enhancement: AIEnhancement | null;
  isLoading: boolean;
  originalPrompt: string;
  onApplyOptimization: (optimizedPrompt: string) => void;
  onApplyVariation: (variation: string) => void;
  onRegenerate: () => void;
}

export function AIEnhancementPanel({
  enhancement,
  isLoading,
  originalPrompt,
  onApplyOptimization,
  onApplyVariation,
  onRegenerate
}: AIEnhancementPanelProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      toast.success(`${type} copied to clipboard!`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent - Your prompt is well-structured and clear';
    if (score >= 60) return 'Good - Some improvements could make it better';
    return 'Needs work - Consider implementing the suggestions below';
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 animate-pulse" />
              AI is analyzing your prompt...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
              <Progress value={33} className="animate-pulse" />
              <p className="text-sm text-muted-foreground">
                Generating improvements and variations...
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (!enhancement) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            Click "AI Enhance" to get suggestions for improving your prompt
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Prompt Analysis
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Effectiveness Score</span>
              <div className={`text-2xl font-bold ${getScoreColor(enhancement.score)}`}>
                {enhancement.score}/100
              </div>
            </div>
            <Progress value={enhancement.score} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {getScoreDescription(enhancement.score)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Improvements */}
      {enhancement.improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Improvement Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {enhancement.improvements.map((improvement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 p-3 bg-muted rounded-lg"
                >
                  <Badge variant="outline" className="shrink-0">
                    {index + 1}
                  </Badge>
                  <p className="text-sm">{improvement}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Optimized Version */}
      {enhancement.optimizedVersion && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Optimized Version
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {enhancement.optimizedVersion}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onApplyOptimization(enhancement.optimizedVersion!)}
                  className="flex-1"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Apply Optimization
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleCopy(enhancement.optimizedVersion!, 'Optimized version')}
                  className="transition-all duration-200"
                >
                  {copiedItem === 'Optimized version' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variations */}
      {enhancement.variations && enhancement.variations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Alternative Variations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancement.variations.map((variation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Variation {index + 1}</Badge>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {variation}
                    </pre>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => onApplyVariation(variation)}
                      className="flex-1"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Use This Variation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleCopy(variation, `Variation ${index + 1}`)}
                      className="transition-all duration-200"
                    >
                      {copiedItem === `Variation ${index + 1}` ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {index < enhancement.variations!.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}