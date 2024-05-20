import * as React from 'react';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { API_URL } from '@/config/apiConfig';

interface Client {
  id: string;
  name: string;
}

interface SearchProps {
  selectedResult?: Client | null;
  onSelectResult: (client: Client) => void;
}

export function ClientSearch({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [clients, setClients] = React.useState<Client[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      fetch(`${API_URL}/clients/search?query=${searchQuery}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setClients(data || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Something went wrong');
          setLoading(false);
        });
    } else {
      setClients([]);
    }
  }, [searchQuery]);

  const handleSelectResult = (client: Client) => {
    onSelectResult(client);
  };

  return (
    <Command shouldFilter={false} className="h-auto rounded-lg border border-b-0 shadow-md">
      <CommandInput value={searchQuery} onValueChange={setSearchQuery} placeholder="Search for client" />
      <SearchResults query={searchQuery} clients={clients} loading={loading} error={error} selectedResult={selectedResult} onSelectResult={handleSelectResult} />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  clients: Client[];
  loading: boolean;
  error: string | null;
  selectedResult?: Client | null;
  onSelectResult: (client: Client) => void;
}

function SearchResults({ query, clients, loading, error, selectedResult, onSelectResult }: SearchResultsProps) {
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
