import {  createAsyncThunk } from '@reduxjs/toolkit'
import { Forum } from '@/types/forum.types'
import axios from 'axios'
import { CreateForumPayload, UpdateForumPayload } from '@/types/forumPayload.types'

const fetchAllForumsThunk = createAsyncThunk<Forum[]>(
  'forums/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/forums')
      if (!res.ok) throw new Error('Failed to fetch forums')
      const data = await res.json()
      return data as Forum[]
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const fetchUserForumsThunk = createAsyncThunk(
  'forum/fetchUserForums',
  async (_, thunkAPI) => {
    try {
      // Pass 'mine=true' to fetch only forums by the logged-in user
      const res = await fetch('/api/forums?mine=true');
      if (!res.ok) throw new Error('Failed to fetch forums')
      const data = await res.json();
      return data as Forum[];
    } catch (err) {
      return thunkAPI.rejectWithValue('Failed to fetch forums');
    }
  }
);

const createForumThunk = createAsyncThunk<Forum, CreateForumPayload>(
  'forums/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/forums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to create forum')
      return await res.json()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const updateForumThunk = createAsyncThunk<Forum, UpdateForumPayload>(
  'forums/update',
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/forums/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update forum')
      return await res.json()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const deleteForumThunk = createAsyncThunk<string, string>(
  'forums/delete',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/forums/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete forum')
      return id
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

const fetchForumByIdThunk = createAsyncThunk<Forum, string>(
  'forum/fetchById',
  async (forumId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/forums/${forumId}`)
      return res.data as Forum
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch forum')
    }
  }
)

export { fetchAllForumsThunk, createForumThunk, updateForumThunk, deleteForumThunk, fetchForumByIdThunk, fetchUserForumsThunk }