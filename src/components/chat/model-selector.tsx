'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getModels, getCurrentModelConfig } from '@/app/actions/model';

interface ModelSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [models, setModels] = React.useState<{ id: string; name: string; providerName: string }[]>([]);

  React.useEffect(() => {
    // Load initial state
    const load = async () => {
      const allModels = await getModels();
      const config = await getCurrentModelConfig();
      setModels(allModels);
      if (!value) {
          onValueChange(config.selected);
      }
    };
    load();
  }, []);

  const handleSelect = async (currentValue: string) => {
    onValueChange(currentValue);
    setOpen(false);
  };

  const selectedModel = models.find((model) => model.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between text-sm font-medium"
        >
          {selectedModel ? (
            <span className="truncate">
               <span className="text-muted-foreground mr-1">Model:</span>
               {selectedModel.name}
            </span>
          ) : (
            "Select model..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {models.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === model.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.providerName}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
