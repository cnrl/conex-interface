import { useQuery } from '@tanstack/react-query';
import type { JsonStructureItem } from 'react-cmdk';

// TODO: add type
type GetComponent = (JsonStructureItem & { [key in `data-${string}`]?: string })[];
export const getComponents = async (): Promise<GetComponent> => {
  return [
    {
      id: 'input-port',
      children: 'Input Port',
      icon: 'TagIcon',
    },
    {
      id: 'output-port',
      children: 'Output Port',
      icon: 'TagIcon',
    },
    {
      id: 'neuron-group',
      children: 'Neuron Group',
      icon: 'RectangleStackIcon',
      // TODO: map from the api to the correct page
      closeOnSelect: false,
      'data-goto': 'projects',
    },
  ];
};

export const useGetComponents = () => {
  return useQuery({
    queryKey: ['components'],
    queryFn: getComponents,
  });
};
