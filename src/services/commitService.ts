import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/commits';

export type CommitResponse = {
  id: string;
  date: string;
  message: string;
  hours: number;
  minutes: number;
  createdAt: string;
};

export type CommitSummaryResponse = {
  date: string;      
  duration: number;  
};

export const commitApi = {
  addCommit: (commit: {
    date: string;
    message: string;
    hours: number;
    minutes: number;
  }) => axios.post<CommitResponse>(API_BASE, commit),

  deleteCommit: (id: string) => axios.delete<void>(`${API_BASE}/${id}`),

  getCommitsByDate: (date: string) => axios.get<CommitResponse[]>(`${API_BASE}?date=${date}`),

  getCommitSummaryByYear: (year?: number) => {
    const url = year ? `${API_BASE}/summary?year=${year}` : `${API_BASE}/summary`;
    return axios.get<CommitSummaryResponse[]>(url);
  },
};
