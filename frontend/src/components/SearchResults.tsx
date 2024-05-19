import * as React from 'react';
import { CommandItem, CommandList } from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchResultsProps } from './SearchClientCombobox';

export function SearchResults({ query, clients, loading, error, selectedResult, onSelectResult }: SearchResultsProps) {
    if (!query) return null;

    return (
        <CommandList>
            {loading && <div className="p-4 text-sm">Searching...</div>}
            {error && <div className="p-4 text-sm text-red-600">{error}</div>}
            {!loading && !error && clients.length === 0 && <div className="p-4 text-sm">No clients found</div>}
            {Array.isArray(clients) && clients.map(({ id, name }) => (
                <CommandItem key={id} onSelect={() => onSelectResult({ id, name })} value={name}>
                    <Check className={cn('mr-2 h-4 w-4', selectedResult?.id === id ? 'opacity-100' : 'opacity-0')} />
                    {name}
                </CommandItem>
            ))}
        </CommandList>
    );
}
