import { useQuery } from '@tanstack/react-query';
import { Draft, produce } from 'immer';
import { SingleField } from '../components/form-builder';
import behaviors from './mocks/behaviors.json';
import { UseQueryOptions } from './types';

export type Behaviors = {
  // todo: what to do with network
  type: 'neurons' | 'synapses' | 'network';
  parameters: Record<string, SingleField>;
  key: string;
};

const getBehaviors = async () => {
  return Object.entries(behaviors).map(([key, value]) =>
    produce(value, (draft: Draft<Behaviors>) => {
      draft.key = key;
    }),
  ) as Behaviors[];
};

export const useBehaviors = (options?: UseQueryOptions<typeof getBehaviors>) => {
  return useQuery({ queryKey: ['behaviors'], queryFn: getBehaviors, ...options });
};
