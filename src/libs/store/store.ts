import { createAsyncThunk } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const createAppAsyncThunk = <O, I>(
  ...args: Parameters<typeof createAsyncThunk<O, I, AppThunkApiConfig>>
) => createAsyncThunk<O, I, AppThunkApiConfig>(...args);
