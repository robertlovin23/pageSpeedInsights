import { useSelector as _useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state';

export const useTypedSelector: TypedUseSelectorHook<RootState> = _useSelector;