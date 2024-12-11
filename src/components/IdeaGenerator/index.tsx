import React from 'react';
import { useIdeaGenerator } from './useIdeaGenerator';
import { IdeaDisplay } from './IdeaDisplay';
import { IdeaForm } from './IdeaForm';

export const IdeaGenerator: React.FC = () => {
  const { idea, loading, error, handleSubmit } = useIdeaGenerator();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Ideas</h2>
      <IdeaForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {idea && <IdeaDisplay idea={idea} />}
    </div>
  );
};