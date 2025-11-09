import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SectionKey =
  | 'about'
  | 'experience'
  | 'work'
  | 'contact'
  | 'heroGreeting'
  | 'heroName'
  | 'heroSubtitle'
  | 'heroDescription'
  | 'howIStarted'
  | 'myGoals'
  | 'myMotivations'
  | 'futureVision';

export type WorkProject = {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export type ExperienceJob = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
};

type EditableContent = {
  about: string;
  experience: string;
  work: string;
  contact: string;
  skills?: string[];
  heroGreeting: string;
  heroName: string;
  heroSubtitle: string;
  heroDescription: string;
  workProjects: WorkProject[];
  experienceJobs: ExperienceJob[];
  howIStarted: string;
  myGoals: string;
  myMotivations: string;
  futureVision: string;
};

type EditState = {
  isEditing: boolean;
  isAuthenticated: boolean;
  content: EditableContent;
};

const initialState: EditState = {
  isEditing: false,
  isAuthenticated: false,
  content: {
    about: '',
    experience: '',
    work: '',
    contact: '',
    skills: [],
    heroGreeting: '',
    heroName: '',
    heroSubtitle: '',
    heroDescription: '',
    workProjects: [],
    experienceJobs: [],
    howIStarted: '',
    myGoals: '',
    myMotivations: '',
    futureVision: '',
  },
};

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    toggleEditing(state) {
      if (state.isAuthenticated) {
        state.isEditing = !state.isEditing;
      }
    },
    authenticate(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.isEditing = false;
      }
    },
    setContent(state, action: PayloadAction<{ key: SectionKey; value: string }>) {
      const { key, value } = action.payload;
      state.content[key] = value;
    },
    setAllContent(state, action: PayloadAction<EditableContent>) {
      state.content = action.payload;
    },
    setWorkProjects(state, action: PayloadAction<WorkProject[]>) {
      state.content.workProjects = action.payload;
    },
    setSkills(state, action: PayloadAction<string[]>) {
      state.content.skills = action.payload;
    },
    addSkill(state, action: PayloadAction<string>) {
      const current = state.content.skills || [];
      state.content.skills = [...current, action.payload];
    },
    updateSkill(state, action: PayloadAction<{ index: number; value: string }>) {
      const { index, value } = action.payload;
      const current = state.content.skills || [];
      if (current[index] !== undefined) {
        const next = [...current];
        next[index] = value;
        state.content.skills = next;
      }
    },
    removeSkill(state, action: PayloadAction<number>) {
      const idx = action.payload;
      const current = state.content.skills || [];
      state.content.skills = current.filter((_, i) => i !== idx);
    },
    addWorkProject(state, action: PayloadAction<WorkProject>) {
      state.content.workProjects.push(action.payload);
    },
    updateWorkProject(state, action: PayloadAction<{ index: number; project: Partial<WorkProject> }>) {
      const { index, project } = action.payload;
      const current = state.content.workProjects[index];
      if (current) {
        state.content.workProjects[index] = { ...current, ...project } as WorkProject;
      }
    },
    removeWorkProject(state, action: PayloadAction<number>) {
      state.content.workProjects.splice(action.payload, 1);
    },
    setExperienceJobs(state, action: PayloadAction<ExperienceJob[]>) {
      state.content.experienceJobs = action.payload;
    },
    addExperienceJob(state, action: PayloadAction<ExperienceJob>) {
      state.content.experienceJobs.push(action.payload);
    },
    updateExperienceJob(state, action: PayloadAction<{ index: number; job: Partial<ExperienceJob> }>) {
      const { index, job } = action.payload;
      const current = state.content.experienceJobs[index];
      if (current) {
        state.content.experienceJobs[index] = { ...current, ...job } as ExperienceJob;
      }
    },
    removeExperienceJob(state, action: PayloadAction<number>) {
      state.content.experienceJobs.splice(action.payload, 1);
    },
    hydrateContent(state, action: PayloadAction<Partial<EditableContent>>) {
      state.content = { ...state.content, ...action.payload } as EditableContent;
    },
  },
});

export const {
  toggleEditing,
  authenticate,
  setContent,
  setAllContent,
  setWorkProjects,
  setSkills,
  addSkill,
  updateSkill,
  removeSkill,
  addWorkProject,
  updateWorkProject,
  removeWorkProject,
  setExperienceJobs,
  addExperienceJob,
  updateExperienceJob,
  removeExperienceJob,
  hydrateContent,
} = editSlice.actions;
export default editSlice.reducer;


