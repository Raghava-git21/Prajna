import { useQuery } from '@tanstack/react-query';
import { getFeaturedTemples, getTempleById, getTempleStates, getTemples } from '../services/api';

export const useTemples = (params = {}) => useQuery({
  queryKey: ['temples', params],
  queryFn: async () => (await getTemples(params)).data,
  keepPreviousData: true
});

export const useFeaturedTemples = () => useQuery({
  queryKey: ['temples', 'featured'],
  queryFn: async () => (await getFeaturedTemples()).data.data
});

export const useTemple = (id) => useQuery({
  queryKey: ['temple', id],
  queryFn: async () => (await getTempleById(id)).data.data,
  enabled: Boolean(id)
});

export const useTempleStates = () => useQuery({
  queryKey: ['temples', 'states'],
  queryFn: async () => (await getTempleStates()).data.data
});
