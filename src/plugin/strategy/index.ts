import type { FlagRetail } from '../../shared/types';
import type { FlagStrategy } from '../types';
import { ABCStrategy } from './abc-strategy';

const strategyMap: Record<Partial<FlagRetail>, () => FlagStrategy> = {
  "flag-retail-abc": () => new ABCStrategy(),
  "flag-retail-xyz": () => new ABCStrategy(),
};

export function getStrategy(flag: FlagRetail): FlagStrategy {
    if (!flag) throw new Error(`Not found strategy for flag: ${flag}`);
    return strategyMap[flag]();
}