
import React, { useState } from 'react';

export interface InputStateProps {
  onSubmit: (contentToAnalyze: string, contentType: string, contentSource: string) => Promise<boolean>;
  isAnalyzing: boolean;
}

const InputState: React.FC<InputStateProps> = ({ onSubmit, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState('url');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('blog');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((activeTab === 'url' && !url) || (activeTab === 'content' && !content)) {
      return false;
    }
    
    const contentToAnalyze = activeTab === 'url' ? url : content;
    let contentSource = contentToAnalyze;

    // For text content, use a preview (first 100 chars)
    if (activeTab === 'content') {
      contentSource = content.substring(0, 100) + (content.length > 100 ? '...' : '');
    }
    
    return await onSubmit(contentToAnalyze, contentType, contentSource);
  };

  return {
    activeTab,
    setActiveTab,
    url,
    setUrl,
    content,
    setContent,
    contentType,
    setContentType,
    handleAnalyze
  };
};

export default InputState;
